const STORAGE_KEY = 'industrial_ai_dashboard_v2';
function saveData(){ const ids=['machine','shift','plannedTime','downtime','cycleTime','totalOutput','goodOutput','kwh','costKwh','ef']; const data={}; ids.forEach(id=>data[id]=document.getElementById(id).value); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); alert('บันทึกข้อมูลแล้ว'); }
function loadData(){ const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return; const data=JSON.parse(raw); Object.keys(data).forEach(id=>{ const el=document.getElementById(id); if(el) el.value=data[id]; }); }
function clearData(){ localStorage.removeItem(STORAGE_KEY); alert('ล้างข้อมูลที่บันทึกแล้ว'); }
function copyReport(){ const r=document.getElementById('report'); r.select(); document.execCommand('copy'); alert('Copy Report แล้ว'); }
