const imagens = Array.from(document.querySelectorAll('.item'));
const lixeiras = document.querySelectorAll('.lixeira');
const scoreSpan = document.getElementById('score');

let imagensRodada = embaralhar([...imagens]); // Embaralha todas as 15 imagens sem repetir
let score = 0;
let rodada = 0;

// Oculta todas as imagens no início
imagens.forEach(img => img.style.display = 'none');

// Mostra a primeira imagem
mostrarProximaImagem();

// Adiciona event listeners nas lixeiras
lixeiras.forEach(lixeira => {
  lixeira.addEventListener('click', () => {
    const imagemAtual = imagensRodada[rodada];
    const tipoImagem = imagemAtual.dataset.tipo;
    const tipoLixeira = lixeira.dataset.tipo;

    // Verifica se o tipo da imagem coincide com o tipo da lixeira
    if (tipoImagem === tipoLixeira) {
      score += 10; // Aumenta a pontuação
      alert(`✅ Acertou! Pontuação: ${score}`);
    } else {
      score -= 10; // Diminui a pontuação
      alert(`❌ Errou! Pontuação: ${score}`);
    }

    // Oculta a imagem após o clique na lixeira
    imagemAtual.style.display = 'none';
    rodada++;

    // Mostra a próxima imagem ou finaliza o jogo
    if (rodada < imagensRodada.length) {
      mostrarProximaImagem();
    } else {
      finalizarJogo();
    }
  });
});

// Função para mostrar a próxima imagem
function mostrarProximaImagem() {
  const proximaImagem = imagensRodada[rodada];
  proximaImagem.style.display = 'block'; // Torna a próxima imagem visível
}

// Função para embaralhar um array
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função ao final do jogo
function finalizarJogo() {
  alert(`🎉 Fim do jogo! Pontuação final: ${score}`);
  if (score >= 100) {
    window.location.href = "campeao.html"; // Redireciona para "campeao.html" caso o jogador vença
  }
}
