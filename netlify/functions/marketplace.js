export const config = { path: '/marketplace' };
let ITEMS = [
  { id:'p1', title:'Reusable Glass Bottle', desc:'1L borosilicate bottle with sleeve', condition:'Like new', link:'#' },
  { id:'p2', title:'Refurbished LED Bulb Pack', desc:'5×9W A60 warm white', condition:'New (open box)', link:'#' },
  { id:'p3', title:'Compost Bin 10L', desc:'Countertop bin with charcoal filter', condition:'Good', link:'#' }
];

export default async (req, res) => {
  if (req.method === 'GET') return res.json(ITEMS);
  if (req.method === 'POST') {
    try{
      const body = req.body && Object.keys(reimport { GoogleGenerativeAI } from "@google/generative-ai";

export const config = { path: "/marketplace" };

// Single endpoint: returns Gemini-generated items including links
export default async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Return ONLY valid JSON (no commentary).
JSON structure:
[ { "id": string, "title": string, "desc": string, "condition": "New"|"Used"|"Refurbished", "link": string } ]
Generate 6 sustainable, eco-friendly lifestyle products with real or plausible HTTPS links for UAE users.
Each description ≤ 100 characters.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    const items = JSON.parse(text);

    return res.json(items);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
q.body).length ? req.body : await new Promise(r=>{ let d=''; req.on('data',c=>d+=c); req.on('end',()=>r(JSON.parse(d||'{}'))); });
      const item = { id: 'p'+(Date.now()), title: body.title||'Untitled', desc: body.desc||'', condition: body.condition||'Good', link: body.link||'#' };
      ITEMS.unshift(item);
      return res.json(item);
    }catch(e){ return res.status(400).json({ error:e.message }); }
  }
  return res.status(405).json({ error:'GET or POST only' });
};
