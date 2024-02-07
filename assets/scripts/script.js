document.addEventListener('DOMContentLoaded', function () {
    loadEmojis('🐶');
});

const emojisMapping = {
    '5️⃣': ['1️⃣', '1️⃣', '2️⃣', '2️⃣', '3️⃣', '3️⃣', '4️⃣', '4️⃣', '5️⃣', '5️⃣', '6️⃣', '6️⃣', '7️⃣', '7️⃣', '8️⃣', '8️⃣'],
    '😀': ['😍', '😍', '😁', '😁', '😇', '😇', '🤣', '🤣', '🤯', '🤯', '🤪', '🤪', '🥶', '🥶', '🥳', '🥳'],
    '🐶': ['🐶', '🐶', '🐱', '🐱', '🦊', '🦊', '🦁', '🦁', '🦄', '🦄', '🐉', '🐉', '🦆', '🦆', '🦚', '🦚'],
    '🍕': ['🍔', '🍔', '🍕', '🍕', '🍟', '🍟', '🌭', '🌭', '🍿', '🍿', '🥪', '🥪', '🍖', '🍖', '🍫', '🍫'],
    '🔴': ['🔴', '🔴', '🔵', '🔵', '🟢', '🟢', '🟡', '🟡', '🟣', '🟣', '🟠', '🟠', '🟤', '🟤', '⚫', '⚫']
};

let openCards = [];
const gameContainer = document.querySelector('.game');
const emojiForm = document.getElementById('emojiForm');

emojiForm.addEventListener('change', function (event) {
    clearGameContainer();
    const selectedEmoji = document.querySelector('input[name="emojis"]:checked').value;
    loadEmojis(selectedEmoji);
});

function clearGameContainer() {
    gameContainer.innerHTML = '';
}

function loadEmojis(emoji) {
    const emojis = emojisMapping[emoji];
    const randomEmojis = emojis.sort(() => Math.random() - 0.5);
    
    randomEmojis.forEach(emoji => {
        const box = document.createElement('div');
        box.className = 'itens';
        box.innerHTML = emoji;
        box.addEventListener('click', emojiClick);
        gameContainer.appendChild(box);
    });
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
        const [firstCard, secondCard] = openCards;

        if (firstCard.innerHTML === secondCard.innerHTML) {
            firstCard.classList.add('match');
            secondCard.classList.add('match');
        } else {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
        }

        openCards = [];

        const totalCards = document.querySelectorAll('.itens');
        const matchedCards = document.querySelectorAll('.match');

        if (totalCards.length === matchedCards.length) {
            alert('Parabéns, você ganhou!');
            window.location.reload();
        }
    }
}
