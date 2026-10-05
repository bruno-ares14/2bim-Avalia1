import { gerarDesenho } from '../../lib/desenho.js';

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Método não permitido', { status: 405 });
  }

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response('JSON inválido ou ausente', { status: 400 });
  }

  const numero = body.numero;
  if (numero === undefined || !Number.isInteger(numero) || numero < 1 || numero > 100) {
    return new Response('Número ausente, não inteiro ou fora do intervalo', { status: 400 });
  }

  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Token ausente ou com formato incorreto', { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');

  const tokenResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
  if (!tokenResponse.ok) {
    return new Response('Token inválido ou expirado', { status: 401 });
  }
  
  const tokenInfo = await tokenResponse.json();

  if (tokenInfo.aud !== context.env.GOOGLE_CLIENT_ID) {
    return new Response('Token com aud diferente do Client ID', { status: 401 });
  }
  
  if (tokenInfo.email_verified !== "true" && tokenInfo.email_verified !== true) {
    return new Response('E-mail não verificado', { status: 401 });
  }

  const email = tokenInfo.email;
  const svg = gerarDesenho(numero, email);

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
}
