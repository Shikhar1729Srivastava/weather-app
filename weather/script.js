// API USED  IS -> https://api.weatherapi.com/v1/current.json?key=7c1aa8b55a0141cbab8194909240712&q=Lucknow&aqi=yes
// open weather api--> https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid=3940adb09aba5d6f079b15b3c845ebb2
// https://openweathermap.org/weather-conditions
const input_city=document.getElementById("input_city");
const search_button=document.getElementById("search_button");
let iocnimg=document.getElementById("iocnimg");
let city_name2=document.getElementById("city_name");
let desh_name=document.getElementById("desh_name");
let long=document.getElementById("long");
let lat=document.getElementById("lat");
let description=document.getElementById("description");
let cloud=document.getElementById("cloud");
let wind_speed=document.getElementById("wind_speed");
let humidity=document.getElementById("humidity");
let visibility=document.getElementById("visibility");
let temperature=document.getElementById("temperature");
let weatherData; 

// This function fetches the data and returns it
async function search_city(city_name) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=3940adb09aba5d6f079b15b3c845ebb2`);
        const data = await response.json();
        if (data.cod === "404") {
            alert(data.message); // Displays "city not found"
            return null; // Return null if city is not found
        }
        return data; // Return the data to be used later
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}
// -----------------------------------------------------function call
search_button.addEventListener('click', async () => {
    let city_name = input_city.value;
    try {
        weatherData = await search_city(city_name); 
        console.log(weatherData); 
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
    console.log(weatherData.sys.country);
    console.log(weatherData.main.temp);
    console.log(weatherData.weather[0].icon);
    let icon = weatherData.weather[0].icon;
     iocnimg.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;
    //  iconimg.className = 'weather-icon'; 
    // iocnimg.style.width = '150px';
    // iocnimg.style.height = '150px';
    // ALL NECESSARY DATA IS HERE
    console.log(weatherData.name)
    city_name2.innerHTML=weatherData.name;
    console.log(weatherData.main.name);
    desh_name.innerHTML=weatherData.sys.country;
    long.innerHTML=weatherData.coord.lon+' °E';
    lat.innerHTML=weatherData.coord.lat+' °N';
    description.innerHTML=weatherData.weather[0].description;
    cloud.innerHTML=weatherData.clouds.all+' %';
    wind_speed.innerHTML=weatherData.wind.speed+' km/h';
    humidity.innerHTML=weatherData.main.humidity+' %';
    visibility.innerHTML=weatherData.visibility+' m';
    temperature.innerHTML=weatherData.main.temp+' °C';
    

});

// Now you can access weatherData here, but it will be populated only after fetch is complete
