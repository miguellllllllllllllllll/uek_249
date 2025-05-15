function warte(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function addiereNachVerzoegerung(a, b, ms) {
  await warte(ms);
  const rechnung = a + b;
  console.log(rechnung);
  return rechnung;
}

async function simulierteVerzoegerung(ms) {
  try {
    await warte(ms); // erste Verzögerung
    await addiereNachVerzoegerung(1, 2, 2000); // zweite Verzögerung + Rechnung
  } catch (error) {
    console.error("Fehler aufgetreten:", error);
  }
}

simulierteVerzoegerung(2000);
