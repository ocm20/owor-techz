// Sample data for the dashboard (in a real app, this would come from an API)
const sampleData = {
    aqiTrend: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 75, 82]
    },
    pollutants: {
        labels: ["PM2.5", "PM10", "NO2", "SO2", "CO", "O3"],
        values: [35, 28, 15, 10, 8, 4]
    },
    currentAqi: 72,
    primaryPollutant: "PM2.5",
    healthImplications: "Moderate - Unusually sensitive people should consider reducing prolonged or heavy exertion."
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    if (document.querySelector('.dashboard')) {
        initDashboard();
    } else if (document.querySelector('.current-status')) {
        initHomepage();
    } else if (document.querySelector('.login-section')) {
        initLogin();
    }
});

// Dashboard functionality
function initDashboard() {
    // AQI Trend Chart
    const trendCtx = document.getElementById('aqi-trend-chart').getContext('2d');
    const trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: sampleData.aqiTrend.labels,
            datasets: [{
                label: 'AQI',
                data: sampleData.aqiTrend.values,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'AQI Value'
                    }
                }
            }
        }
    });

    // Pollutant Breakdown Chart
    const pollutantCtx = document.getElementById('pollutant-chart').getContext('2d');
    const pollutantChart = new Chart(pollutantCtx, {
        type: 'doughnut',
        data: {
            labels: sampleData.pollutants.labels,
            datasets: [{
                data: sampleData.pollutants.values,
                backgroundColor: [
                    '#e74c3c',
                    '#3498db',
                    '#2ecc71',
                    '#f1c40f',
                    '#9b59b6',
                    '#1abc9c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Update current stats
    document.getElementById('current-aqi-value').textContent = sampleData.currentAqi;
    document.getElementById('primary-pollutant').textContent = sampleData.primaryPollutant;
    document.getElementById('health-implications').textContent = sampleData.healthImplications;

    // Add event listeners for filters
    document.getElementById('time-period').addEventListener('change', function() {
        // In a real app, this would fetch new data based on the selected time period
        console.log('Time period changed to:', this.value);
    });

    document.getElementById('location').addEventListener('change', function() {
        // In a real app, this would fetch new data based on the selected location
        console.log('Location changed to:', this.value);
    });
}

// Homepage functionality
function initHomepage() {
    // Simulate loading current AQI data
    setTimeout(() => {
        const aqiDisplay = document.getElementById('current-aqi');
        aqiDisplay.innerHTML = '';
        
        const aqiValue = sampleData.currentAqi;
        const aqiElement = document.createElement('div');
        aqiElement.className = 'aqi-value';
        aqiElement.textContent = aqiValue;
        
        // Color code based on AQI value
        if (aqiValue <= 50) {
            aqiElement.style.color = 'var(--good-aqi)';
        } else if (aqiValue <= 100) {
            aqiElement.style.color = 'var(--moderate-aqi)';
        } else if (aqiValue <= 150) {
            aqiElement.style.color = 'var(--unhealthy-sensitive-aqi)';
        } else if (aqiValue <= 200) {
            aqiElement.style.color = 'var(--unhealthy-aqi)';
        } else if (aqiValue <= 300) {
            aqiElement.style.color = 'var(--very-unhealthy-aqi)';
        } else {
            aqiElement.style.color = 'var(--hazardous-aqi)';
        }
        
        aqiDisplay.appendChild(aqiElement);
        
        const aqiDescription = document.createElement('div');
        aqiDescription.className = 'aqi-description';
        
        if (aqiValue <= 50) {
            aqiDescription.textContent = 'Good - Air quality is satisfactory.';
        } else if (aqiValue <= 100) {
            aqiDescription.textContent = 'Moderate - Air quality is acceptable.';
        } else if (aqiValue <= 150) {
            aqiDescription.textContent = 'Unhealthy for Sensitive Groups - Some pollutants may affect people unusually sensitive to air pollution.';
        } else if (aqiValue <= 200) {
            aqiDescription.textContent = 'Unhealthy - Everyone may begin to experience health effects.';
        } else if (aqiValue <= 300) {
            aqiDescription.textContent = 'Very Unhealthy - Health warnings of emergency conditions.';
        } else {
            aqiDescription.textContent = 'Hazardous - Health alert: everyone may experience more serious health effects.';
        }
        
        aqiDisplay.appendChild(aqiDescription);
    }, 1000);
}

// Login functionality
function initLogin() {
    const loginForm = document.getElementById('login-form');

    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        // In a real app, this would send the data to a server
        console.log('Login attempt with:', { email, password });
        
        // Simulate successful login
    
        window.location.href = 'dashboard.html';
    });
    
    // Register link
    document.getElementById('register-link').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Registration functionality would go here');
    });
}
// LOGIN FUNCTION
function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("login-error");

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login successful
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Show error message on the page
      errorMessage.textContent = "Wrong password or email";
      errorMessage.style.display = "block";
      errorMessage.style.color = "#b00020"; // red
    });
}

function signUp(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Registration successful!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Registration failed: " + error.message);
    });
}