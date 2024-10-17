export default async (req, res) => {
  // Captura o token de autorização enviado pelo provedor OAuth
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Substitua pelo endpoint e parâmetros necessários para trocar o código por um token de acesso
    const response = await fetch('https://graph.facebook.com/v21.0/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.FACEBOOK_APP_ID, // Certifique-se de que essas variáveis estão definidas no Netlify
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: 'https://wolfbotcampaign.netlify.app/auth/callback',
        code,
      }),
    });

    const data = await response.json();
    if (data.error) {
      return res.status(400).json(data.error);
    }

    // Token de acesso foi recebido com sucesso
    const accessToken = data.access_token;

    // Agora você pode usar esse token para fazer chamadas à API do Facebook ou armazená-lo para automação

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
};
