const apiUrl = "https://restcountries.com/v2/all";

async function getCountryData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const cardsContainer = document.getElementById("cardRow");

    for (let i = 0; i < data.length; i++) {
      const country = data[i];
      const card = document.createElement("div");
      card.className = "total-card";
      card.classList.add("col-md-4", "col-lg-3", "mb-3");

      const header = document.createElement("div");
      header.classList.add("card-header");
      header.textContent = country.name;
      card.appendChild(header);

      const body = document.createElement("div");
      body.classList.add("card-body");

      const flag = document.createElement("img");
      flag.classList.add("card-img-top", "flag-image");
      flag.src = country.flag;
      flag.alt = `${country.name} flag`;
      body.appendChild(flag);

      const cardText1 = document.createElement("div");
      cardText1.classList.add("card-text");
      cardText1.textContent = `Region: ${country.region}`;
      body.appendChild(cardText1);

      const cardText2 = document.createElement("div");
      cardText2.classList.add("card-text");
      cardText2.textContent = `Capital: ${country.capital}`;
      body.appendChild(cardText2);

      const cardText3 = document.createElement("div");
      cardText3.classList.add("card-text");
      cardText3.textContent = `Country Code: ${country.alpha2Code}`;
      body.appendChild(cardText3);

      const weatherButton = document.createElement("button");
      weatherButton.classList.add("btn", "btn-primary");
      weatherButton.textContent = "Click for Weather";
      weatherButton.addEventListener("click", async () => {
        try {
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=576faa96be21a9632be5fb511a7d09d3`;
          const weatherResponse = await fetch(weatherUrl);
          const weatherData = await weatherResponse.json();
          console.log(weatherData);
          const weather = weatherData.weather[0].description;
          const humidity = weatherData.main.humidity;
          const popup = document.createElement("div");
          popup.className = "popup";
          const closeBtn = document.createElement("span");
          closeBtn.className = "close-btn";
          closeBtn.innerHTML = "&times;";
          const weatherInfo = document.createElement("div");
          weatherInfo.className = "weather-info";
          weatherInfo.innerHTML = `
            <h5>Weather in ${country.capital}</h5>
            <p>Weather: ${weather}</p>
            <p>Humidity: ${humidity}</p>
          `;
          popup.appendChild(closeBtn);
          popup.appendChild(weatherInfo);
          card.appendChild(popup);
          // document.body.appendChild(popup);
          closeBtn.addEventListener("click", () => {
            card.removeChild(popup);
          });
        } catch (error) {
          console.error(error);
        }
      });

      body.appendChild(weatherButton);

      card.appendChild(body);
      card.appendChild(body);

      cardsContainer.appendChild(card);
    }
  } catch (error) {
    console.log(error);
  }
}

getCountryData();
