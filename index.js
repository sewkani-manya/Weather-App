const apiKey = "API KEY HERE"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function fetchWeather (cityName)
{
    try{
        const response = await fetch(`${apiUrl}$(cityName)&appid=${apiKey}`);
        if (! response.ok) {
            throw new Error (`HTTP error! status: ${response.status}`);
        }

        const data= await response.json();
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

// Initial setup
document.addEventListener("DOMContentLoaded", async () => {
    await populateCityTable();

});