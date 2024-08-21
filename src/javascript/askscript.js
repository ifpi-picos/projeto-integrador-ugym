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

        // Ajuste para pegar os valores corretamente
        if (currentStep === 0) {
            responses.signupName = currentStepElement.querySelector('input#singupname').value;
        } else if (currentStep === 1) {
            responses.meta = currentStepElement.querySelector('input[placeholder="Digite sua meta"]').value;
        } else if (currentStep === 2) {
            responses.weight = currentStepElement.querySelector('input[placeholder="Insira seu peso"]').value;
            responses.height = currentStepElement.querySelector('input[placeholder="Insira sua altura"]').value;
        } else if (currentStep === 3) {
            responses.trainingDays = currentStepElement.querySelector('input[placeholder="De 1 a 7 dias"]').value;
        } else if (currentStep === 4) {
            responses.disease = currentStepElement.querySelector('input#disease-input').value;
        } else if (currentStep === 5) {
            responses.specialCondition = currentStepElement.querySelector('input#special-condition-input').value;
        } else if (currentStep === 6) {
            responses.phoneNumber = currentStepElement.querySelector('input[type="tel"]').value;
        } else if (currentStep === 7) {
            responses.birthDate = currentStepElement.querySelector('input[type="date"]').value;
        } else if (currentStep === 8) {
            responses.gender = Array.from(currentStepElement.querySelectorAll('.ask-option-button.selected')).map(btn => btn.textContent).join(', ');
        } else if (currentStep === 9) {
            responses.experience = Array.from(currentStepElement.querySelectorAll('.ask-option-button.selected')).map(btn => btn.textContent).join(', ');
        } else if (currentStep === 10) {
            const fileInput = currentStepElement.querySelector('input#ask-profile-image');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    responses.profileImage = imageUrl;
                    localStorage.setItem('userResponses', JSON.stringify(responses));
                    const profileAvatar = document.getElementById('profile-avatar');
                    if (profileAvatar) {
                        profileAvatar.src = imageUrl;
                    }
                };
                reader.readAsDataURL(file);
            } else {
                responses.profileImage = responses.profileImage || '';
                localStorage.setItem('userResponses', JSON.stringify(responses));
            }
        }

        localStorage.setItem('userResponses', JSON.stringify(responses));
    }

    function submitForm() {
        saveResponses();

        fetch(`${URL_API}/users/me`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(responses)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP deu erro! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert("Informações atualizadas com sucesso!");
            window.location.href = "https://ifpi-picos.github.io/projeto-integrador-ugym/perf.html";
        })
        .catch(error => {
            console.error("Erro ao atualizar informações:", error);
            alert("Erro ao atualizar informações!");
        });
    }

    continueButtons.forEach(button => {
        button.addEventListener('click', () => {
            saveResponses();
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1, true);
            } else {
                submitForm();
            }
        });
    });

    backButton.addEventListener('click', () => {
        if (currentStep > 0) {
            showStep(currentStep - 1, false);
        }
    });

    const optionButtons = document.querySelectorAll(".ask-option-button");
    optionButtons.forEach(button => {
        button.addEventListener("click", () => {
            optionButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
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
