// Shared language switcher for maple-dawn pages.
// Each page writes its English text in the HTML (data-i18n="key") and sets
// window.I18N = { lang: { key: html } } for other languages. Missing keys fall back
// to the page's own English text. The chosen language is shared across the site.
(function () {
  var LANGS = [
    ['en', 'English', 'EN'], ['zh-Hans', '简体中文', '简'], ['zh-Hant', '繁體中文', '繁'], ['ja', '日本語', '日'],
    ['ko', '한국어', '한'], ['fr', 'Français', 'FR'], ['de', 'Deutsch', 'DE'], ['es', 'Español', 'ES'],
    ['pt', 'Português', 'PT'], ['it', 'Italiano', 'IT'], ['ru', 'Русский', 'RU'], ['tr', 'Türkçe', 'TR'],
    ['vi', 'Tiếng Việt', 'VI'], ['th', 'ไทย', 'TH'], ['id', 'Bahasa Indonesia', 'ID'], ['ar', 'العربية', 'AR']
  ];
  // Privacy and support pages only carry these sections; other languages link to English.
  var ANCHOR = { en: 'en', 'zh-Hans': 'zh-hans', 'zh-Hant': 'zh-hant', ja: 'ja' };
  var RTL = { ar: true };

  // Strings shared by every app landing page.
  var COMMON = {
    'zh-Hans': { 'nav.more': '更多 App', 'cta.download': '在 App Store 下载', 'cta.soon': '即将登陆 App Store', 'meta.free': '免费下载', 'sec.features': '功能', 'sec.privacy': '为隐私而设计', 'sec.pricing': '价格', 'link.privacy': '隐私政策', 'link.support': '支持', 'footer': '用心制作。' },
    'zh-Hant': { 'nav.more': '更多 App', 'cta.download': '在 App Store 下載', 'cta.soon': '即將登上 App Store', 'meta.free': '免費下載', 'sec.features': '功能', 'sec.privacy': '為隱私而設計', 'sec.pricing': '價格', 'link.privacy': '隱私權政策', 'link.support': '支援', 'footer': '用心製作。' },
    'ja': { 'nav.more': 'ほかのアプリ', 'cta.download': 'App Store からダウンロード', 'cta.soon': 'App Store にまもなく登場', 'meta.free': '無料ダウンロード', 'sec.features': '機能', 'sec.privacy': 'プライバシーを第一に', 'sec.pricing': '価格', 'link.privacy': 'プライバシーポリシー', 'link.support': 'サポート', 'footer': '心を込めて作っています。' },
    'ko': { 'nav.more': '다른 앱', 'cta.download': 'App Store에서 다운로드', 'cta.soon': 'App Store 출시 예정', 'meta.free': '무료 다운로드', 'sec.features': '기능', 'sec.privacy': '개인정보 보호 중심 설계', 'sec.pricing': '가격', 'link.privacy': '개인정보 처리방침', 'link.support': '지원', 'footer': '정성껏 만들었습니다.' },
    'fr': { 'nav.more': 'Autres apps', 'cta.download': 'Télécharger dans l’App Store', 'cta.soon': 'Bientôt sur l’App Store', 'meta.free': 'Téléchargement gratuit', 'sec.features': 'Fonctionnalités', 'sec.privacy': 'Respect de la vie privée', 'sec.pricing': 'Tarifs', 'link.privacy': 'Politique de confidentialité', 'link.support': 'Assistance', 'footer': 'Fait avec soin.' },
    'de': { 'nav.more': 'Weitere Apps', 'cta.download': 'Im App Store laden', 'cta.soon': 'Bald im App Store', 'meta.free': 'Kostenloser Download', 'sec.features': 'Funktionen', 'sec.privacy': 'Datenschutz von Anfang an', 'sec.pricing': 'Preise', 'link.privacy': 'Datenschutzerklärung', 'link.support': 'Support', 'footer': 'Mit Sorgfalt gemacht.' },
    'es': { 'nav.more': 'Más apps', 'cta.download': 'Descargar en el App Store', 'cta.soon': 'Muy pronto en el App Store', 'meta.free': 'Descarga gratuita', 'sec.features': 'Funciones', 'sec.privacy': 'Privacidad desde el diseño', 'sec.pricing': 'Precio', 'link.privacy': 'Política de privacidad', 'link.support': 'Soporte', 'footer': 'Hecho con cariño.' },
    'pt': { 'nav.more': 'Mais apps', 'cta.download': 'Baixar na App Store', 'cta.soon': 'Em breve na App Store', 'meta.free': 'Download gratuito', 'sec.features': 'Recursos', 'sec.privacy': 'Privacidade desde o início', 'sec.pricing': 'Preço', 'link.privacy': 'Política de Privacidade', 'link.support': 'Suporte', 'footer': 'Feito com carinho.' },
    'it': { 'nav.more': 'Altre app', 'cta.download': 'Scarica su App Store', 'cta.soon': 'Presto su App Store', 'meta.free': 'Download gratuito', 'sec.features': 'Funzioni', 'sec.privacy': 'Privacy fin dalla progettazione', 'sec.pricing': 'Prezzi', 'link.privacy': 'Informativa sulla privacy', 'link.support': 'Assistenza', 'footer': 'Fatto con cura.' },
    'ru': { 'nav.more': 'Другие приложения', 'cta.download': 'Загрузите в App Store', 'cta.soon': 'Скоро в App Store', 'meta.free': 'Бесплатная загрузка', 'sec.features': 'Возможности', 'sec.privacy': 'Приватность по умолчанию', 'sec.pricing': 'Цена', 'link.privacy': 'Политика конфиденциальности', 'link.support': 'Поддержка', 'footer': 'Сделано с заботой.' },
    'tr': { 'nav.more': 'Diğer uygulamalar', 'cta.download': 'App Store’dan indirin', 'cta.soon': 'Yakında App Store’da', 'meta.free': 'Ücretsiz indirin', 'sec.features': 'Özellikler', 'sec.privacy': 'Gizlilik odaklı tasarım', 'sec.pricing': 'Fiyat', 'link.privacy': 'Gizlilik Politikası', 'link.support': 'Destek', 'footer': 'Özenle yapıldı.' },
    'vi': { 'nav.more': 'Ứng dụng khác', 'cta.download': 'Tải về trên App Store', 'cta.soon': 'Sắp có trên App Store', 'meta.free': 'Tải miễn phí', 'sec.features': 'Tính năng', 'sec.privacy': 'Riêng tư ngay từ thiết kế', 'sec.pricing': 'Giá', 'link.privacy': 'Chính sách quyền riêng tư', 'link.support': 'Hỗ trợ', 'footer': 'Làm bằng cả tấm lòng.' },
    'th': { 'nav.more': 'แอปอื่น ๆ', 'cta.download': 'ดาวน์โหลดบน App Store', 'cta.soon': 'เร็ว ๆ นี้บน App Store', 'meta.free': 'ดาวน์โหลดฟรี', 'sec.features': 'ฟีเจอร์', 'sec.privacy': 'ออกแบบเพื่อความเป็นส่วนตัว', 'sec.pricing': 'ราคา', 'link.privacy': 'นโยบายความเป็นส่วนตัว', 'link.support': 'ฝ่ายสนับสนุน', 'footer': 'สร้างด้วยใจ' },
    'id': { 'nav.more': 'Aplikasi lain', 'cta.download': 'Unduh di App Store', 'cta.soon': 'Segera hadir di App Store', 'meta.free': 'Unduh gratis', 'sec.features': 'Fitur', 'sec.privacy': 'Privasi sejak awal', 'sec.pricing': 'Harga', 'link.privacy': 'Kebijakan Privasi', 'link.support': 'Dukungan', 'footer': 'Dibuat dengan sepenuh hati.' },
    'ar': { 'nav.more': 'تطبيقات أخرى', 'cta.download': 'التنزيل من App Store', 'cta.soon': 'قريبًا على App Store', 'meta.free': 'تنزيل مجاني', 'sec.features': 'الميزات', 'sec.privacy': 'الخصوصية أولًا', 'sec.pricing': 'السعر', 'link.privacy': 'سياسة الخصوصية', 'link.support': 'الدعم', 'footer': 'صُنع بعناية.' }
  };

  var LABEL = {};
  LANGS.forEach(function (l) { LABEL[l[0]] = l[2]; });

  function store(lang) { try { localStorage.setItem('lang', lang); } catch (e) {} }
  function saved() { try { return localStorage.getItem('lang'); } catch (e) { return null; } }

  function init() {
    var pageDict = window.I18N || {};
    var nodes = document.querySelectorAll('[data-i18n]');
    var descMeta = document.querySelector('meta[name="description"]');
    var select = document.getElementById('lang');
    var label = document.getElementById('lang-label');

    // English is the markup itself; capture it so switching back works.
    var en = { _title: document.title, _desc: descMeta ? descMeta.content : '' };
    nodes.forEach(function (el) { en[el.getAttribute('data-i18n')] = el.innerHTML; });

    select.innerHTML = '';
    LANGS.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l[0]; o.textContent = l[1]; o.lang = l[0];
      select.appendChild(o);
    });

    function lookup(lang, key) {
      var page = pageDict[lang] || {}, common = COMMON[lang] || {};
      if (page[key] != null) return page[key];
      if (common[key] != null) return common[key];
      return en[key];
    }

    function apply(lang) {
      var root = document.documentElement;
      root.lang = lang;
      root.dir = RTL[lang] ? 'rtl' : 'ltr';
      document.title = lang === 'en' ? en._title : lookup(lang, '_title');
      if (descMeta) descMeta.content = lang === 'en' ? en._desc : lookup(lang, '_desc');
      nodes.forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        el.innerHTML = lang === 'en' ? en[key] : lookup(lang, key);
      });
      document.querySelectorAll('a[data-anchor]').forEach(function (a) {
        a.setAttribute('href', a.getAttribute('href').split('#')[0] + '#' + (ANCHOR[lang] || 'en'));
      });
      label.textContent = LABEL[lang];
      select.value = lang;
    }

    var lang = new URLSearchParams(location.search).get('lang');
    if (!LABEL[lang]) lang = saved();
    if (!LABEL[lang]) lang = 'en';
    apply(lang);

    select.addEventListener('change', function () {
      var next = select.value;
      apply(next);
      store(next);
      var url = new URL(location.href);
      if (next === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
    });
  }

  window.MapleI18n = { init: init, LANGS: LANGS };
})();
