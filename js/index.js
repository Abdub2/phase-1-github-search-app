let repoList=document.getElementById("repos-list")
let userList=document.getElementById("user-list")
let searchByName=document.getElementById("search")
let form=document.getElementById("github-form")

document.addEventListener('DOMContentLoaded', () => {
    console.log("The DOM has loaded")
    form.addEventListener('submit',displayResults)


function displayResults(e){
    e.preventDefault();

    repoList.innerHTML=""
    userList.innerHTML=""

    fetch(`https://api.github.com/search/users?q=${searchByName.value}`)
    .then(res => res.json())
    .then(data =>{
        if(data.total_count===0){
            alert(`We have found no such user: ${searchByName.value}, Please try again`)
        }
        (data.items).forEach(user => {
            let userLi = document.createElement('li')
            userLi.classList.add('userName')
            let repobtn = document.createElement('button');
            repobtn.innerText = `Repos`
            userLi.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" class="sizeImg"></img>
                <p><b>link to page:</b> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
            `
            userLi.appendChild(repobtn)

            //displays users repos after button repobtn is clicked
            function displayRepos(){
            repoList.innerHTML=''
            fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(response => response.json())
            .then(repoData => {
            repoData.forEach(repo => {
            let repoEl = document.createElement('li')

            repoEl.innerHTML = `
                <h3>Repository Name: ${repo.name}</h3>
                <p>Repository details: ${repo.description}</p>
                <p>Click to open Repository<a href=${repo.html_url}>${repo.html_url}</a></p>`

                repoList.append(repoEl)
            })
        })
    }
        repobtn.addEventListener('click', displayRepos)
        userList.appendChild(userLi)
       })
    })
        //Alerts us for errors
        .catch(error =>{
        alert(error.message)
        })
}

})

