// Selecting DOM elements
const weatherForm = document.querySelector(".weatherForm"); // Form element
const cityInput = document.querySelector(".cityInput"); // Input field for city
const card = document.querySelector(".card"); // Container for displaying weather information
const apiKey = "16627859c108e9e659db97e269d2d745"; // OpenWeatherMap API key

// Event listener for form submission
weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Prevent default form submission behavior

    const city = cityInput.value; // Get the city entered by the user from the input field

    // If a city is entered
    if (city) {
        try {
            // Fetch weather data for the entered city
            const weatherData = await getWeatherData(city);
            // Display weather information
            displayWeatherInfo(weatherData);
        } catch (error) {
            // Log the error and display an error message
            console.error(error);
            displayError(error);
        }
    } else {
        // If no city is entered, display an error message
        displayError("Please enter a city");
    }
});

// Function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // API URL
    const response = await fetch(apiUrl); // Fetch weather data from the API

    // If the response is not OK, throw an error
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json(); // Return the JSON data
}

// Function to display weather information on the webpage
function displayWeatherInfo(data) {
    // Extract data from the weather API response
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    // Clear previous content and display the card container
    card.textContent = "";
    card.style.display = "flex";

    // Create elements to display weather information
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Set text content for each element
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Add classes to each element
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append elements to the card container
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Function to determine the weather emoji based on the weather ID
function getWeatherEmoji(weatherId) {
    // Return the appropriate emoji based on the weather ID range
    switch (true) {
        case weatherId >= 200 && weatherId < 300:
            return "⛈"; // Thunderstorm
        case weatherId >= 300 && weatherId < 400:
            return "🌧"; // Drizzle
        case weatherId >= 500 && weatherId < 600:
            return "🌧"; // Rain
        case weatherId >= 600 && weatherId < 700:
            return "❄"; // Snow
        case weatherId >= 700 && weatherId < 800:
            return "🌫"; // Atmosphere
        case weatherId === 800:
            return "☀"; // Clear
        case weatherId >= 801 && weatherId < 810:
            return "☁"; // Clouds
        default:
            return "⁉"; // Unknown
    }
}

// Function to display an error message
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    // Clear previous content and display the error message
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
