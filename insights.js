function addInsight(html){ return `<div class="insight">${html}</div>`; }
function buildInsights(data){
  let html='', problems=[], actions=[];
  if(data.oee < .60){ problems.push('OEE ต่ำกว่า 60%'); actions.push('ทำ Pareto Downtime และ Scrap รายเครื่อง/รายกะ'); html += addInsight('<strong>OEE Critical:</strong> แนะนำแยก Loss เป็น Availability / Performance / Quality และเริ่ม Daily War Room'); }
  else if(data.oee < .85){ html += addInsight('<strong>OEE Watch:</strong> ยังมีโอกาสเพิ่มผลผลิตผ่านการลด Downtime, Minor Stop และ Scrap'); }
  else{ html += addInsight('<strong>OEE Healthy:</strong> ควรรักษา Standard Work และทำ Continuous Improvement ต่อเนื่อง'); }
  if(data.downtimeRate > .10){ problems.push('Downtime สูง'); actions.push('ตรวจ PM, Mold, Machine Alarm, Changeover และ Manpower'); html += addInsight('<strong>Downtime สูง:</strong> ตรวจ Machine Alarm, Mold Condition, Setup Time, Material Waiting และ Manpower Allocation'); }
  if(data.scrapRate > .05){ problems.push('Scrap สูง'); actions.push('ทำ Root Cause 4M และ Pareto Defect'); html += addInsight('<strong>Scrap สูง:</strong> แนะนำแยก Defect ด้วย 4M: Man, Machine, Material, Method และตรวจ Parameter Window'); }
  if(data.kwh > 500){ actions.push('ตรวจ Air Compressor, Chiller, Cooling Tower และ Idle Machine'); html += addInsight('<strong>Energy Hotspot:</strong> ตรวจ Air Leak, Chiller Load, Idle Machine และ Peak Demand'); }
  if(data.carbon > 250){ actions.push('ติดตาม Carbon Intensity ต่อชิ้น และจัดทำ Energy Reduction Plan'); html += addInsight('<strong>Carbon Hotspot:</strong> แนะนำใช้ kgCO₂e/pcs เป็น KPI และเชื่อมกับแผนลดพลังงาน'); }
  if(actions.length === 0){ html += addInsight('<strong>System Stable:</strong> เก็บข้อมูลต่อเนื่องเพื่อทำ Baseline, Trend และ AI Prediction ใน Phase 2-3'); }
  return { html, problems, actions };
}
function buildReport(input, metrics, insights){
return `Industrial AI Dashboard V2 Report

Machine/Line: ${input.machine}
Shift: ${input.shift}

KPI Summary:
- Availability: ${pct(metrics.availability)}
- Performance: ${pct(metrics.performance)}
- Quality: ${pct(metrics.quality)}
- OEE: ${pct(metrics.oee)}
- Downtime Rate: ${pct(metrics.downtimeRate)}
- Scrap Rate: ${pct(metrics.scrapRate)}
- Energy Cost: ${num(metrics.energyCost,2)} บาท
- Carbon Emission: ${num(metrics.carbon,2)} kgCO₂e
- Estimated Output Loss: ${num(metrics.lossOutput,0)} pcs

Main Issues:
${insights.problems.length ? insights.problems.map(x=>'- '+x).join('\n') : '- No major issue detected by rule-based engine'}

Recommended Action:
${insights.actions.length ? insights.actions.map(x=>'- '+x).join('\n') : '- Continue data collection and baseline monitoring'}

Next Roadmap:
Phase 2: Connect IIoT / MQTT / OPC-UA
Phase 3: Add AI Analytics + ESG Intelligence
Phase 4: SaaS + Multi-factory + Predictive System`;
}
