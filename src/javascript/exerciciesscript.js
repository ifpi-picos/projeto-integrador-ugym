const exercises = {
    arm: [
        { name: "3 x 12 Rosca Direta", gif: "path/to/arm_curl.gif", series: 3 },
        { name: "3 x 10 Rosca Alternada", gif: "path/to/alternate_curl.gif", series: 3 },
        { name: "3 x 8 Rosca Scott", gif: "path/to/scott_curl.gif", series: 3 },
        { name: "3 x 12 Rosca Polia", gif: "path/to/cable_curl.gif", series: 3 }
    ],
    chest: [
        { name: "3 x 12 Supino Reto", gif: "path/to/bench_press.gif", series: 3 },
        { name: "3 x 10 Supino Inclinado", gif: "path/to/incline_press.gif", series: 3 },
        { name: "3 x 8 Crucifixo", gif: "path/to/fly.gif", series: 3 },
        { name: "3 x 12 Flexões", gif: "path/to/pushup.gif", series: 3 }
    ],
    back: [
        { name: "3 x 12 Puxada Frontal", gif: "path/to/lat_pulldown.gif", series: 3 },
        { name: "3 x 10 Remada Curvada", gif: "path/to/barbell_row.gif", series: 3 },
        { name: "3 x 8 Remada Unilateral", gif: "path/to/one_arm_row.gif", series: 3 },
        { name: "3 x 12 Levantamento Terra", gif: "path/to/deadlift.gif", series: 3 }
    ],
    legs: [
        { name: "3 x 12 Agachamento", gif: "path/to/squat.gif", series: 3 },
        { name: "3 x 10 Leg Press", gif: "path/to/leg_press.gif", series: 3 },
        { name: "3 x 8 Afundo", gif: "path/to/lunge.gif", series: 3 },
        { name: "3 x 12 Stiff", gif: "path/to/stiff_deadlift.gif", series: 3 }
    ],
    shoulder: [
        { name: "3 x 12 Elevação Lateral", gif: "path/to/lateral_raise.gif", series: 3 },
        { name: "3 x 10 Desenvolvimento Militar", gif: "path/to/military_press.gif", series: 3 },
        { name: "3 x 8 Elevação Frontal", gif: "path/to/front_raise.gif", series: 3 },
        { name: "3 x 12 Crucifixo Invertido", gif: "path/to/reverse_fly.gif", series: 3 }
    ]
};

let currentMuscle = null;

function showExercises(muscle) {
    const exerciseSection = document.getElementById('exerciseSection');
    const exerciseButtons = document.getElementById('exerciseButtons');

    // Se um grupo muscular já está aberto e o mesmo é clicado novamente, fecha o painel
    if (currentMuscle === muscle) {
        exerciseSection.classList.remove('show');
        currentMuscle = null;
        return;
    }

    // Se outro grupo muscular estava aberto, fecha a gaveta
    if (currentMuscle !== null) {
        exerciseSection.classList.remove('show');
        setTimeout(() => updateExercises(muscle), 500); // Aguarda a animação fechar antes de mudar os exercícios
    } else {
        updateExercises(muscle); // Atualiza diretamente se não houver outro grupo muscular aberto
    }

    currentMuscle = muscle;
}

function updateExercises(muscle) {
    const exerciseSection = document.getElementById('exerciseSection');
    const exerciseButtons = document.getElementById('exerciseButtons');

    // Limpa os botões de exercícios anteriores
    exerciseButtons.innerHTML = "";

    // Exibe os exercícios para o grupo muscular selecionado
    exercises[muscle].forEach((exercise, index) => {
        const button = document.createElement('div');
        button.className = 'exercise-button';
        button.textContent = exercise.name;

        const gifContainer = document.createElement('div');
        gifContainer.className = 'exercise-gif';
        gifContainer.innerHTML = `<img src="${exercise.gif}" alt="GIF do exercício">`;

        // Adiciona o botão e o gif logo abaixo
        button.onclick = () => {
            gifContainer.classList.toggle('show'); // Alterna a exibição da animação
        };

        exerciseButtons.appendChild(button);
        exerciseButtons.appendChild(gifContainer);
    });

    // Exibe a seção de exercícios após a atualização
    exerciseSection.classList.add('show');
}
