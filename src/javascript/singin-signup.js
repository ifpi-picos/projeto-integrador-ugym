const URL_API = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 
"http://localhost:3000" : "https://ugym-backend.onrender.com"


if(localStorage.getItem("token")){
  window.location.href = "index.html";
} 

function cadastro(){
const emailInput = document.querySelector("#singupemail")
const passwordInput = document.querySelector("#singuppassword")
const nameInput = document.querySelector("#singupname")

  const user = {
    email: emailInput.value,
    password: passwordInput.value,
    name: nameInput.value
  }

  fetch(`${URL_API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      alert("Usuário cadastrado com sucesso!")
    })
    .catch(error => {
      console.log(error)
      alert("Erro ao cadastrar usuário!")
    })
}

function login() {
  const emailInput = document.querySelector("#signinemail");
  const passwordInput = document.querySelector("#signinpassword");

  const user = {
    email: emailInput.value,
    password: passwordInput.value
  };

  fetch(`${URL_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    // .then(data => {(jesiel mudou para json)
    .then(json => {
      console.log(json); 
      const token = json.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(json.data.user));
      alert("Login successful!");

      window.location.href = "index.html";
    })
    .catch(error => {
      console.log(error);
      alert("Login failed!");
    });
}
