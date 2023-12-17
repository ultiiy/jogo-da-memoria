document.addEventListener('DOMContentLoaded', function () {
    loadEmojis('🐶');
});

const emojisNumeros = ['1️⃣', '1️⃣', '2️⃣', '2️⃣', '3️⃣', '3️⃣', '4️⃣', '4️⃣', '5️⃣', '5️⃣', '6️⃣', '6️⃣', '7️⃣', '7️⃣', '8️⃣', '8️⃣'];
const emojisCaretas = ['😍', '😍', '😁', '😁', '😇', '😇', '🤣', '🤣', '🤯', '🤯', '🤪', '🤪', '🥶', '🥶', '🥳', '🥳'];
const emojisAnimais = ['🐶', '🐶', '🐱', '🐱', '🦊', '🦊', '🦁', '🦁', '🦄', '🦄', '🐉', '🐉', '🦆', '🦆', '🦚', '🦚'];
const emojisComidas = ['🍔', '🍔', '🍕', '🍕', '🍟', '🍟', '🌭', '🌭', '🍿', '🍿', '🥪', '🥪', '🍖', '🍖', '🍫', '🍫'];
const emojisCores = ['🔴', '🔴', '🔵', '🔵', '🟢', '🟢', '🟡', '🟡', '🟣', '🟣', '🟠', '🟠', '🟤', '🟤', '⚫', '⚫'];

const emojisMapping = {
    '5️⃣': emojisNumeros,
    '😀': emojisCaretas,
    '🐶': emojisAnimais,
    '🍕': emojisComidas,
    '🔴': emojisCores
};

let openCards = [];
const gameContainer = document.querySelector('.game');

document.getElementById('emojiForm').addEventListener('change', function (event) {
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    var selectedEmoji = document.querySelector('input[name="emojis"]:checked').value;
    loadEmojis(selectedEmoji);
});

function loadEmojis(emoji) {
    const emojis = emojisMapping[emoji];
    let randomEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement('div');
        box.className = 'itens';
        box.innerHTML = randomEmojis[i];
        box.onclick = emojiClick;
        gameContainer.appendChild(box);
    }
}

function emojiClick() {
    if (openCards.length < 2) {
        this.classList.add('open');
        openCards.push(this);
        if (openCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
        } else {
            openCards[0].classList.remove('open');
            openCards[1].classList.remove('open');
        }
        openCards = [];

        if (document.querySelectorAll('.itens').length === document.querySelectorAll('.match').length) {
            alert('Parabéns, você ganhou!');
            window.location.reload();
        }
    }
}