const express = require("express");
const { request } = require("http");
const app = express();

const plz = 8180;
const url =
  "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=" + plz + "00";

async function Getweatherdata() {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      console.error(response.status);
      return;
    } else {
      const data = await response.json();
      console.log(data.currentWeather.temperature);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

app.listen(3000, () => {
  console.log("server started");
});

// http://localhost:3000/hallo
app.get("/" + plz, async (request, response) => {
  const data = await Getweatherdata();

  response.send("Es ist" + data.currentWeather.temperature + "grad");
});

app.listen(3000, () => {
  console.log("example app listening on port 3000");
});
