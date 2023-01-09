const logoutBtn = document.querySelector("[logout] button");
if(logoutBtn){
    logoutBtn.onclick = ()=>{
        sessionStorage.removeItem("playerID");
        localStorage.removeItem("Xscore");
        localStorage.removeItem("Oscore");

        credentiels.removeChild(document.querySelector('[player]'));
        credentiels.removeChild(document.querySelector('[logout]'));
        credentiels.innerHTML = `<div guest><a class="loginBtn" href="Views/login.html" target="_self" rel="noopener noreferrer">Login</a><a class="regesterBtn" href="Views/regester.html" target="_self" rel="noopener noreferrer">Regester</a></div>`;
        fetch('http://localhost/TicTacToe/server/Controllers/logout.php').then(resp => resp.json()).then(session => {
            if (session.isdestroyed) {
                window.location.reload();
            }else{
                alert("⚠️ ERROR: when login-out please try again.");
                window.location.reload();
            }
        });
    }
}