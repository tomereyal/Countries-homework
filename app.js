function getCountriesFromServer() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://restcountries.eu/rest/v2/all",
    }).done(function (data) {
      resolve(data);
    });
  });
}

async function init() {
  const getCountriesBtn = $("#getCountriesBtn");
  const countriesCountainer = $("#countriesCountainer");

  getCountriesBtn.on("click", async function () {
    // console.log("search start");
    // console.log("loader start");
    // container.html(loader);
    //resolve =>>> then
    // reject =>>> catch

    try {
      const countries = await getCountriesFromServer();
      drawArray(countries);
      console.log(countries);
    } catch (err) {
      alert(err);
      countriesCountainer.empty();
    }
  });

  function drawArray(aCountries) {
    countriesCountainer.empty();
    const aCountryCards = aCountries.map((countryData) => {
      return generateCard(countryData);
    });
    countriesCountainer.append(aCountryCards);
  }

  function generateCard(countryData) {
    const { name, population, flag } = countryData;
    const card = $("<div class='country-card'></div>").css(
      "background-image",
      `url(${flag})`
    );
    console.log(flag);
    const h3 = $("<h3></h3>").text(name);
    const populationDiv = $("<div class='population'></div>").text(population);
    card.append(h3, populationDiv);
    return card;
  }
}

init();
