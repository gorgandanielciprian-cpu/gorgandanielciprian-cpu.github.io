
const INITIAL_ITEMS = [
  {
    "id": 1,
    "etapa": "Fundații",
    "cod": "BET-001",
    "material": "Beton egalizare C12/15",
    "um": "mc",
    "cantitate": 6.5,
    "estimat": 400,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 2,
    "etapa": "Fundații",
    "cod": "BET-002",
    "material": "Beton C25/30 talpă fundație",
    "um": "mc",
    "cantitate": 43,
    "estimat": 520,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 3,
    "etapa": "Fundații",
    "cod": "ARM-001",
    "material": "Armătură B500C infrastructură",
    "um": "kg",
    "cantitate": 3529.57,
    "estimat": 5.5,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 4,
    "etapa": "Structură",
    "cod": "BET-007",
    "material": "Beton C20/25 placă peste parter",
    "um": "mc",
    "cantitate": 23,
    "estimat": 480,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 5,
    "etapa": "Structură",
    "cod": "ARM-002",
    "material": "Armătură B500C suprastructură",
    "um": "kg",
    "cantitate": 5244.7,
    "estimat": 5.5,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 6,
    "etapa": "Structură",
    "cod": "ZID-001",
    "material": "Zidărie blocuri ceramice 25 cm",
    "um": "mc",
    "cantitate": 48.5,
    "estimat": 650,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 7,
    "etapa": "Șarpantă",
    "cod": "LEM-001",
    "material": "Lemn C24 șarpantă",
    "um": "mc",
    "cantitate": 8.3957,
    "estimat": 2200,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 8,
    "etapa": "Șarpantă",
    "cod": "INV-001",
    "material": "Învelitoare tablă fălțuită / țiglă",
    "um": "mp",
    "cantitate": 220,
    "estimat": 150,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 9,
    "etapa": "Anvelopă",
    "cod": "EPS-001",
    "material": "Polistiren EPS 15 cm fațadă",
    "um": "mp",
    "cantitate": 190,
    "estimat": 55,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 10,
    "etapa": "Instalații",
    "cod": "INC-001",
    "material": "Încălzire în pardoseală",
    "um": "mp",
    "cantitate": 177,
    "estimat": 160,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 11,
    "etapa": "Sisteme",
    "cod": "HP-001",
    "material": "Pompă de căldură aer-apă 10–14 kW",
    "um": "buc",
    "cantitate": 1,
    "estimat": 30000,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 12,
    "etapa": "Sisteme",
    "cod": "PV-001",
    "material": "Panouri fotovoltaice 15 kWp",
    "um": "kWp",
    "cantitate": 15,
    "estimat": 1400,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 13,
    "etapa": "Sisteme",
    "cod": "PV-003",
    "material": "Baterie LiFePO4 stocare",
    "um": "kWh",
    "cantitate": 10,
    "estimat": 1700,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 14,
    "etapa": "Sisteme",
    "cod": "APA-001",
    "material": "Foraj apă 25–50 m",
    "um": "ml",
    "cantitate": 40,
    "estimat": 350,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 15,
    "etapa": "Sisteme",
    "cod": "FIL-002",
    "material": "Dedurizator casnic 20–25 l",
    "um": "buc",
    "cantitate": 1,
    "estimat": 4200,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 16,
    "etapa": "Finisaje",
    "cod": "FIN-004",
    "material": "Parchet + plinte",
    "um": "mp",
    "cantitate": 120,
    "estimat": 150,
    "real": 0,
    "sursa": "Deviz BOM"
  },
  {
    "id": 17,
    "etapa": "Exterior",
    "cod": "EXT-001",
    "material": "Alei și platforme beton/pavaj",
    "um": "mp",
    "cantitate": 125,
    "estimat": 230,
    "real": 0,
    "sursa": "Deviz BOM"
  }
];
const stages = ['Toate', 'Fundații', 'Structură', 'Șarpantă', 'Anvelopă', 'Instalații', 'Finisaje', 'Exterior', 'Sisteme'];
let items = load('deviz-items', INITIAL_ITEMS);
let priceAlerts = load('price-alerts', []);
let dismissedBudget = load('dismissed-budget', []);
let notificationsEnabled = localStorage.getItem('notifications-enabled') === 'true';
let currentStage = 'Toate';
let currentSort = 'impact';
let query = '';
let deferredPrompt = null;
let previousItems = JSON.parse(JSON.stringify(items));

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
function save() { localStorage.setItem('deviz-items', JSON.stringify(items)); }
function ron(v) { return new Intl.NumberFormat('ro-RO', {style:'currency', currency:'RON', maximumFractionDigits:0}).format(v || 0); }
function pct(v) { return isFinite(v) ? `${v > 0 ? '+' : ''}${v.toFixed(1)}%` : '-'; }
function calc(item) {
  const estimatTotal = Number(item.cantitate) * Number(item.estimat || 0);
  const realTotal = Number(item.cantitate) * Number(item.real || 0);
  const delta = realTotal > 0 ? realTotal - estimatTotal : 0;
  const deltaPct = realTotal > 0 && estimatTotal ? delta / estimatTotal * 100 : 0;
  return {...item, estimatTotal, realTotal, delta, deltaPct};
}
function statusClass(deltaPct) {
  if (!deltaPct) return ['Fără preț real', 'neutral'];
  if (deltaPct <= -5) return ['Sub estimat', 'good'];
  if (deltaPct <= 5) return ['În buget', 'ok'];
  if (deltaPct <= 15) return ['Atenție', 'warn'];
  return ['Depășire mare', 'bad'];
}
function detectPriceChanges(nextItems) {
  const changes = [];
  nextItems.forEach(item => {
    const old = previousItems.find(x => x.id === item.id);
    if (!old) return;
    [['real','Preț real'], ['estimat','Preț estimat']].forEach(([field,label]) => {
      const oldValue = Number(old[field] || 0), newValue = Number(item[field] || 0);
      if (oldValue === newValue) return;
      const absChange = newValue - oldValue;
      const pctChange = oldValue > 0 ? absChange / oldValue * 100 : 100;
      const alert = {
        id: `${item.id}-${field}-${Date.now()}-${Math.random()}`, itemId:item.id, etapa:item.etapa, material:item.material,
        label, oldValue, newValue, absChange, pctChange, date:new Date().toLocaleString('ro-RO'),
        severity: Math.abs(pctChange) > 15 || Math.abs(absChange * Number(item.cantitate || 1)) > 5000 ? 'critical' : 'info'
      };
      changes.push(alert);
    });
  });
  if (changes.length) {
    priceAlerts = [...changes, ...priceAlerts].slice(0, 40);
    localStorage.setItem('price-alerts', JSON.stringify(priceAlerts));
    const critical = changes.find(x => x.severity === 'critical');
    if (critical && notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Modificare importantă de preț', { body: `${critical.material}: ${critical.label} ${ron(critical.oldValue)} → ${ron(critical.newValue)} (${pct(critical.pctChange)})` });
    }
  }
  previousItems = JSON.parse(JSON.stringify(nextItems));
}
function persist(nextItems) { detectPriceChanges(nextItems); items = nextItems; save(); render(); }
function enableNotifications() {
  if (!('Notification' in window)) return alert('Notificările nu sunt disponibile în acest browser.');
  Notification.requestPermission().then(p => { notificationsEnabled = p === 'granted'; localStorage.setItem('notifications-enabled', notificationsEnabled); render(); });
}
function disableNotifications() { notificationsEnabled = false; localStorage.setItem('notifications-enabled','false'); render(); }
function exportCsv() {
  const enriched = items.map(calc);
  const header = ['Etapa','Cod','Material','UM','Cantitate','Preț estimat','Preț real','Total estimat','Total real','Delta','Delta %'];
  const rows = enriched.map(i => [i.etapa,i.cod,i.material,i.um,i.cantitate,i.estimat,i.real,i.estimatTotal,i.realTotal,i.delta,i.deltaPct.toFixed(2)]);
  const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('
');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='comparatie_deviz_vs_piata.csv'; a.click(); URL.revokeObjectURL(url);
}
function updateItem(id, field, value) {
  const next = items.map(i => i.id === id ? {...i, [field]: field === 'material' || field === 'cod' || field === 'um' ? value : Number(value)} : i);
  persist(next);
}
function deleteItem(id) { persist(items.filter(i => i.id !== id)); }
function addItem() {
  const material = document.getElementById('new-material').value.trim(); if (!material) return;
  const newItem = { id: Date.now(), etapa: document.getElementById('new-stage').value, cod: document.getElementById('new-cod').value || 'NEW', material, um: document.getElementById('new-um').value || 'buc', cantitate: Number(document.getElementById('new-qty').value || 1), estimat: Number(document.getElementById('new-est').value || 0), real: Number(document.getElementById('new-real').value || 0), sursa:'Ofertă piață' };
  persist([...items, newItem]);
  ['new-material','new-cod','new-qty','new-est','new-real'].forEach(id => document.getElementById(id).value='');
}
function resetAll() { if(confirm('Resetezi toate datele?')) { priceAlerts=[]; dismissedBudget=[]; localStorage.clear(); location.reload(); } }
function render() {
  const enriched = items.map(calc);
  const completed = enriched.filter(i => i.real > 0);
  const estimat = enriched.reduce((s,i)=>s+i.estimatTotal,0);
  const real = enriched.reduce((s,i)=>s+i.realTotal,0);
  const estimatCuReal = completed.reduce((s,i)=>s+i.estimatTotal,0);
  const delta = real - estimatCuReal;
  const deltaPct = estimatCuReal ? delta / estimatCuReal * 100 : 0;
  document.getElementById('kpis').innerHTML = `
    <div class="kpi"><span>Estimat BOM</span><b>${ron(estimat)}</b><small>toate pozițiile</small></div>
    <div class="kpi"><span>Real introdus</span><b>${ron(real)}</b><small>${completed.length}/${items.length} completate</small></div>
    <div class="kpi wide"><span>Diferență pe pozițiile completate</span><b class="${delta>0?'red':delta<0?'green':''}">${ron(delta)}</b><small>${pct(deltaPct)}</small></div>`;

  const budgetAlerts = enriched.filter(i => i.real > 0 && i.deltaPct > 5).sort((a,b)=>b.deltaPct-a.deltaPct);
  document.getElementById('budget-alerts').innerHTML = `
    <div class="section-title"><h2>🔔 Notificări buget</h2><button onclick="${notificationsEnabled?'disableNotifications()':'enableNotifications()'}">${notificationsEnabled?'Oprește':'Activează'}</button></div>
    ${budgetAlerts.length ? budgetAlerts.slice(0,5).map(a => `<div class="alert ${a.deltaPct>15?'bad-bg':'warn-bg'}"><b>${a.deltaPct>15?'Depășire critică':'Atenție buget'} · ${a.etapa}</b><p>${a.material}</p><small>Estimat ${ron(a.estimatTotal)} · Real ${ron(a.realTotal)} · Diferență ${ron(a.delta)} / ${pct(a.deltaPct)}</small></div>`).join('') : '<p class="muted">Nu există depășiri active peste 5%.</p>'}`;

  document.getElementById('price-alerts').innerHTML = `
    <div class="section-title"><h2>🕘 Modificări preț</h2><button onclick="priceAlerts=[]; localStorage.removeItem('price-alerts'); render();">Curăță</button></div>
    ${priceAlerts.length ? priceAlerts.slice(0,6).map(a => `<div class="alert ${a.severity==='critical'?'bad-bg':'blue-bg'}"><b>${a.absChange>0?'↗ Preț crescut':'↘ Preț scăzut'} · ${a.label} · ${a.etapa}</b><p>${a.material}</p><small>${ron(a.oldValue)} → ${ron(a.newValue)} · ${ron(a.absChange)} / ${pct(a.pctChange)} · ${a.date}</small></div>`).join('') : '<p class="muted">Nu au fost modificate prețuri încă.</p>'}`;

  const stageMap = new Map();
  enriched.forEach(i => {
    const s = stageMap.get(i.etapa) || {etapa:i.etapa, estimat:0, real:0}; s.estimat += i.estimatTotal; s.real += i.realTotal; stageMap.set(i.etapa, s);
  });
  renderBars([...stageMap.values()]);

  let list = enriched.filter(i => (currentStage === 'Toate' || i.etapa === currentStage) && (!query || `${i.material} ${i.cod} ${i.etapa}`.toLowerCase().includes(query.toLowerCase())));
  if (currentSort === 'impact') list.sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta));
  if (currentSort === 'depășiri') list.sort((a,b)=>b.deltaPct-a.deltaPct);
  if (currentSort === 'alfabetic') list.sort((a,b)=>a.material.localeCompare(b.material));
  document.getElementById('items').innerHTML = list.map(i => { const [label, cls] = statusClass(i.deltaPct); return `
    <div class="item">
      <div class="item-head"><div><small>${i.etapa} · ${i.cod}</small><h3>${i.material}</h3><small>Cantitate: ${i.cantitate} ${i.um}</small></div><span class="pill ${cls}">${label}</span></div>
      <div class="grid2"><label>Preț estimat / ${i.um}<input type="number" value="${i.estimat}" onchange="updateItem(${i.id}, 'estimat', this.value)"></label><label>Preț real / ${i.um}<input type="number" value="${i.real || ''}" onchange="updateItem(${i.id}, 'real', this.value)" placeholder="0"></label></div>
      <div class="totals"><span>Estimat<br><b>${ron(i.estimatTotal)}</b></span><span>Real<br><b>${ron(i.realTotal)}</b></span><span>Delta<br><b class="${i.delta>0?'red':i.delta<0?'green':''}">${ron(i.delta)}</b></span></div>
      <button class="delete" onclick="deleteItem(${i.id})">Șterge</button>
    </div>`; }).join('');
}
function renderBars(data) {
  const max = Math.max(...data.map(d=>Math.max(d.estimat,d.real)),1);
  document.getElementById('bars').innerHTML = data.map(d => `<div class="bar-row"><b>${d.etapa}</b><div class="bar"><i style="width:${d.estimat/max*100}%"></i></div><small>${ron(d.estimat)}</small><div class="bar real"><i style="width:${d.real/max*100}%"></i></div><small>${ron(d.real)}</small></div>`).join('');
}
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; document.getElementById('install-button').style.display='block'; });
async function installApp() { if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; } }
window.updateItem=updateItem; window.deleteItem=deleteItem; window.addItem=addItem; window.resetAll=resetAll; window.exportCsv=exportCsv; window.enableNotifications=enableNotifications; window.disableNotifications=disableNotifications; window.installApp=installApp;
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('stage').innerHTML = stages.map(s=>`<option>${s}</option>`).join('');
  document.getElementById('new-stage').innerHTML = stages.filter(s=>s!=='Toate').map(s=>`<option>${s}</option>`).join('');
  document.getElementById('stage').onchange = e => { currentStage=e.target.value; render(); };
  document.getElementById('sort').onchange = e => { currentSort=e.target.value; render(); };
  document.getElementById('search').oninput = e => { query=e.target.value; render(); };
  render();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js');
});
