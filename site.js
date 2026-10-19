(() => {
  const buttons = [...document.querySelectorAll('[data-language]')];
  function setLanguage(language) {
    const lang = language === 'en' ? 'en' : 'th';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-th][data-en]').forEach(node => {
      node.textContent = node.dataset[lang];
    });
    document.querySelectorAll('[data-alt-th]').forEach(node => {
      node.alt = node.getAttribute(`data-alt-${lang}`);
    });
    document.querySelectorAll('picture[data-shot]').forEach(picture => {
      const base = `${picture.dataset.prefix}img/${picture.dataset.shot}_${lang}`;
      const source = picture.querySelector('source');
      const img = picture.querySelector('img');
      source.srcset = `${base}-640.webp 640w, ${base}-1280.webp 1280w`;
      img.srcset = `${base}-640.png 640w, ${base}-1280.png 1280w`;
      img.src = `${base}-1280.png`;
      if (picture.parentElement.matches('a[data-full-image]')) {
        picture.parentElement.href = `${base}-1280.png`;
      }
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === lang)));
    const description = document.querySelector('meta[name="description"]');
    if (description?.dataset[lang]) description.content = description.dataset[lang];
    try { localStorage.setItem('muanlight-language', lang); } catch { /* The site still works when storage is unavailable. */ }
  }
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  let saved;
  try { saved = localStorage.getItem('muanlight-language'); } catch { /* Thai is the default. */ }
  setLanguage(saved);
})();
