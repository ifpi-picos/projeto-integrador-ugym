const URL_API = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 
"http://localhost:3000" : "https://ugym-backend.onrender.com";

function getUsers() {
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
        return `<li>${user.name}</li>`;
    }).join('');
    document.getElementById('users').innerHTML = users;
    
    // Adiciona a classe para mostrar a lista com animação
    document.getElementById('users').classList.add('show');
})
.catch(error => console.error('Erro ao buscar usuários:', error));
}

function hideUsers() {
// Remove a classe para esconder a lista com animação
document.getElementById('users').classList.remove('show');
}

document.getElementById('loadUsersBtn').addEventListener('click', () => {
document.getElementById('users').classList.remove('show'); // Remover a classe de exibição antes de carregar novos dados
getUsers();
});

document.getElementById('hideUsersBtn').addEventListener('click', hideUsers);
