function scoreDelevery(Xscore, Oscore){
    fetch('../server/Controllers/score.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Xscore: Xscore, Oscore: Oscore})
        }
    ).then(resp => resp.text()).then(console.log);
};