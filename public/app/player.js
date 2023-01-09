const credentiels = document.querySelector("[credentiels]");
const username = document.querySelector("[username]");
const playerid = document.querySelector("[playerid]");

fetch("../server/Controllers/player.php").then(resp => resp.json()).then(data => {
    console.log(data);
    if(data.ok){
        console.log("player is DB regestred");
        playerID = data.player.playerId;
        sessionStorage.setItem("playerID", data.player.playerId);
        username.textContent = data.player.username;
        playerid.textContent = "#"+data.player.playerId;
        credentiels.removeChild(document.querySelector('[guest]'));
    }else{
        console.log("player is guest");
        credentiels.removeChild(document.querySelector('[player]'));
        credentiels.removeChild(document.querySelector('[logout]'));
    }
}).catch(console.error);
