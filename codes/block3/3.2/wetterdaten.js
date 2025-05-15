const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=818000";

async function Getweatherdata() {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      console.error(response.status);
    } else {
      const data = await response.json();
      console.log(data.currentWeather.temperature);
    }
  } catch (error) {
    console.error(error);
  }
}

Getweatherdata();
