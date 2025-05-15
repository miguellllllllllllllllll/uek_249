const express = require("express");

const app = express();
const port = 3000;

async function getTempForZip(zip) {
  let url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zip}00`;
  const response = await fetch(url);

  if (response.status != 200) {
    console.error("Error " + response.status);
    return;
  }
  const data = await response.json();
  const temperature = data.currentWeather.temperature;
  return temperature;
}

app.get("/temperature/:plz", async (req, resp) => {
  const plz = req.params.plz;
  const temperature = await getTempForZip(8180);
  resp.send("Es ist " + temperature + " grad");
});
