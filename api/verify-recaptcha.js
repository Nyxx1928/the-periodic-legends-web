export default async function handler(req, res) {
    console.log('Function invoked with method:', req.method); // Log for debugging

    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { token } = req.body;
    if (!token) {
        console.log('No token provided');
        return res.status(400).json({ success: false, error: 'No token provided' });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
        console.error('Missing RECAPTCHA_SECRET_KEY environment variable');
        return res.status(500).json({ success: false, error: 'Server configuration error' });
    }

    try {
        console.log('Verifying token with Google...');
        const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        const googleResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: secret,
                response: token
            }).toString()
        });

        if (!googleResponse.ok) {
            console.error('Google reCAPTCHA API error:', googleResponse.status);
            throw new Error(`Google API error: ${googleResponse.status}`);
        }

        const data = await googleResponse.json();
        console.log('Verification result:', data);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Function error:', error.message, error.stack);
        return res.status(500).json({ success: false, error: 'Server error during verification' });
    }
}