export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {
    const apiKey = process.env.CREBOTS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'CREBOTS_API_KEY não configurada na Vercel'
      });
    }

    const response = await fetch(
      'https://api.crebots.com/api/create_video',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': apiKey
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Crebots Video Error:', error);

    return res.status(500).json({
      error: 'Erro ao conectar com a API da Crebots',
      message: error.message
    });
  }
}