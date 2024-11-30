const emojis = [
  "⚽", "⚽",
  "🥅", "🥅",
  "🏟️", "🏟️",
  "🏆", "🏆",
  "🧤", "🧤",
  "👟", "👟",
  "🥇", "🥇",
  "🚶‍♂️", "🚶‍♂️"
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    
    const musicFim = new Audio("src/scripts/brasil_2.mp3");
    musicFim.play();
    bgMusic.volume = 0;
  }
  bgMusic.volume = 0.2;
}

const bgMusic = new Audio("src/scripts/futebol.wma");
const questFinishSound = new Audio("/src/sounds/quest_finish.wav");

bgMusic.loop = true;
bgMusic.volume = 0.2;

let musicPlaying = false;

// Quando o usuário clica na página pela primeira vez, a música começa a tocar
window.addEventListener(
  "click",
  function () {
    if (!musicPlaying) {
      bgMusic.play().catch(function (error) {
        console.log(
          "Autoplay bloqueado. O usuário precisa interagir com a página primeiro."
        );
      });
      musicPlaying = true;
      document.querySelector(".som").textContent = "🔊";
    }
  },
  { once: true }
);

// Função para alternar a música de fundo
function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    document.querySelector(".som").textContent = "🔇";
  } else {
    bgMusic.play().catch(function (error) {
      console.log(
        "Autoplay bloqueado. O usuário precisa interagir com a página primeiro."
      );
    });
    musicPlaying = true;
    document.querySelector(".som").textContent = "🔊";
  }
}

// Adiciona a lógica para o botão de som
document.querySelector(".som").addEventListener("click", toggleMusic);

// Exemplo de como tocar o som de missão quando a missão for concluída
function finishQuest() {
  questFinishSound.play().catch(function (error) {
    console.log("Erro ao tocar som da missão concluída.");
  });
}

// Chamando finishQuest para simular a conclusão da missão
// Isso pode ser chamado em qualquer lugar onde você queira tocar o som de missão.
finishQuest();
