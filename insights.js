function addInsight(html){ return `<div class="insight">${html}</div>`; }

function buildInsights(data){
  let html = '';
  let problems = [];
  let actions = [];

  if(data.oee < .60){
    problems.push('OEE ต่ำกว่า 60%');
    actions.push('ทำ Pareto Downtime และ Scrap รายเครื่อง/รายกะทันที');
    html += addInsight('<strong>OEE เสี่ยงสูง:</strong> ควรแยก Loss เป็น Availability / Performance / Quality เพื่อหา Critical Loss');
  }else if(data.oee < .85){
    html += addInsight('<strong>OEE เฝ้าระวัง:</strong> ยังมีโอกาสเพิ่มผลผลิตผ่านการลด Downtime และลด Scrap');
  }else{
    html += addInsight('<strong>OEE อยู่ในระดับดี:</strong> ควรรักษามาตรฐานและเริ่มทำ Continuous Improvement');
  }

  if(data.downtimeRate > .10){
    problems.push('Downtime สูง');
    actions.push('ตรวจ PM, Mold, Machine Alarm, Changeover และ Manpower');
    html += addInsight('<strong>Downtime สูง:</strong> แนะนำตรวจ PM / Mold / Machine / Setup / Material Waiting');
  }

  if(data.scrapRate > .05){
    problems.push('Scrap สูง');
    actions.push('ตรวจ Material, Parameter, Mold Condition, Operator Method');
    html += addInsight('<strong>Scrap สูง:</strong> แนะนำทำ Root Cause แยก 4M: Man, Machine, Material, Method');
  }

  if(data.kwh > 500){
    actions.push('ตรวจ Air Compressor, Chiller, Cooling Tower และ Idle Machine');
    html += addInsight('<strong>Energy Usage สูง:</strong> ควรตรวจโหลด Air Compressor / Chiller / เครื่องเดินเปล่า / Leak ระบบลม');
  }

  if(data.carbon > 250){
    actions.push('จัดทำ Energy Reduction Plan และติดตาม Carbon intensity ต่อชิ้น');
    html += addInsight('<strong>Carbon สูง:</strong> ควรเริ่มติดตาม kgCO₂e/ชิ้น และเชื่อมกับแผนลดพลังงาน');
  }

  if(actions.length === 0){
    html += addInsight('<strong>ภาพรวมดี:</strong> ควรเก็บข้อมูลต่อเนื่องเพื่อสร้าง baseline และใช้เทียบรายสัปดาห์/รายเดือน');
  }

  return { html, problems, actions };
}

function buildReport(input, metrics, insights){
  return `Industrial AI Assistant – Phase 1 MVP Report

Machine/Line: ${input.machine}
Shift: ${input.shift}

ผลลัพธ์หลัก:
- OEE: ${pct(metrics.oee)}
- Downtime Rate: ${pct(metrics.downtimeRate)}
- Scrap Rate: ${pct(metrics.scrapRate)}
- Energy Cost: ${num(metrics.energyCost,2)} บาท
- Carbon Emission: ${num(metrics.carbon,2)} kgCO₂e
- Estimated Output Loss from Downtime: ${num(metrics.lossOutput,0)} ชิ้น

ประเด็นที่พบ:
${insights.problems.length ? insights.problems.map(x=>'- '+x).join('\n') : '- ยังไม่พบประเด็นเสี่ยงหลักจาก rule-based check'}

Action Plan แนะนำ:
${insights.actions.length ? insights.actions.map(x=>'- '+x).join('\n') : '- เก็บข้อมูลต่อเนื่องเพื่อสร้าง baseline และทำ trend analysis'}

หมายเหตุ:
Prototype นี้เป็น Rule-based AI Insight สำหรับ Phase 1 เท่านั้น ควรตรวจสอบข้อมูลจริงก่อนใช้ตัดสินใจเชิงธุรกิจหรือการรับรอง ESG/Carbon`;
}
