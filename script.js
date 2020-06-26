let imgDiv = document.querySelector('.image');
let userDescription = document.querySelector('.user-description');
let input = document.querySelector(".input-username");
let userDetails = document.querySelector(".user-details");
let reposDiv = document.querySelector(".repos");
let ul = document.createElement("ul");


function handleInput(event) {
    
    if(event.keyCode === 13) {
        
        if (event.target.value.trim() != "") {
          main(event.target.value);
          event.target.value = "";
        }
    }
}


// document.addEventListener('DOMContentLoaded', (event) => {
//     //the event occurred
//     main();
// })

function main(userName) {
    localStorage.setItem("name", JSON.stringify(userName));
    let xhrGithub = new XMLHttpRequest();
    xhrGithub.open("GET", `https://api.github.com/users/${userName}`);
    xhrGithub.onload = function() {
        createUI(JSON.parse(xhrGithub.response))
    }
    xhrGithub.send();

    function createUI(user) {
        imgDiv.innerHTML = "";
        userDescription.innerHTML = "";
        reposDiv.innerHTML = "";
        let imageAnchor = document.createElement("a");
        imageAnchor.href = user.html_url;
        imageAnchor.target = "_blank";
        let image = document.createElement("IMG");
        image.src = user.avatar_url;
        image.classList.add("img");
        imgDiv.append(imageAnchor);
        imageAnchor.append(image);
        let name = document.createElement("p");
        name.innerText = `Name: ${user.name}`;
        let idAnchor = document.createElement("a");
        idAnchor.href = user.html_url;
        idAnchor.target = "_blank";
        let id = document.createElement("p");
        id.innerText = `ID: ${user.id}`;
        idAnchor.classList.add("user-id");
        idAnchor.append(id);

        let followers = document.createElement("a");
        let following = document.createElement("a");
        followers.innerText = `Followers: ${user.followers}`;
        following.innerText = `Following: ${user.following}`;
        let reposList = document.createElement("a");
        reposList.target = "_blank";
        reposList.innerText = `Repos: ${user.public_repos}`;
        reposList.href = './page2.html'
        userDescription.append(name, idAnchor);
        reposDiv.append(followers, following, reposList);
        userDetails.style.display = "block";
    }
}
// main("abhigoswami12")

input.addEventListener("keyup", handleInput);

