let kpiChart, paretoChart, energyChart, carbonChart;

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
  const m = computeMetrics(input);

  setKPI('av', 'avStatus', m.availability, .90, .75);
  setKPI('pf', 'pfStatus', m.performance, .90, .75);
  setKPI('ql', 'qlStatus', m.quality, .98, .95);
  setKPI('oee', 'oeeStatus', m.oee, .85, .60);
  setKPI('scrap', 'scrapStatus', m.scrapRate, .02, .05, true);

  document.getElementById('dtRate').textContent = pct(m.downtimeRate);
  document.getElementById('energyCost').textContent = num(m.energyCost,2) + ' บาท';
  document.getElementById('loss').textContent = num(m.lossOutput,0) + ' pcs';
  document.getElementById('carbonValue').textContent = num(m.carbon,2);
  document.getElementById('powerNow').textContent = num(m.powerNow,1) + ' kW';

  renderCharts(m);

  const insights = buildInsights({...input, ...m});
  document.getElementById('insights').innerHTML = insights.html;
  document.getElementById('report').value = buildReport(input, m, insights);
}

function chartOptions(){
  return {
    responsive:true,
    plugins:{legend:{labels:{color:'#ecf6ff'}}},
    scales:{
      y:{beginAtZero:true,ticks:{color:'#8ea4bd'},grid:{color:'#203654'}},
      x:{ticks:{color:'#8ea4bd'},grid:{color:'#203654'}}
    }
  };
}

function renderCharts(m){
  const kpiData = [m.availability, m.performance, m.quality, m.oee, m.scrapRate].map(v => +(v*100).toFixed(1));
  if(kpiChart) kpiChart.destroy();
  kpiChart = new Chart(document.getElementById('kpiChart'),{
    type:'bar',
    data:{labels:['Availability','Performance','Quality','OEE','Scrap'],datasets:[{label:'KPI %',data:kpiData}]},
    options:{...chartOptions(), scales:{...chartOptions().scales, y:{...chartOptions().scales.y,max:100}}}
  });

  if(paretoChart) paretoChart.destroy();
  paretoChart = new Chart(document.getElementById('paretoChart'),{
    type:'bar',
    data:{labels:['Mold','Machine','Material','Manpower','Method'],datasets:[{label:'Downtime / Defect Impact',data:[42,28,16,9,5]}]},
    options:chartOptions()
  });

  if(energyChart) energyChart.destroy();
  energyChart = new Chart(document.getElementById('energyChart'),{
    type:'line',
    data:{labels:['08:00','10:00','12:00','14:00','16:00','18:00'],datasets:[{label:'kWh Trend',data:[80,110,95,125,105, m.kwh/6]}]},
    options:chartOptions()
  });

  if(carbonChart) carbonChart.destroy();
  carbonChart = new Chart(document.getElementById('carbonChart'),{
    type:'doughnut',
    data:{labels:['Production','Utility','Idle Loss'],datasets:[{data:[65,25,10]}]},
    options:{plugins:{legend:{labels:{color:'#ecf6ff'}}}}
  });
}

function simulateIIoT(){
  const power = 110 + Math.random()*45;
  const air = 60 + Math.random()*25;
  const chiller = 55 + Math.random()*25;
  document.getElementById('liveKw').textContent = power.toFixed(0)+' kW';
  document.getElementById('airLoad').textContent = air.toFixed(0)+'%';
  document.getElementById('chillerLoad').textContent = chiller.toFixed(0)+'%';
}

loadData();
calculate();
simulateIIoT();
setInterval(simulateIIoT, 3000);

/* ===== V3 Live Dashboard Functions ===== */
function updateClock(){
  const el = document.getElementById("liveClock");
  if(!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString("th-TH", { hour12:false });
}

function generateFactoryLayout(){
  const map = document.getElementById("factoryMap");
  if(!map) return;

  const zones = {
    "Zone A | Left Injection Area": [1,2,3,4,5,6,7,8,9,10,11,12],
    "Zone B | Heavy Injection Area": [14,15,16,17,18,19,20,21,22,23,24],
    "Zone C | Center / High Tonnage Area": [25,26,27,28,29,30,31,33,34,35,36,47],
    "Zone D | Small Machine / WH Side": [38,39,41,42,43,45,46]
  };

  const statusList = ["Running", "Setup", "Alarm", "Idle"];
  const statusClass = {
    "Running":"good",
    "Setup":"warn",
    "Alarm":"danger",
    "Idle":""
  };

  map.innerHTML = "";

  Object.entries(zones).forEach(([zoneName, machineNumbers]) => {
    const zoneBox = document.createElement("div");
    zoneBox.className = "zone-box";

    const title = document.createElement("h4");
    title.textContent = zoneName;
    zoneBox.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "zone-grid";

    machineNumbers.forEach((machineNo, index) => {
      const status = statusList[(machineNo + index) % statusList.length];
      const machine = document.createElement("div");
      machine.className = "machine " + statusClass[status];
      machine.innerHTML = "IMM-" + String(machineNo).padStart(2,"0") + "<br><small>" + status + "</small>";
      grid.appendChild(machine);
    });

    zoneBox.appendChild(grid);
    map.appendChild(zoneBox);
  });
}

function updateAlarmStrip(){
  const strip = document.getElementById("alarmStrip");
  const text = document.getElementById("alarmText");
  if(!strip || !text) return;

  const alerts = [
    "Monitoring stable. OEE and energy load are within watch range.",
    "Zone B: Heavy injection area should be monitored for energy load.",
    "Air Compressor load fluctuating. Check air leak and pressure drop.",
    "IMM Alarm simulation detected. Review machine stop reason and mold condition."
  ];

  const index = Math.floor(Math.random() * alerts.length);
  text.textContent = alerts[index];

  strip.classList.remove("warning","critical");
  if(index === 2) strip.classList.add("warning");
  if(index === 3) strip.classList.add("critical");
}

updateClock();
setInterval(updateClock, 1000);
generateFactoryLayout();
updateAlarmStrip();
setInterval(updateAlarmStrip, 5000);
