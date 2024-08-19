document.addEventListener('DOMContentLoaded', () => {
    // Obtém todos os elementos dos passos do formulário e armazena em um array
    const steps = Array.from(document.querySelectorAll('.ask-form-step'));
    // Obtém todos os botões de continuação do formulário
    const continueButtons = document.querySelectorAll('.ask-continue-button');
    // Obtém o botão de voltar
    const backButton = document.querySelector('.ask-back-button');
    // Obtém todos os passos da barra de progresso
    const progressBarSteps = document.querySelectorAll('.ask-progress-bar .ask-step');
    
    let currentStep = 0; // Armazena o índice do passo atual
    // Obtém as respostas salvas do localStorage ou inicializa um objeto vazio
    let responses = JSON.parse(localStorage.getItem('userResponses')) || {};

    // Função para mostrar um passo específico do formulário
    function showStep(index, isNext) {
        const currentFormStep = steps[currentStep];
        const nextFormStep = steps[index];

        // Adiciona animação de transição entre passos
        currentFormStep.style.opacity = '0';
        currentFormStep.style.transform = isNext ? 'translateX(-100%)' : 'translateX(100%)';
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateY(20px)';

        setTimeout(() => {
            currentFormStep.classList.remove('active');
            progressBarSteps[currentStep].classList.remove('active');

            nextFormStep.classList.add('active');
            nextFormStep.style.opacity = '1';
            nextFormStep.style.transform = 'translateX(0)';
            progressBarSteps[index].classList.add('active');

            // Mostra o botão de voltar se não estiver no primeiro passo
            if (index > 0) {
                backButton.classList.add('active');
                setTimeout(() => {
                    backButton.style.opacity = '1';
                    backButton.style.transform = 'translateY(0)';
                }, 100);
            } else {
                backButton.classList.remove('active');
            }

            currentStep = index; // Atualiza o passo atual
        }, 500);
    }

    // Função para salvar as respostas do formulário
    function saveResponses() {
        const currentStepElement = steps[currentStep];
        
        // Salva as respostas com base no passo atual
        if (currentStep === 0) { // Etapa 1: Nome
            const signupName = currentStepElement.querySelector('input#singupname').value;
            responses.signupName = signupName;
        } else if (currentStep === 1) { // Etapa 2: Meta
            const meta = currentStepElement.querySelector('input[placeholder="Digite sua meta"]').value;
            responses.meta = meta;
        } else if (currentStep === 2) { // Etapa 3: Peso e Altura
            const weight = currentStepElement.querySelector('input[placeholder="Insira seu peso"]').value;
            const height = currentStepElement.querySelector('input[placeholder="Insira sua altura"]').value;
            responses.weight = weight;
            responses.height = height;
        } else if (currentStep === 3) { // Etapa 4: Dias de treino
            const trainingDays = currentStepElement.querySelector('input[placeholder="De 1 a 7 dias"]').value;
            responses.trainingDays = trainingDays;
        } else if (currentStep === 4) { // Etapa 5: Doença
            const disease = currentStepElement.querySelector('input#disease-input').value;
            responses.disease = disease;
        } else if (currentStep === 5) { // Etapa 6: Condição especial
            const specialCondition = currentStepElement.querySelector('input#special-condition-input').value;
            responses.specialCondition = specialCondition;
        } else if (currentStep === 6) { // Etapa 7: Número de celular
            const phoneNumber = currentStepElement.querySelector('input[type="tel"]').value;
            responses.phoneNumber = phoneNumber;
        } else if (currentStep === 7) { // Etapa 8: Data de nascimento
            const birthDate = currentStepElement.querySelector('input[type="date"]').value;
            responses.birthDate = birthDate;
        } else if (currentStep === 8) { // Etapa 9: Gênero
            const gender = Array.from(currentStepElement.querySelectorAll('.ask-option-button.selected')).map(btn => btn.textContent).join(', ');
            responses.gender = gender;
        } else if (currentStep === 9) { // Etapa 10: Experiência
            const experience = Array.from(currentStepElement.querySelectorAll('.ask-option-button.selected')).map(btn => btn.textContent).join(', ');
            responses.experience = experience;
        } else if (currentStep === 10) { // Etapa 11: Foto de perfil
            const fileInput = currentStepElement.querySelector('input#ask-profile-image');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    responses.profileImage = imageUrl;
                    localStorage.setItem('userResponses', JSON.stringify(responses));
                    // Atualiza a visualização da imagem de perfil
                    const profileAvatar = document.getElementById('profile-avatar');
                    if (profileAvatar) {
                        profileAvatar.src = imageUrl;
                    }
                };
                reader.readAsDataURL(file);
            } else {
                // Caso não haja arquivo selecionado, mantenha o valor antigo
                responses.profileImage = responses.profileImage || '';
                localStorage.setItem('userResponses', JSON.stringify(responses));
            }
        }

        // Salva as respostas no localStorage
        localStorage.setItem('userResponses', JSON.stringify(responses));
    }

    // Função para submeter o formulário
    function submitForm() {
        // Certifique-se de que todas as etapas foram concluídas e as respostas foram salvas
        saveResponses();

        // Envia os dados para o servidor
        fetch(`${URL_API}/users/me`, { // Atualize a URL conforme necessário
            method: "PUT", // Ou POST se estiver criando um novo usuário
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${yourAuthToken}` // Inclua o token de autenticação se necessário
            },
            body: JSON.stringify(responses)
        })
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            console.log(data); // Exibe os dados recebidos no console
            alert("Informações atualizadas com sucesso!"); // Exibe uma mensagem de sucesso
            window.location.href = "https://ifpi-picos.github.io/projeto-integrador-ugym/perf.html"; // Redireciona para a página de perfil
        })
        .catch(error => {
            console.error("Erro ao atualizar informações:", error); // Exibe o erro no console
            alert("Erro ao atualizar informações!"); // Exibe uma mensagem de erro
        });
    }

    // Adiciona eventos de clique aos botões de continuação
    continueButtons.forEach(button => {
        button.addEventListener('click', () => {
            saveResponses(); // Salva as respostas antes de mudar de etapa
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1, true); // Mostra o próximo passo
            } else {
                // Se for a última etapa, submete o formulário
                submitForm();
            }
        });
    });

    // Adiciona evento de clique ao botão de voltar
    backButton.addEventListener('click', () => {
        if (currentStep > 0) {
            showStep(currentStep - 1, false); // Mostra o passo anterior
        }
    });

    // Adiciona eventos de clique aos botões de opção
    const optionButtons = document.querySelectorAll(".ask-option-button");
    optionButtons.forEach(button => {
        button.addEventListener("click", () => {
            optionButtons.forEach(btn => btn.classList.remove("selected")); // Remove a seleção de todas as opções
            button.classList.add("selected"); // Adiciona a seleção ao botão clicado
        });
    });
});

// Função para levar o usuário para a próxima página, no caso a de perfil
function proxpage() {
    window.location.href = "https://ifpi-picos.github.io/projeto-integrador-ugym/perf.html";
}

// Função para mostrar o input de doença
function showInput() {
    const input = document.getElementById('disease-input');
    input.style.display = 'block'; // Torna o input visível
}

// Função para ocultar o input de doença
function hideInput() {
    const input = document.getElementById('disease-input');
    input.style.display = 'none'; // Torna o input invisível
}

// Função para manipular a mudança de opções e exibir ou ocultar inputs
function handleOptionChange(option, inputId) {
    const inputElement = document.getElementById(inputId);
    if (option === 'Sim') {
        inputElement.style.display = 'block'; // Torna o input visível se a opção for 'Sim'
    } else {
        inputElement.style.display = 'none'; // Torna o input invisível se a opção não for 'Sim'
    }
}
