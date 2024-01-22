document.addEventListener('DOMContentLoaded', () => {
    // Future JavaScript code will go here
    console.log("Homepage loaded");
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // In a real scenario, you would send this data to a server
        alert('Thank you for your message. Dr. Kern will be in touch soon.');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataSubmissionForm');
    dataForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // In a real scenario, you would handle the file upload on a server
        alert('Your data has been submitted. Thank you!');
    });
});


function calculateNormalCdf() {
    const mean = document.getElementById('mean').value;
    const stdDev = document.getElementById('stdDev').value;
    const xValue = document.getElementById('xValue').value;

    const result = normalCdf(xValue, mean, stdDev);
    document.getElementById('normalCdfResult').innerText = `Result: ${result}`;
}

// Normal CDF calculation using Z-score and error function
function normalCdf(value, mean, standardDeviation) {
    const zScore = (value - mean) / standardDeviation;
    return 0.5 * (1 + erf(zScore / Math.sqrt(2)));
}

// Error function approximation
function erf(x) {
    // constants
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    // Save the sign of x
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

// You can add additional functions or modify this one as needed

function toggleNormalCdfCalculator() {
    const calculator = document.getElementById('normalCdfCalculator');
    calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

// ... [existing JavaScript functions] ...
function toggleNormalCalculator() {
    const calculator = document.getElementById('normalCalculator');
    calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

function calculateNormal(type) {
    const mean = document.getElementById('normalMean').value;
    const stdDev = document.getElementById('normalStdDev').value;
    const xValue = document.getElementById('normalXValue').value;

    let result = 0;
    if (type === 'pdf') {
        result = normalPdf(xValue, mean, stdDev);
    } else if (type === 'cdf') {
        result = normalCdf(xValue, mean, stdDev);
    }

    document.getElementById('normalResult').innerText = `Result: ${result.toFixed(4)}`;
}

function normalPdf(x, mean, stdDev) {
    const sqrt2Pi = Math.sqrt(2 * Math.PI);
    const exponent = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
    return (1 / (stdDev * sqrt2Pi)) * exponent;
}

// ... [existing JavaScript functions, including normalCdf functions] ...

function toggleBinomialCalculator() {
    const calculator = document.getElementById('binomialCalculator');
    calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

function calculateBinomial(type) {
    const n = document.getElementById('trials').value;
    const p = document.getElementById('probability').value;
    const x = document.getElementById('successes').value;

    let result = 0;
    if (type === 'pdf') {
        result = binomialPdf(n, p, x);
    } else if (type === 'cdf') {
        for (let i = 0; i <= x; i++) {
            result += binomialPdf(n, p, i);
        }
    }

    document.getElementById('binomialResult').innerText = `Result: ${result.toFixed(4)}`;
}

function binomialPdf(n, p, x) {
    return combination(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

function combination(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(num) {
    if (num < 0) return -1;
    if (num === 0 || num === 1) return 1;
    let result = num;
    while (num > 1) {
        num--;
        result *= num;
    }
    return result;
}

// ... [existing JavaScript functions] ...

function toggleGeometricCalculator() {
    const calculator = document.getElementById('geometricCalculator');
    calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

function calculateGeometric(type) {
    const p = document.getElementById('geometricProbability').value;
    const x = document.getElementById('geometricX').value;

    let result = 0;
    if (type === 'pdf') {
        result = geometricPdf(p, x);
    } else if (type === 'cdf') {
        for (let i = 1; i <= x; i++) {
            result += geometricPdf(p, i);
        }
    }

    document.getElementById('geometricResult').innerText = `Result: ${result.toFixed(4)}`;
}

function geometricPdf(p, x) {
    return p * Math.pow(1 - p, x - 1);
}

// ... [existing JavaScript functions] ...

function toggleInverseNormalCalculator() {
    const calculator = document.getElementById('inverseNormalCalculator');
    calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

function calculateInverseNormal() {
    const area = parseFloat(document.getElementById('inverseArea').value);
    const mean = parseFloat(document.getElementById('inverseMean').value);
    const stdDev = parseFloat(document.getElementById('inverseStdDev').value);

    const xValue = inverseNormal(area, mean, stdDev);
    document.getElementById('inverseNormalResult').innerText = `Inverse Normal Result: ${xValue.toFixed(4)}`;
}

function inverseNormal(area, mean, stdDev) {
    // Basic implementation of the inverse normal function
    // For more accuracy, consider using a statistical library
    const z = Math.sqrt(2) * erfInv(2 * area - 1);
    return z * stdDev + mean;
}

function erfInv(x) {
    // Approximation of the inverse error function
    const a = 0.147; // This constant is part of the approximation
    const ln1MinusXSquared = Math.log(1 - x * x);
    const PI = Math.PI;

    const firstPart = Math.sqrt(Math.sqrt(Math.pow(2 / (PI * a) + ln1MinusXSquared / 2, 2) - ln1MinusXSquared / a) - (2 / (PI * a) + ln1MinusXSquared / 2));
    return x < 0 ? -firstPart : firstPart;
}

// ... existing functions ...

let normalDistChart;

document.addEventListener('DOMContentLoaded', function() {
    createNormalDistributionGraph();
});

function createNormalDistributionGraph() {
    const ctx = document.getElementById('normalDistCanvas').getContext('2d');
    normalDistChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Placeholder for x-axis labels (z-scores)
            datasets: [{
                label: 'Normal Distribution',
                data: [], // Placeholder for graph data
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    updateNormalDistributionGraph(); // Initial graph setup
}

function updateNormalDistributionGraph() {
    const mean = parseFloat(document.getElementById('meanInput').value);
    const stdDev = parseFloat(document.getElementById('stdDevInput').value);

    const labels = [];
    const data = [];
    for (let i = mean - 4 * stdDev; i <= mean + 4 * stdDev; i += stdDev / 10) {
        labels.push(i.toFixed(2));
        data.push(normalPdf(i, mean, stdDev));
    }

    normalDistChart.data.labels = labels;
    normalDistChart.data.datasets[0].data = data;
    normalDistChart.update();
}

function normalPdf(x, mean, stdDev) {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

