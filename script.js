// document.getElementById('search-btn').addEventListener('click', getWeather);

// async function getWeather() {
//     const city = document.getElementById('city-input').value;
//     if (city === "") {
//         alert("Please enter a city name.");
//         return;
//     }

//     const apiKey = `dbaeb9f9fbe2ffb36b59a3e3c5ffdcf3`; // Replace with your OpenWeatherMap API key
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         console.log(data);

//         if (data.cod === "404") {
//             alert("City not found. Please try again.");
//             return;
//         }

//         document.getElementById('city-name').textContent = data.name;
//         document.getElementById('weather-description').textContent = data.weather[0].description;
//         document.getElementById('temperature').textContent = `${data.main.temp} °C`;
//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//         alert("An error occurred while fetching weather data. Please try again.");
//     }
// }

document.getElementById('search-btn').addEventListener('click', (e) => {
    e.preventDefault();
    getWeather();
});

async function getWeather() {
    const city = document.getElementById('city-input').value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = 'dbaeb9f9fbe2ffb36b59a3e3c5ffdcf3'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (data.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }
        else if (data.cod === '401') {
            alert(
                "invalid api key!"
            )
            return;
        }

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('weather-description').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = `${data.main.temp} °C`;

        const main = document.getElementById('main');
        Object.entries(data?.main).map((ele, idx) => {
            let key = ele[0].split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            let value = ele[1];
            const li = document.createElement('li');
            li.innerHTML = `<b>${key}</b>: ${value}`;
            main.appendChild(li);
        })
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again.');
    }

}