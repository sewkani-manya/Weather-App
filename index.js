const apiKey = "API KEY HERE"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cities = ["New York", "Delhi", "London", "Tokyo", "Sydney"];

async function fetchWeather (cityName)
{
    try{
        const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`);
        if (! response.ok) {
            throw new Error (`HTTP error! status: ${response.status}`);
        }

        const data= await response.json();
        return data;
    }
    catch (error){
        console.error (`Error feching weather for ${cityName}:`, error);
    }
}

//Display weather for a dynamically searched city
async function displayDynamicWeather (cityName) {
    const data = await fetchWeather (cityName);

    if (data && data.main) {
        document.querySelector (".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp;
        document.querySelector(".cloudiness").innerHTML = data.clouds.all;
        document.querySelector(".humidity").innerHTML = data.main.humidity;
        document.querySelector(".wind-speed").innerHTML = data.wind.speed;
        document.querySelector(".pressure").innerHTML = data.main.pressure;
    }
    else{
        document.querySelector (".city").innerHTML = "City not found";
    }
}
//Handle search bar form submission 
document.getElementById("city-search-form").addEventListener("submit", async (e) =>{
    e.preventDefault();
    const cityInput = document.getElementById("city-input").value.trim();
    if(cityInput){
        await displayDynamicWeather(cityInput);
        document.getElementById("city-input").value="";
    }

});

// Populate the table with pre-determined cities
async function populateCityTable() {
    const tableBody = document.getElementById("city-weather-table");
    tableBody.innerHTML = ""; // Clear the table before adding rows

    for (const city of cities) {
        const data = await fetchWeather(city);

        if (data && data.main) {
            const row = `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.main.temp}°C</td>
                    <td>${data.main.temp_max}°C</td>
                    <td>${data.main.temp_min}°C</td>
                    <td>${data.clouds.all}%</td>
                    <td>${data.wind.speed} m/s</td>
                    <td>${data.main.humidity}%</td>
                    <td>${data.main.pressure} hPa</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    }
}

// Initial setup
document.addEventListener("DOMContentLoaded", async () => {
    await populateCityTable();

});