hrefs = {
    MiniCrossword: 'https://www.nytimes.com/crosswords/game/mini',
    Wordle: 'https://www.nytimes.com/games/wordle',
    Connections: 'https://www.nytimes.com/games/connections',
    Strands: 'https://www.nytimes.com/games/strands',
    Foodguessr: 'https://www.foodguessr.com/',
    Timeguessr: 'https://timeguessr.com/',
    Costcodle: 'https://costcodle.com/',
    Bandle: 'https://bandle.app/',
    Housle: 'https://housle.house/',
    GuessTheGame: 'https://guessthe.game/',
    ChessDaily: 'https://www.chess.com/daily-chess-puzzle',
    SpellCheck: 'https://spellcheckgame.com/#google_vignette',
    Pokedoku: 'https://pokedoku.com/',
    Worldle: 'https://worldle.teuteuf.fr/',
    Travle: 'https://imois.in/games/travle/',
    Globle: 'https://globle-game.com/'
}

function RandomGenerator(numba) {
    rando = Math.floor(Math.random() * numba);
    return rando
}

const RandomDle = () => {
    console.log("random page went to!");

    hrefKeys = Object.keys(hrefs);
    rando = RandomGenerator(hrefKeys.length)
    //window.location.href = hrefs[hrefKeys[rando]];
    window.open(hrefs[hrefKeys[rando]], '_blank');
}


// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleProcrastinate") {
        RandomDle();
        sendResponse({ success: true }); // Send a response back to the popup
    }
});