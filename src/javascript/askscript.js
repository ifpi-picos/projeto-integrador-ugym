document.addEventListener('DOMContentLoaded', () => {
    const steps = Array.from(document.querySelectorAll('.ask-form-step'));
    const continueButtons = document.querySelectorAll('.ask-continue-button');
    const backButton = document.querySelector('.ask-back-button');
    const progressBarSteps = document.querySelectorAll('.ask-progress-bar .ask-step');
    
    let currentStep = 0;

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

    continueButtons.forEach(button => {
        button.addEventListener('click', () => {
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
    window.location.href = "https://ifpi-picos.github.io/projeto-integrador-ugym/index.html";
}

function showInput() {
    const input = document.getElementById('disease-input');
    input.style.display = 'block';
}

function hideInput() {
    const input = document.getElementById('disease-input');
    input.style.display = 'none';
}

function handleOptionChange(selectedOption) {
    hideInput();

    if (selectedOption === "Sim") {
        showInput();
    }
}
