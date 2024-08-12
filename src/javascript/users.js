const URL_API = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 
"http://localhost:3000" : "https://ugym-backend.onrender.com"

function getUsers(){
    fetch(`${URL_API}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(data => {
        let users = data.map(user => {
            return `<li>${user.name}</li>`
        }).join('')
        document.getElementById('users').innerHTML = users
    })
}

getUsers()