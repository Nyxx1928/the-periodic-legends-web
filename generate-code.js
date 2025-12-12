const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase with your service key (not anon key)
const supabase = createClient('https://kckasgowvaguzkdlpdyw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja2FzZ293dmFndXprZGxwZHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NjYxMTYsImV4cCI6MjA1ODE0MjExNn0.XEz-ctZwaduNZw0vtYySSVgBkF7mseKLbBtk2_ABRX8');

async function generateCode(prefix = 'TEACH', length = 6) {
    const randomPart = Math.random().toString(36).substr(2, length).toUpperCase();
    const code = `${prefix}-${randomPart}-${new Date().getFullYear()}`; // e.g., TEACH-ABC123-2025

    try {
        const { data, error } = await supabase
            .from('teacher_codes')
            .insert([{ code, is_used: false, expires_at: '2026-01-01T00:00:00Z' }])
            .select();

        if (error) throw error;

        console.log(`Generated code: ${code}`);
        console.log('Details:', data[0]);
        return code;
    } catch (error) {
        console.error('Error generating code:', error.message);
        return null;
    }
}

// Generate a single code
generateCode();