async function getData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=3ca02677eec4ac8a96141272e96128a2`, { mode: 'cors' });
    const rawData = await response.json();
    console.log(rawData);
  
  
    return rawData
    
  } catch (error) {
    console.log(error);
  };
};


function processData(data) {
  console.log(data);
  const cityName = data.name;
  const humidity = data.main.humidity;
  const feelsLike = data.main.feels_like;
  const currentTemp = Math.floor(data.main.temp);
  const maxTemp = Math.floor(data.main.temp_max);
  const minTemp = Math.floor(data.main.temp_min);
  const tempDescription = data.weather[0].description;
  const tempIconCode = data.weather[0].icon;
  

  return { cityName, humidity, feelsLike, currentTemp, maxTemp, minTemp, tempDescription, tempIconCode }

};


function renderToPage(dataObj) {

  tempOptions.forEach(option => {
    option.classList.remove('temp-selected')
  })
  fahrenheitButton.classList.add('temp-selected')


  city.textContent = dataObj.cityName;
  temp.textContent = dataObj.currentTemp;
  highTemp.textContent = dataObj.maxTemp;
  lowTemp.textContent = dataObj.minTemp;
  weatherDesciption.textContent = dataObj.tempDescription
  icon.src = `images/${dataObj.tempIconCode}@2x.png`


  app.style.display = 'inline-block'
};



function convertToCelsius(degreeF) {
  return Math.floor(((degreeF - 32) * (5/9)))
}



let processedData;
const fahrenheitButton = document.querySelector('.fahrenheit')
const appContainer = document.querySelector('.app-container')
const app = document.querySelector('.weather-app');
const city = document.querySelector('.city');
const temp = document.querySelector('.current-temp');
const weatherDesciption = document.querySelector('.temp-description');
const icon = document.querySelector('.icon');
const highTemp = document.querySelector('.high');
const lowTemp = document.querySelector('.low');

const form = document.querySelector(".form");
const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const cityChosen = formData.get('city');
  const stateChosen = formData.get('state');

  getData(cityChosen)
      .then(unprocessedData => processData(unprocessedData))
      .then(obj => {
        renderToPage(obj)
        processedData = obj
      });

  form.reset();
})


const tempOptions = document.querySelectorAll('.temp-options');
tempOptions.forEach(option => {
  option.addEventListener('click', function() {
    tempOptions.forEach(button => { 
      button.classList.remove('temp-selected')
    })

    this.classList.add('temp-selected')
    console.log(this);

    if (this.textContent == 'C') {
      const currentTempC = convertToCelsius(processedData.currentTemp);
      const highTempC = convertToCelsius(processedData.maxTemp);
      const lowTempC = convertToCelsius(processedData.minTemp);

      temp.textContent = currentTempC;
      highTemp.textContent = highTempC;
      lowTemp.textContent = lowTempC;

    } else {
      temp.textContent = processedData.currentTemp;
      highTemp.textContent = processedData.maxTemp;
      lowTemp.textContent = processedData.minTemp;
    }
    
  })
})



