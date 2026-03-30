const $ = (id) => document.getElementById(id);

const fields = [
  'paramsB', 'weightBits', 'layers', 'hidden', 'attnHeads', 'kvHeads',
  'tokens', 'batch', 'concurrency', 'kvBytes', 'overheadPct', 'budget'
].map($);

function formatGB(value) {
  return `${value.toFixed(value >= 10 ? 1 : 2)} GB`;
}

function calculate() {
  const paramsB = parseFloat($('paramsB').value) || 0;
  const weightBits = parseFloat($('weightBits').value) || 0;
  const layers = parseFloat($('layers').value) || 0;
  const hidden = parseFloat($('hidden').value) || 0;
  const attnHeads = Math.max(parseFloat($('attnHeads').value) || 1, 1);
  const kvHeads = Math.max(parseFloat($('kvHeads').value) || 1, 1);
  const tokens = Math.max(parseFloat($('tokens').value) || 0, 0);
  const batch = Math.max(parseFloat($('batch').value) || 1, 1);
  const concurrency = Math.max(parseFloat($('concurrency').value) || 1, 1);
  const kvBytes = parseFloat($('kvBytes').value) || 0;
  const overheadPct = parseFloat($('overheadPct').value) || 0;
  const budget = parseFloat($('budget').value) || 0;

  const weightBytes = paramsB * 1e9 * (weightBits / 8);
  const weightGB = weightBytes / 1e9;

  const gqaFactor = kvHeads / attnHeads;
  const kvCacheBytes = tokens * layers * hidden * 2 * kvBytes * gqaFactor * batch * concurrency;
  const kvGB = kvCacheBytes / 1e9;

  const subtotalGB = weightGB + kvGB;
  const totalGB = subtotalGB * (1 + overheadPct);
  const remainingGB = budget - totalGB;

  $('weightOut').textContent = formatGB(weightGB);
  $('kvOut').textContent = formatGB(kvGB);
  $('totalOut').textContent = formatGB(totalGB);

  const fitOut = $('fitOut');
  const fitDetail = $('fitDetail');
  fitOut.className = '';

  if (remainingGB >= budget * 0.15) {
    fitOut.textContent = 'Yes, with healthy headroom';
    fitOut.classList.add('good');
    fitDetail.textContent = `Estimated free headroom: ${formatGB(remainingGB)}. This is usually more comfortable for real runtimes.`;
  } else if (remainingGB >= 0) {
    fitOut.textContent = 'Probably, but tight';
    fitOut.classList.add('warn');
    fitDetail.textContent = `Estimated remaining memory: ${formatGB(remainingGB)}. Tight fits can fail because of fragmentation, temp buffers, or runtime quirks.`;
  } else {
    fitOut.textContent = 'No, likely over budget';
    fitOut.classList.add('bad');
    fitDetail.textContent = `Estimated shortfall: ${formatGB(Math.abs(remainingGB))}. Reduce context, concurrency, precision, or model size.`;
  }
}

fields.forEach((field) => field.addEventListener('input', calculate));
calculate();
