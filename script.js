let imgDiv = document.querySelector('.image');
let userDescription = document.querySelector('.user-description');
let input = document.querySelector(".input-username");
let userDetails = document.querySelector(".user-details");
let count = 0;


function handleInput(event) {
    
    if(event.keyCode === 13) {
        
        if (event.target.value.trim() != "") {
          main(event.target.value);
          event.target.value = "";
        }
    }
}



function main(userName) {
    
    let xhrGithub = new XMLHttpRequest();
    xhrGithub.open("GET", `https://api.github.com/users/${userName}`);
    xhrGithub.onload = function() {
        createUI(JSON.parse(xhrGithub.response))
    }
    xhrGithub.send();
    function createUI(user) {
        imgDiv.innerHTML = "";
        userDescription.innerHTML = "";
        
        let image = document.createElement("IMG");
        image.src = user.avatar_url;
        image.classList.add("img");
        imgDiv.append(image);
        let name = document.createElement("p");
        name.innerText = `Name: ${user.name}`;
        
        let id = document.createElement("p");
        id.innerText = `ID: ${user.id}`;
        id.classList.add("user-id");
        userDescription.append(name, id);
        userDetails.style.display = "flex";
    }
}
// main("abhigoswami12")

input.addEventListener("keyup", handleInput);

