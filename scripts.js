let states = ["", "Alaska",
              "Alabama",
              "Arkansas",
              "American Samoa",
              "Arizona",
              "California",
              "Colorado",
              "Connecticut",
              "District of Columbia",
              "Delaware",
              "Florida",
              "Georgia",
              "Guam",
              "Hawaii",
              "Iowa",
              "Idaho",
              "Illinois",
              "Indiana",
              "Kansas",
              "Kentucky",
              "Louisiana",
              "Massachusetts",
              "Maryland",
              "Maine",
              "Michigan",
              "Minnesota",
              "Missouri",
              "Mississippi",
              "Montana",
              "North Carolina",
              " North Dakota",
              "Nebraska",
              "New Hampshire",
              "New Jersey",
              "New Mexico",
              "Nevada",
              "New York",
              "Ohio",
              "Oklahoma",
              "Oregon",
              "Pennsylvania",
              "Puerto Rico",
              "Rhode Island",
              "South Carolina",
              "South Dakota",
              "Tennessee",
              "Texas",
              "Utah",
              "Virginia",
              "Virgin Islands",
              "Vermont",
              "Washington",
              "Wisconsin",
              "West Virginia",
              "Wyoming"
]


            


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
  const currentTemp = Math.floor(data.main.temp);
  const maxTemp = Math.floor(data.main.temp_max);
  const minTemp = Math.floor(data.main.temp_min);

  return { cityName, humidity, feelsLike, currentTemp, maxTemp, minTemp }

}


function renderToPage(dataObj) {
  city.textContent = dataObj.cityName
  temp.textContent = dataObj.currentTemp
  highTemp.textContent = dataObj.maxTemp
  lowTemp.textContent = dataObj.minTemp



}


const statesTag = document.querySelector('#state')
states.forEach(state => {
  const newOption = document.createElement('option');
  newOption.textContent = state
  statesTag.appendChild(newOption)
})


const city = document.querySelector('.city')
const temp = document.querySelector('.current-temp')
const weatherDesciption = document.querySelector('.temp-description')
const icon = document.querySelector('.icon')
const highTemp = document.querySelector('.high')
const lowTemp = document.querySelector('.low')

const form = document.querySelector(".form")
const submitButton = document.querySelector('.submit')
submitButton.addEventListener('click', function(e) {
  e.preventDefault()

  const formData = new FormData(form)

  const cityChosen = formData.get('city')
  const stateChosen = formData.get('state')

  getData(cityChosen, stateChosen).then(unprocessedData => processData(unprocessedData))
      .then(obj => {renderToPage(obj)})

  form.reset();
})

// const unprocessedData = getData('dallas', 'texas') 

// const weatherData = unprocessedData.then(data => processData(data))
//                       .then(obj => {
//                         renderToPage(obj)
//                       }).catch(err => console.error(err))




