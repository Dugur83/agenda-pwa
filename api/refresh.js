export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://agenda-pwa-wheat.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'No refresh token' });

  const params = new URLSearchParams({
    refresh_token: token,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: 'refresh_token'
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();
  res.json(data);
}
