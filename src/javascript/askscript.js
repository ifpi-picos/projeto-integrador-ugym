document.addEventListener('DOMContentLoaded', () => {
    const steps = Array.from(document.querySelectorAll('.ask-form-step'));
    const continueButtons = document.querySelectorAll('.ask-continue-button');
    const backButton = document.querySelector('.ask-back-button');
    const progressBarSteps = document.querySelectorAll('.ask-progress-bar .ask-step');
    
    let currentStep = 0;
    let responses = JSON.parse(localStorage.getItem('userResponses')) || {};

    function showStep(index, isNext) {
        const currentFormStep = steps[currentStep];
        const nextFormStep = steps[index];

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

            if (index > 0) {
                backButton.classList.add('active');
                setTimeout(() => {
                    backButton.style.opacity = '1';
                    backButton.style.transform = 'translateY(0)';
                }, 100);
            } else {
                backButton.classList.remove('active');
            }

            currentStep = index;
        }, 500);
    }

    function saveResponses() {
        const currentStepElement = steps[currentStep];
        
        if (currentStep === 0) { // Etapa 1: Nome
            const signupName = currentStepElement.querySelector('input#singupname').value;
            const signuplastname= currentStepElement.querySelector('input#singuplastname').value;
            responses.signupName = signupName;
            responses.signuplastname = signuplastname;
        } else if (currentStep === 1) { // Etapa 2: Meta
            const meta = Array.from(currentStepElement.querySelectorAll('.ask-option-button.selected')).map(btn => btn.textContent).join(', ');
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
                    // Atualize a visualização da imagem de perfil
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

    continueButtons.forEach(button => {
        button.addEventListener('click', () => {
            saveResponses();
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1, true);
            }
        });
    });

    backButton.addEventListener('click', () => {
        if (currentStep > 0) {
            showStep(currentStep - 1, false);
        }
    });

    const optionButtons = document.querySelectorAll(".ask-option-button");
    let selectedOption = null;

    optionButtons.forEach(button => {
        button.addEventListener("click", () => {
            optionButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedOption = button.textContent;
        });
    });
});



function proxpage() {
    window.location.href = "https://ifpi-picos.github.io/projeto-integrador-ugym/perf.html";
}

function showInput() {
    const input = document.getElementById('disease-input');
    input.style.display = 'block';
}

function hideInput() {
    const input = document.getElementById('disease-input');
    input.style.display = 'none';
}

function handleOptionChange(option, inputId) {
    const inputElement = document.getElementById(inputId);
    if (option === 'Sim') {
        inputElement.style.display = 'block';
    } else {
        inputElement.style.display = 'none';
    }
}
