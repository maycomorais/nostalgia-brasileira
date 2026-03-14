// supabaseClient.js
// ─────────────────────────────────────────────────────────────
// Preencha com os dados do seu projeto no Supabase:
//   supabase.com → Settings → API
// ─────────────────────────────────────────────────────────────

const _SUPABASE_URL = 'https://bmuzodcvgdwysdoakagr.supabase.co';
const _SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdXpvZGN2Z2R3eXNkb2FrYWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODM5NzAsImV4cCI6MjA4OTA1OTk3MH0.i4DhVcLV16SktJ9DZjxcIi3b3d96OZOakY79c0gf6qw';

if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.error('ERRO CRÍTICO: Biblioteca Supabase não carregou.');
    alert('Erro de conexão. Por favor, recarregue a página.');
} else {
    window.supa = window.supabase.createClient(_SUPABASE_URL, _SUPABASE_KEY);
    console.log('Banco iniciado.');
}

async function checkUser() {
    const { data: { session } } = await window.supa.auth.getSession();
    if (!session) {
        window.location.href = 'login.html';
    }
    return session;
}
