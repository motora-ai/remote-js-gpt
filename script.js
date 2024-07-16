// Função para carregar o html2canvas dinamicamente (caso não esteja incluído no HTML)
function loadHtml2Canvas(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  // Função para capturar a tela e enviar a imagem
  function captureAndSendScreenshot(url) {
    html2canvas(document.body).then(canvas => {
      canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('screenshot', blob, 'screenshot.png');
        
        fetch(url, {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao enviar a captura de tela: ' + response.statusText);
          }
          return response.text();  // Alterado para response.text() para exibir o retorno completo no console
        })
        .then(data => {
          console.log('Resposta do servidor:', data);  // Exibe o retorno no console
        })
        .catch(error => {
          console.error('Erro:', error);
        });
      });
    });
  }
  
  // URL para onde enviar a captura de tela
  const uploadUrl = 'URL_DO_SEU_SERVIDOR';
  
  // Verifica se o html2canvas está carregado
  if (typeof html2canvas === 'undefined') {
    loadHtml2Canvas(() => captureAndSendScreenshot(uploadUrl));
  } else {
    captureAndSendScreenshot(uploadUrl);
  }
  