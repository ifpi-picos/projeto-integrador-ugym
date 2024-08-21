document.addEventListener('DOMContentLoaded', () => {
    // Recupera as respostas do localStorage
    const userResponses = JSON.parse(localStorage.getItem('userResponses'));
    console.log('User Responses:', userResponses); // Verifique o conteúdo

    if (userResponses) {
        // Exibe as respostas na página de perfil
        document.querySelectorAll('#profile-name').forEach(element => {
            element.textContent = userResponses.signupName || 'Não informado';
        });
        document.querySelectorAll('#profile-avatar').forEach(element => {
            element.src = userResponses.profileImage || 'src/assets/avatar.jpg';
        });
        document.getElementById('profile-weight').textContent = userResponses.weight || 'Não informado';
        document.getElementById('profile-height').textContent = userResponses.height || 'Não informado';
        const imc = calculateIMC(userResponses.weight, userResponses.height);
        document.getElementById('profile-imc').textContent = imc || 'Não informado';

        function calculateIMC(weight, height) {
        
            const weightInGrams = weight * 1000;
            const heightInMeters = height / 100;
            const imc = weightInGrams / (heightInMeters * heightInMeters);
            return imc.toFixed(2);
        }
        document.getElementById('profile-meta').textContent = userResponses.meta || 'Não informado';
        document.getElementById('profile-disease').textContent = userResponses.disease || 'Não';
        document.getElementById('profile-special-condition').textContent = userResponses.specialCondition || 'Não';
        document.getElementById('profile-objective').textContent = userResponses.objective || 'Não informado';

    }
});