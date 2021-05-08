const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const key = '&appid=8ca1a9d428d1976ed8342e39e5335fc7';

const getWeather = async( city ) => {

    const resp = await fetch(`${weatherUrl}${ city }${ key }`);
    const data = await resp.json();
    return data

}

export{
    getWeather
}