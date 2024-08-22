document.addEventListener('DOMContentLoaded', () => {
    const URL_API =
        location.hostname === "localhost" || location.hostname === "127.0.0.1"
            ? "http://localhost:3000"
            : "https://ugym-backend.onrender.com";

    // Função para obter as informações do usuário
    function getUserInfo() {
        fetch(`${URL_API}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then((user) => {
            document.querySelectorAll('#profile-name').forEach(element => {
                element.textContent = user.username || 'Não informado';
            });
            document.querySelectorAll('#profile-avatar').forEach(element => {
                element.src = user.profileImage || 'src/assets/avatar.jpg';
            });
            document.getElementById('profile-weight').textContent = user.weight || 'Não informado';
            document.getElementById('profile-height').textContent = user.height || 'Não informado';
            document.getElementById('profile-imc').textContent = calculateIMC(user.weight, user.height) || 'Não informado';
            document.getElementById('profile-meta').textContent = user.meta || 'Não informado';
            document.getElementById('profile-disease').textContent = user.disease || 'Não informado';
            document.getElementById('profile-special-condition').textContent = user.specialCondition || 'Não informado';
            document.getElementById('profile-objective').textContent = user.objective || 'Não informado';
        })
        .catch((error) => {
            console.error("Erro ao obter informações do usuário:", error);
        });
    }

    // Função para calcular o IMC
    function calculateIMC(weight, height) {
        if (!weight || !height) return "Não informado";
        const imc = weight / (height / 100) ** 2;
        return imc.toFixed(2);
    }

    getUserInfo();
});
