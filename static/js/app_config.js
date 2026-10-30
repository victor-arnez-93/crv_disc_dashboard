// Para testes locais: definir window.DISC_API_BASE antes deste script.
window.DISC_CONFIG = Object.freeze({
    apiBase: (window.DISC_API_BASE || 'https://server-crv-disc-dashboard.onrender.com').replace(/\/$/, '')
});
window.DISC_UI = {
    escape(value = '') {
        return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    },
    url(value) {
        try {
            const u = new URL(value, location.href);
            return ['http:', 'https:'].includes(u.protocol) ? u.href : '';
        } catch { return ''; }
    },
    text(value = '') {
        const doc = new DOMParser().parseFromString(String(value), 'text/html');
        doc.querySelectorAll('script,style,iframe,object,svg').forEach(el => el.remove());
        return doc.body.textContent.trim();
    }
};
