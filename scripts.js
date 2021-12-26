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


const unprocessedData = getData('dallas', 'texas') 

const weatherDataObj = unprocessedData.then(data => processData(data))
                      .then(obj => console.log(obj))

