const clocks = document.getElementById('clocks');
const search = document.getElementById('search');

search.value = '';
search.focus();

search.addEventListener('keydown', (e) => {
  if (e.key == 'Enter' && !e.shiftKey) {
    let val = document.getElementById('search').value;
    if (!val) return;
    if (val.startsWith(';')) {
      let nval = val.replace(/https/i, '');
      nval = val.replace(/http/i, '');
      nval = nval.replace(/\:\/\//i, '');
      nval = nval.replace(/\;/i, '');
      nval = `https://${nval}`;
      window.open(nval, '_blank', 'noopener,noreferrer');
    } else {
      window.open(
        `https://kagi.com/search?q=${encodeURIComponent(val)}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
    document.getElementById('search').value = '';
  }
});

// (async () => {
//   document.getElementById('weather').innerText = await (
//     await fetch('https://Weather-Api-NO-KEY.miftikcz.repl.co')
//   ).text();
// })();

const updateTime = () => {
  const timeFormat = `%h:%m`;
  let date = new Date();
  let mm = date.getMinutes();
  if (mm < 10) {
    mm = '0' + mm.toString();
  }
  clocks.innerText = timeFormat
    .split('%h')
    .join(date.getHours())
    .split('%m')
    .join(mm)
    .split('%s')
    .join(date.getSeconds())
    .split('%t')
    .join(date.getMilliseconds());
};

setTimeout(() => {
  setInterval(() => {
    updateTime();
  }, 10 * 1000);
}, (60 - new Date().getMinutes()) * 1000);

updateTime();
