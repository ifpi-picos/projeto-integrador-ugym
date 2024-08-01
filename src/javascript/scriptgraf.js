
const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const altura = [1.80, 1.80, 1.80, 1.80, 1.80, 1.80];  // Altura constante
const peso = [82, 81, 79, 78, 77, 75];  // Peso em kg
const imc = [25.3, 25.0, 24.4, 24.1, 23.8, 23.1];  // IMC

const ctx = document.getElementById('evolutionChart').getContext('2d');
const evolutionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: meses,
        datasets: [
            {
                label: 'Altura (m)',
                data: altura,
                borderColor: 'blue',
                fill: false,
                yAxisID: 'y1'
            },
            {
                label: 'Peso (kg)',
                data: peso,
                borderColor: 'red',
                borderDash: [5, 5],
                fill: false,
                yAxisID: 'y2'
            },
            {
                label: 'IMC',
                data: imc,
                borderColor: 'green',
                borderDash: [5, 5],
                fill: false,
                yAxisID: 'y2'
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Altura (m)'
                }
            },
            y2: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Peso (kg) / IMC'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Evolução Física ao Longo de Seis Meses'
            }
        }
    }
});