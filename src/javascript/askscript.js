document.addEventListener("DOMContentLoaded", () => {
  const steps = Array.from(document.querySelectorAll(".ask-form-step"));
  const continueButtons = document.querySelectorAll(".ask-continue-button");
  const backButton = document.querySelector(".ask-back-button");
  const progressBarSteps = document.querySelectorAll(
    ".ask-progress-bar .ask-step"
  );

  let currentStep = 0;
  let user = {};

  function showStep(index, isNext) {
    const currentFormStep = steps[currentStep];
    const nextFormStep = steps[index];

    currentFormStep.style.opacity = "0";
    currentFormStep.style.transform = isNext
      ? "translateX(-100%)"
      : "translateX(100%)";
    backButton.style.opacity = "0";
    backButton.style.transform = "translateY(20px)";

    setTimeout(() => {
      currentFormStep.classList.remove("active");
      progressBarSteps[currentStep].classList.remove("active");

      nextFormStep.classList.add("active");
      nextFormStep.style.opacity = "1";
      nextFormStep.style.transform = "translateX(0)";
      progressBarSteps[index].classList.add("active");

      if (index > 0) {
        backButton.classList.add("active");
        setTimeout(() => {
          backButton.style.opacity = "1";
          backButton.style.transform = "translateY(0)";
        }, 100);
      } else {
        backButton.classList.remove("active");
      }

      currentStep = index;
    }, 500);
  }

  const nextButton = document.querySelectorAll(".ask-continue-button");

  nextButton.forEach((button) => {
    button.addEventListener("click", () => {
      nextStetp();
    });
  });

  function nextStetp() {
    const currentStepElement = steps[currentStep];
    console.log("currentStepElement", currentStepElement);
  
    switch (currentStep) {
      case 0:
        user.signupName =
          currentStepElement.querySelector("input#singupname").value;
        break;
      case 1:
        user.meta = currentStepElement.querySelector(
          'input[placeholder="Digite sua meta"]'
        ).value;
        break;
      case 2:
        user.weight = currentStepElement.querySelector(
          'input[placeholder="Insira seu peso"]'
        ).value;
        user.height = currentStepElement.querySelector(
          'input[placeholder="Insira sua altura"]'
        ).value;
        break;
      case 3:
        user.trainingDays = currentStepElement.querySelector(
          'input[placeholder="De 1 a 7 dias"]'
        ).value;
        break;
      case 4:
        user.disease = currentStepElement.querySelector(
          "input#disease-input"
        ).value;
        break;
      case 5:
        user.specialCondition = currentStepElement.querySelector(
          "input#special-condition-input"
        ).value;
        break;
      case 6:
        user.phoneNumber =
          currentStepElement.querySelector('input[type="tel"]').value;
        break;
      case 7:
        user.birthDate =
          currentStepElement.querySelector('input[type="date"]').value;
        break;
      case 8:
        user.gender = Array.from(
          currentStepElement.querySelectorAll(".ask-option-button.selected")
        )
          .map((btn) => btn.textContent)
          .join(", ");
        break;
      case 9:
        user.experience = Array.from(
          currentStepElement.querySelectorAll(".ask-option-button.selected")
        )
          .map((btn) => btn.textContent)
          .join(", ");
        break;
      case 10:
        const fileInput = currentStepElement.querySelector(
          "input#ask-profile-image"
        );
        if (fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const imageUrl = e.target.result;
            user.profileImage = imageUrl;
            const profileAvatar = document.getElementById("profile-avatar");
            if (profileAvatar) {
              profileAvatar.src = imageUrl;
            }
          };
          reader.readAsDataURL(file);
        } else {
          user.profileImage = responses.profileImage || "";
        }
        break;
      default:
        console.log("Passo desconhecido:", currentStep);
        break;
    }
  }
  

  function updateUser() {
    console.log("user:", user);
    fetch(`${URL_API}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP deu erro! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Informações atualizadas com sucesso!");
        window.location.href =
          "https://ifpi-picos.github.io/projeto-integrador-ugym/perf.html";
      })
      .catch((error) => {
        console.error("Erro ao atualizar informações:", error);
        alert("Erro ao atualizar informações!");
      });
  }

  continueButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1, true);
      } else {
        submitForm();
      }
    });
  });

  backButton.addEventListener("click", () => {
    if (currentStep > 0) {
      showStep(currentStep - 1, false);
    }
  });

  const optionButtons = document.querySelectorAll(".ask-option-button");
  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      optionButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
});

function proxpage() {
  window.location.href =
    "https://ifpi-picos.github.io/projeto-integrador-ugym/perf.html";
}

function showInput() {
  const input = document.getElementById("disease-input");
  input.style.display = "block";
}

function hideInput() {
  const input = document.getElementById("disease-input");
  input.style.display = "none";
}

function handleOptionChange(option, inputId) {
  const inputElement = document.getElementById(inputId);
  if (option === "Sim") {
    inputElement.style.display = "block";
  } else {
    inputElement.style.display = "none";
  }
}
