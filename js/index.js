const form = document.getElementById('github-form')
const formText = document.getElementById('search')

form.addEventListener('submit', (event) => {
   event.preventDefault()
   const username = formText.value
    fetchUser(username)
})

function fetchUser(user){
    fetch(`https://api.github.com/search/users?q=${user}`)
.then(resp => resp.json())
.then(data => {
    const profile = data.items
    renderToPage(profile)
})
}

function createLi(object){
    console.log(object)
    const ul = document.getElementById('user-list')
    const h1 = document.createElement('h1')
    const img = document.createElement('img')
    ul.appendChild(h1)
    ul.appendChild(img)
    h1.textContent = object.login
    img.src = object.avatar_url
    h1.addEventListener('click', () => {
        fetchRepo(object.login)
    })

    }

function renderToPage(data){
    console.log(data)
    data.forEach(user => {
        createLi(user)
    })/*{
      for (let key in el){
        const obj = key + ":" + " " + el[key]
        createLi(obj)
      }
    }*/
}
function liRepo(object){
    console.log(object)
    const ul = document.getElementById('repos-list')
    const li = document.createElement('li')
    ul.appendChild(li)
    li.textContent = object.url

}
function fetchRepo(user){
    fetch(`https://api.github.com/users/${user}/repos`)
.then(resp => resp.json())
.then(data => {
    data.forEach(repo => {
        liRepo(repo)
    })
})
}