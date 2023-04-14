
const form = document.querySelector('form');
const input = document.querySelector('#city');
const weatherDiv = document.querySelector('#weather');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const apiKey = '1eb27fbff71bef4ea9488dfbb1f2cdf6';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { name, main: { temp, humidity }, weather: [ { description, icon } ] } = data;
    const capitalizedDescription = description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const weatherHTML = `
      <h2>${name}</h2>
      <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
      <p>${temp} F</p>
      <p>${capitalizedDescription}</p>
      <p>Humidity: ${humidity}%</p>
    `;
    weatherDiv.innerHTML = weatherHTML;
  } catch (error) {
    console.error(error);
    weatherDiv.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}
