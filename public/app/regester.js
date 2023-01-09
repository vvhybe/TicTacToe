const regester = document.querySelector("[regester]");
const regesterInputs = document.querySelectorAll("[regester] input");

const [firstname, lastname, username, password, confirmPassword] = regesterInputs;
const errorDisplay = document.querySelector("[error-display]");

regester.onsubmit = e=>{
    console.log("Form submited");
    e.preventDefault();
    if([...regesterInputs].some(field => !field.value)){
        [...regesterInputs].map(field => showErrors("none of those fields can be empty.", field));
    }else{
        regesterCheck(firstname.value, lastname.value, username.value, password.value);
    }
}

firstname.oninput = lastname.oninput = e=>{ checkName(e.target) };
username.oninput = e=>{ checkUsername(e.target) };
password.oninput = e=>{ checkPassword(e.target) };
confirmPassword.oninput = e=>{ checkCnofirmPassword(e.target) };

function checkName(input){
    if(!/[0-9]/.test(input.value) && input.value.length >= 2){
        input.classList.remove("unvalide");
        input.classList.add("valide");
    }else{
        showErrors("name shouldn't containe numbers and must be at least 2 characters.", input)
    }
}

function checkUsername(input){
    if(!/[A-Za-z][A-Za-z0-9_]{7,29}/.test(input.value) && input.value.length >= 4 && input.value.length <= 8){
        input.classList.remove("unvalide");
        input.classList.add("valide");
    }else{
        showErrors("username must start with alphabet then aplhanumrique and '_' allowed.", input)
    }
}

function checkPassword(input){
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input.value) && input.value.length >= 6 && input.value.length <= 15){
        input.classList.remove("unvalide");
        input.classList.add("valide");
    }else{
        showErrors("password doesn't meet the rquirements 'A-Z|@.|0-9'.", input)
    }
}

function checkCnofirmPassword(input){
    if(input.value === password.value){
        input.classList.remove("unvalide");
        input.classList.add("valide");
    }else{
        showErrors("password doesn't match.", input)
    }
}

function showErrors(error, input){
    console.error(error);
    while(errorDisplay.firstChild){
        errorDisplay.firstChild.remove();
    }

    const errorElmnt = document.createElement('li');
    errorElmnt.textContent = toCapitalCase(error);
    errorDisplay.appendChild(errorElmnt);

    input.classList.remove("valide");
    input.classList.add("unvalide");
    
    errorDisplay.classList.add("errordisplay");
    setTimeout(()=>{
        errorDisplay.classList.remove("errordisplay");
    }, 3000);
}

function toCapitalCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function DBcheckUsername(username){
    fetch("../../server/Controllers/username.php",{
        method:"POST",
        headers: {'Content-Type':"application/json"},
        body: JSON.stringify({username: username})
    }).then(resp => resp.json()).then(console.log);
}

function regesterCheck(fn, ln, u, p){
    fetch('../../server/Controllers/regester.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `firstname=${toCapitalCase(fn)}&lastname=${toCapitalCase(ln)}&username=${u}&password=${p}`
        }
    ).then(resp => resp.json()).then(status =>{
        console.log("Regester:", status);
        if(!status.ok){
            showErrors(status.error, username);
        }else{
            window.open("../index.html", '_self').focus();
        }
    }).catch(console.error);
};
