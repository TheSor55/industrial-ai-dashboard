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

  return { runtime, availability, performance, quality, oee, scrapQty, scrapRate, energyCost, carbon, downtimeRate, lossOutput };
}

function statusClass(value, good, warn){
  if(value >= good) return ['good','ดี'];
  if(value >= warn) return ['warn','เฝ้าระวัง'];
  return ['bad','เสี่ยงสูง'];
}

function setKPI(id, stId, value, good, warn, inverse=false){
  document.getElementById(id).textContent = pct(value);
  let cls, txt;
  if(!inverse){
    [cls,txt] = statusClass(value, good, warn);
  }else{
    if(value <= good){cls='good';txt='ดี'}
    else if(value <= warn){cls='warn';txt='เฝ้าระวัง'}
    else{cls='bad';txt='เสี่ยงสูง'}
  }
  const el = document.getElementById(stId);
  el.className = 'status ' + cls;
  el.textContent = txt;
}
