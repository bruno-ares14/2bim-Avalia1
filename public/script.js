// Esta é a função que declarámos no HTML (data-callback). O Google chama-a automaticamente após o login.
window.handleCredentialResponse = async (response) => {
  const token = response.credential;
  const numeroInput = document.getElementById('numero').value;
  const mensagemEl = document.getElementById('mensagem');
  const desenhoEl = document.getElementById('desenho');
  const baixarBtn = document.getElementById('baixar');

  // Limpa a tela para o novo processamento
  mensagemEl.textContent = 'A processar o seu desenho...';
  desenhoEl.innerHTML = '';
  baixarBtn.hidden = true;

  // Validação básica do lado do cliente
  const numero = parseInt(numeroInput, 10);
  if (isNaN(numero) || numero < 1 || numero > 100) {
    mensagemEl.textContent = 'Por favor, insira um número válido entre 1 e 100.';
    return;
  }

  try {
    // Comunicação com a nossa API no Cloudflare
    const res = await fetch('/api/desenho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ numero: numero })
    });

    // Tratamento rigoroso das respostas (exigência da Tarefa 8)
    if (res.status === 200) {
      const svgText = await res.text();
      desenhoEl.innerHTML = svgText;
      mensagemEl.textContent = 'Desenho gerado com sucesso e assinado com o seu e-mail!';
      
      // Configura o botão para facilitar a recolha da evidência (Tarefa 9)
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      baixarBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exemplo.svg';
        a.click();
      };
      baixarBtn.hidden = false;

    } else if (res.status === 400 || res.status === 401) {
      const erroTexto = await res.text();
      mensagemEl.textContent = `Erro ${res.status}: ${erroTexto}`;
    } else {
      mensagemEl.textContent = `Erro inesperado: ${res.status}`;
    }
  } catch (error) {
    mensagemEl.textContent = 'Erro de rede ou servidor indisponível.';
  }
};

// Previne o envio padrão do formulário se o utilizador pressionar "Enter"
document.getElementById('formulario').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('mensagem').textContent = 'Por favor, clique no botão do Google para autenticar e gerar o desenho.';
});
