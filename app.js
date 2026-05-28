let kpiChart, paretoChart, energyChart, carbonChart;
function readInput(){ return { machine:document.getElementById('machine').value, shift:document.getElementById('shift').value, planned:Number(document.getElementById('plannedTime').value), downtime:Number(document.getElementById('downtime').value), cycle:Number(document.getElementById('cycleTime').value), total:Number(document.getElementById('totalOutput').value), good:Number(document.getElementById('goodOutput').value), kwh:Number(document.getElementById('kwh').value), costKwh:Number(document.getElementById('costKwh').value), ef:Number(document.getElementById('ef').value) }; }
function calculate(){
  const input=readInput(); const m=computeMetrics(input);
  setKPI('av','avStatus',m.availability,.90,.75); setKPI('pf','pfStatus',m.performance,.90,.75); setKPI('ql','qlStatus',m.quality,.98,.95); setKPI('oee','oeeStatus',m.oee,.85,.60); setKPI('scrap','scrapStatus',m.scrapRate,.02,.05,true);
  document.getElementById('dtRate').textContent=pct(m.downtimeRate);
  document.getElementById('energyCost').textContent=num(m.energyCost,2)+' บาท';
  document.getElementById('loss').textContent=num(m.lossOutput,0)+' pcs';
  document.getElementById('carbonValue').textContent=num(m.carbon,2);
  document.getElementById('powerNow').textContent=num(m.powerNow,1)+' kW';
  renderCharts(m);
  const insights=buildInsights({...input,...m});
  document.getElementById('insights').innerHTML=insights.html;
  document.getElementById('report').value=buildReport(input,m,insights);
}
function chartOptions(){ return {responsive:true,plugins:{legend:{labels:{color:'#ecf6ff'}}},scales:{y:{beginAtZero:true,ticks:{color:'#8ea4bd'},grid:{color:'#203654'}},x:{ticks:{color:'#8ea4bd'},grid:{color:'#203654'}}}}; }
function renderCharts(m){
  const kpiData=[m.availability,m.performance,m.quality,m.oee,m.scrapRate].map(v=>+(v*100).toFixed(1));
  if(kpiChart) kpiChart.destroy(); kpiChart=new Chart(document.getElementById('kpiChart'),{type:'bar',data:{labels:['Availability','Performance','Quality','OEE','Scrap'],datasets:[{label:'KPI %',data:kpiData}]},options:{...chartOptions(),scales:{...chartOptions().scales,y:{...chartOptions().scales.y,max:100}}}});
  if(paretoChart) paretoChart.destroy(); paretoChart=new Chart(document.getElementById('paretoChart'),{type:'bar',data:{labels:['Mold','Machine','Material','Manpower','Method'],datasets:[{label:'Downtime / Defect Impact',data:[42,28,16,9,5]}]},options:chartOptions()});
  if(energyChart) energyChart.destroy(); energyChart=new Chart(document.getElementById('energyChart'),{type:'line',data:{labels:['08:00','10:00','12:00','14:00','16:00','18:00'],datasets:[{label:'kWh Trend',data:[80,110,95,125,105,m.kwh/6]}]},options:chartOptions()});
  if(carbonChart) carbonChart.destroy(); carbonChart=new Chart(document.getElementById('carbonChart'),{type:'doughnut',data:{labels:['Production','Utility','Idle Loss'],datasets:[{data:[65,25,10]}]},options:{plugins:{legend:{labels:{color:'#ecf6ff'}}}}});
}
function simulateIIoT(){ const power=110+Math.random()*45, air=60+Math.random()*25, chiller=55+Math.random()*25; document.getElementById('liveKw').textContent=power.toFixed(0)+' kW'; document.getElementById('airLoad').textContent=air.toFixed(0)+'%'; document.getElementById('chillerLoad').textContent=chiller.toFixed(0)+'%'; }
loadData(); calculate(); simulateIIoT(); setInterval(simulateIIoT,3000);
