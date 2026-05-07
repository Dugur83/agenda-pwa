export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) return res.redirect('/?auth_error=' + error);

  const params = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: 'https://agenda-pwa-wheat.vercel.app/api/callback',
    grant_type: 'authorization_code'
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();

  if (data.error) return res.redirect('/?auth_error=' + data.error);

  const fragment = new URLSearchParams({
    access_token: data.access_token,
    expires_in: data.expires_in,
    refresh_token: data.refresh_token || ''
  });

  res.redirect('/#' + fragment.toString());
}
