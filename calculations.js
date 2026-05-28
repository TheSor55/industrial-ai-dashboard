function pct(x){ return isFinite(x) ? (x*100).toFixed(1)+'%' : '-'; }
function num(x,d=2){ return isFinite(x) ? x.toLocaleString(undefined,{maximumFractionDigits:d}) : '-'; }
function computeMetrics(input){
  const runtime = input.planned - input.downtime;
  const availability = runtime / input.planned;
  const performance = (input.cycle * input.total) / (runtime * 60);
  const quality = input.good / input.total;
  const oee = availability * performance * quality;
  const scrapQty = input.total - input.good;
  const scrapRate = scrapQty / input.total;
  const energyCost = input.kwh * input.costKwh;
  const carbon = input.kwh * input.ef;
  const downtimeRate = input.downtime / input.planned;
  const lossOutput = input.downtime > 0 && input.cycle > 0 ? (input.downtime*60)/input.cycle : 0;
  const powerNow = input.kwh / (input.planned / 60);
  return { runtime, availability, performance, quality, oee, scrapQty, scrapRate, energyCost, carbon, downtimeRate, lossOutput, powerNow };
}
function setKPI(id, stId, value, good, warn, inverse=false){
  document.getElementById(id).textContent = pct(value);
  let cls = 'good', txt = 'ดี';
  if(!inverse){ if(value < warn){cls='bad';txt='เสี่ยงสูง'} else if(value < good){cls='warn-text';txt='เฝ้าระวัง'} }
  else { if(value > warn){cls='bad';txt='เสี่ยงสูง'} else if(value > good){cls='warn-text';txt='เฝ้าระวัง'} }
  const el = document.getElementById(stId); el.className = cls; el.textContent = txt;
}
