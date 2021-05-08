import { get } from "lodash";
import { getWeather } from "./htpp-provider";

const body = document.body;
let buttonSearch;
let count = 0;

const createHtml = () => {
  const html = `<div class="container mt-5 " id = "weather-container">
    <div class="input-group mb-3 input-sm">
      <input
        type="text"
        class="form-control"
        placeholder="Write your City"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        id="city"
      />
      <button type="button" class="btn btn-success" id="search">
        Search
      </button>
    </div>

    
    
  </div>`;

  const div = document.createElement("div");
  div.innerHTML = html;
  body.appendChild(div.firstChild);
};

const events = () => {
  const weatherContainer = document.querySelector("#weather-container");

  buttonSearch = document.querySelector("#search");
  buttonSearch.addEventListener("click", async () => {
    try {
      let city = document.querySelector("#city").value;
      if (city != "") {
        const { name, main, weather, sys, wind, dt } = await getWeather(city);
        console.log(dt);
        const htmlWeather = `<div class="container-fluid" id = "weather-card">
    <div class="row justify-content-center">
      <div class="col-12 col-md-4 col-sm-12 col-xs-12">
        <div class="card p-4">
          <div class="d-flex">
            <h6 class="flex-grow-1">${name} ,${sys.country}</h6>
          </div>
          <div class="d-flex flex-column temp mt-5 mb-3">
            <h1 class="mb-0 font-weight-bold" id="heading">
            ${convertTemperature(main.temp)}° <span> C </span> 
            </h1>
            <span class="small grey">${weather[0].main}</span>
          </div>
          <div class="d-flex">
            <div class="temp-details flex-grow-1">
              <p class="my-1">
                
                <span> Wind Speed: ${parseInt(wind.speed * 3.6)} km/h </span>
              </p>
             
            </div>
            <div>
              <img src="http://openweathermap.org/img/wn/${
                weather[0].icon
              }@2x.png" width="100px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

        const div = document.createElement("div");
        div.innerHTML = htmlWeather;
        weatherContainer.append(div.firstChild);
        document.querySelector("#city").value = "";
        if (count > 0) {
          document.querySelector("#weather-card").innerHTML = "";
        }
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const convertTemperature = (temp) => {
  return parseInt(temp - 273.15);
};


export const init = async () => {
  createHtml();
  events();
};

{
  /*  */
}
