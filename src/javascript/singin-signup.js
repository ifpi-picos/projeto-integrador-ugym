const URL_API = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 
"http://localhost:3000" : "https://ugym-backend.onrender.com"


if(localStorage.getItem("token")){
  window.location.href = "home.html";
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

  fetch(`${URL_API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(json => {
      const token = json.token;
      console.log(json)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(json.user));
      alert("Usuário cadastrado com sucesso!")

      window.location.href = "ask.html";
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
      const token = json.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(json.user));
      alert("Login successful!");

      window.location.href = "index.html";
    })
    .catch(error => {
      console.log(error);
      alert("Login failed!");
    });
}


