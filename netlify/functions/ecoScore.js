export const config = { path: '/ecoScore' };

function score({ material=3, weight=0.5, energy=1, distance=10 }){
  const impact = 0.4*material + 0.3*weight + 0.2*energy + 0.1*(distance/50);
  const percent = Math.max(0, Math.min(100, 100 - impact*10));
  const grade = percent>=90?'A':percent>=80?'B':percent>=70?'C':percent>=60?'D':percent>=50?'E':percent>=35?'F':'G';
  return { impact:+impact.toFixed(2), percent:+percent.toFixed(1), grade };
}

export default async (req, res) => {
  try{
    const body = req.body && Object.keys(req.body).length ? req.body : await new Promise(r=>{
      let d=''; req.on('data',c=>d+=c); req.on('end',()=>r(d?JSON.parse(d):{}));
    });
    const out = score(body||{});
    return res.json(out);
  }catch(e){
    return res.status(400).json({ error: e.message });
  }
};
