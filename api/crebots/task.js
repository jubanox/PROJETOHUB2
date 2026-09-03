export default async function handler(req, res) {
  if (req.method !== 'GET') {
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

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        error: 'ID da tarefa não informado'
      });
    }

    const response = await fetch(
      `https://api.crebots.com/api/task/${encodeURIComponent(id)}`,
      {
        method: 'GET',
        headers: {
          'API-KEY': apiKey
        }
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Crebots Task Error:', error);

    return res.status(500).json({
      error: 'Erro ao consultar tarefa',
      message: error.message
    });
  }
}