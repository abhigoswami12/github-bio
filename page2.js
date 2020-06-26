let page2 = document.querySelector(".page2");
let ul = document.createElement("ul");





let imgDiv = document.querySelector('.image');
let userDescription = document.querySelector('.user-description');
let input = document.querySelector(".input-username");
let userDetails = document.querySelector(".user-details");
let reposDiv = document.querySelector(".repos");
// let ul = document.createElement("ul");


function handleInput(event) {

    if (event.keyCode === 13) {

        if (event.target.value.trim() != "") {
            main(event.target.value);
            event.target.value = "";
        }
    }
}

function main(userName) {

    let xhrGithub = new XMLHttpRequest();
    xhrGithub.open("GET", `https://api.github.com/users/${userName}`);
    xhrGithub.onload = function () {
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
        name.innerText = `${user.name}`;
        name.classList.add("name")
        let login = document.createElement("p");
        login.classList.add("login");
        login.innerText = `${user.login}`;

        let idAnchor = document.createElement("a");
        idAnchor.href = user.html_url;
        idAnchor.target = "_blank";
       
        idAnchor.classList.add("user-id");
        idAnchor.append(login);

        let followers = document.createElement("p");
        let following = document.createElement("p");
        followers.innerText = `Followers: ${user.followers}`;
        following.innerText = `Following: ${user.following}`;
        let reposList = document.createElement("p");
        reposList.target = "_blank";
        reposList.innerText = `Repos: ${user.public_repos}`;
        // reposList.href = '/page2.html'
        userDescription.append(name, idAnchor);
        reposDiv.append(followers, following, reposList);
        // userDetails.style.display = "block";
    }





    
        // reposList.addEventListener('click', (event) => {
        let userRepos = new XMLHttpRequest();
        userRepos.open("GET", `https://api.github.com/users/${userName}/repos`);
        userRepos.onload = function () {
            createReposUI(JSON.parse(userRepos.response))
            // console.log(userRepos.response);
        }
        userRepos.send();
        function createReposUI(repos) {
            // console.log(userRepos.response);
            repos.forEach(repo => {
                // console.log(repo.html_url);
                let li = document.createElement("li");
                let liAnchor = document.createElement("a");
                liAnchor.href = repo.html_url;
                liAnchor.target = "_blank";
                liAnchor.innerHTML = repo.name;
                let language = document.createElement("p");
                if (repo.language === null) {
                    language.innerText = "";
                } else {
                    language.innerText = `Language:${repo.language}`;

                }
                let repoDescription = document.createElement("p");
                repoDescription.innerText = `Created on: ${repo.created_at.split("T")[0].split("-").reverse().join("-")}`;
                li.append(liAnchor, repoDescription, language);
                ul.append(li);
            })
            page2.append(ul);
        }
        // })
        // reposA.href = user.repos_url;
        // reposA.target = "_blank";
        // reposList.innerText = `Repos: ${user.public_repos}`;
        userDescription.append(name,);
        reposDiv.append(followers, following, reposList);
        userDetails.style.display = "block";
        localStorage.clear();
    
}
main(JSON.parse(localStorage.getItem("name")));
// input.addEventListener("keyup", handleInput);
