import Busboy from 'busboy';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = { path: '/classifyTrash' };

function readFileFromRequest(req) {
  return new Promise((resolve, reject) => {
    const bb = Busboy({ headers: req.headers });
    let fileChunks = [];
    let label = '';
    bb.on('file', (name, file, info) => {
      file.on('data', (d) => fileChunks.push(d));
      file.on('limit', () => reject(new Error('File too large')));
    });
    bb.on('field', (n, val) => { if (n === 'label') label = val; });
    bb.on('finish', () => resolve({ buffer: Buffer.concat(fileChunks), label }));
    bb.on('error', reject);
    req.pipe(bb);
  });
}

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST with multipart/form-data' });
  }
  try {
    const { buffer, label } = await readFileFromRequest(req);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const img = {
      inlineData: { data: buffer.toString('base64'), mimeType: 'image/png' }
    };

    const prompt = `You are a recycling expert. The item may be: ${label}. Identify the material and provide a concise recycling/disposal guide for UAE-style urban settings. Output sections: 1) Material, 2) Recyclability, 3) How to dispose, 4) Contamination tips, 5) Alternatives.`;

    const result = await model.generateContent({ contents: [{ role: 'user', parts: [prompt, img] }] });
    const text = result.response.text();
    return res.json({ guide: text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
