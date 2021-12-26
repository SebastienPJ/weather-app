async function getData(city, state) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=imperial&appid=3ca02677eec4ac8a96141272e96128a2`, { mode: 'cors' })
    const rawData = await response.json()
    console.log(rawData);
  
  
    return rawData
    
  } catch (error) {
    console.log(error)
  };
};


function processData(data) {
  console.log(data);
  const cityName = data.name;
  const humidity = data.main.humidity;
  const feelsLike = data.main.feels_like;
  const currentTemp = data.main.temp;
  const maxTemp = data.main.temp_max;
  const minTemp = data.main.temp_min;

  return { cityName, humidity, feelsLike, currentTemp, maxTemp, minTemp }

}


function renderToPage(dataObj) {
  city.textContent = dataObj.cityName
  temp.textContent = dataObj.currentTemp
  highTemp.textContent = dataObj.maxTemp
  lowTemp.textContent = dataObj.minTemp



}


const city = document.querySelector('.city')
const temp = document.querySelector('.current-temp')
const weatherDesciption = document.querySelector('.temp-description')
const icon = document.querySelector('.icon')
const highTemp = document.querySelector('.high')
const lowTemp = document.querySelector('.low')


const unprocessedData = getData('dallas', 'texas') 

const weatherData = unprocessedData.then(data => processData(data))
                      .then(obj => {
                        renderToPage(obj)
                      }).catch(err => console.error(err))

