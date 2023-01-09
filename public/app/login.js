const login = document.querySelector("[login]");

const username = document.getElementById("username");
const password = document.getElementById("password");

const errorDisplay = document.querySelector("[error-display]");

login.onsubmit = e=>{
    console.log("Form submited");
    e.preventDefault();
    if(!username.value || !password.value){
        showErrors("password or username can't be empty.");
    }else{
        loginCheck(username.value, password.value);
    }
}

username.oninput = e =>{
    username.classList.remove("unvalide");
}

password.oninput = e =>{
    password.classList.remove("unvalide");
}

function showErrors(error){
    console.error(error);

    const errorElmnt = document.createElement('li');
    errorElmnt.textContent = toCapitalCase(error);
    errorDisplay.appendChild(errorElmnt);
    
    username.classList.add("unvalide");
    password.classList.add("unvalide");
    errorDisplay.classList.add("errordisplay");

    setTimeout(()=>{
        errorDisplay.innerHTML = "";
        errorDisplay.classList.remove("errordisplay");
    }, 3000);
}

function toCapitalCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loginCheck(username, password){
    fetch('../../server/Controllers/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `username=${username}&password=${password}`
        }
    ).then(resp => resp.json()).then(status =>{
        if(!status.ok || status.error){
            showErrors(status.error);
        }else{
            window.open("../index.html", '_self');
        }
    });
};

