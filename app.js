let chart;

function readInput(){
  return {
    machine: document.getElementById('machine').value,
    shift: document.getElementById('shift').value,
    planned: Number(document.getElementById('plannedTime').value),
    downtime: Number(document.getElementById('downtime').value),
    cycle: Number(document.getElementById('cycleTime').value),
    total: Number(document.getElementById('totalOutput').value),
    good: Number(document.getElementById('goodOutput').value),
    kwh: Number(document.getElementById('kwh').value),
    costKwh: Number(document.getElementById('costKwh').value),
    ef: Number(document.getElementById('ef').value)
  };
}

function calculate(){
  const input = readInput();
  const metrics = computeMetrics(input);

  setKPI('av', 'avStatus', metrics.availability, .90, .75);
  setKPI('pf', 'pfStatus', metrics.performance, .90, .75);
  setKPI('ql', 'qlStatus', metrics.quality, .98, .95);
  setKPI('oee', 'oeeStatus', metrics.oee, .85, .60);
  setKPI('scrap', 'scrapStatus', metrics.scrapRate, .02, .05, true);

  document.getElementById('energyCost').textContent = num(metrics.energyCost,2) + ' บาท';
  document.getElementById('carbon').textContent = num(metrics.carbon,2) + ' kgCO₂e';
  document.getElementById('dtRate').textContent = pct(metrics.downtimeRate);
  document.getElementById('loss').textContent = num(metrics.lossOutput,0) + ' ชิ้น';

  renderChart([metrics.availability, metrics.performance, metrics.quality, metrics.oee, metrics.scrapRate]);

  const insights = buildInsights({...input, ...metrics});
  document.getElementById('insights').innerHTML = insights.html;
  document.getElementById('report').value = buildReport(input, metrics, insights);
}

function renderChart(values){
  const ctx = document.getElementById('kpiChart');
  if(chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Availability','Performance','Quality','OEE','Scrap'],
      datasets: [{ label: 'KPI (%)', data: values.map(v=> +(v*100).toFixed(1)) }]
    },
    options: {
      scales:{
        y:{ beginAtZero:true, max:100, ticks:{color:'#9fb4cc'}, grid:{color:'#243a5c'} },
        x:{ ticks:{color:'#9fb4cc'}, grid:{color:'#243a5c'} }
      },
      plugins:{ legend:{labels:{color:'#eef6ff'}} }
    }
  });
}

loadData();
calculate();
