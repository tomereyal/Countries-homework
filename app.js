function getCountriesFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
      }).done(function (data) {
        console.log(data);
        resolve(data);
      });
    }, 2000);
  });
}

function getFilteredCountriesFromServer(valueTyped, category) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
      }).done(function (data) {
        const filteredArray = data.filter((country) => {
          const wantedCategory = country[category].toLowerCase();
          return wantedCategory == valueTyped;
        });
        resolve(filteredArray);
      });
    }, 2000);
  });
}

async function init() {
  const getCountriesBtn = $("#getCountriesBtn");
  const countriesCountainer = $("#countriesCountainer");
  const loader = $(
    "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"
  );
  const searchBtn = $("#searchBtn");
  const categoriesBox = $("#categoriesBox");
  const searchInput = $("#searchInput");

  searchBtn.on("click", async function () {
    getCountriesBtn.html(loader);
    const categoriesBoxVal = categoriesBox.val();
    const searchInputVal = searchInput.val().toLowerCase();
    const matches = await getFilteredCountriesFromServer(
      searchInputVal,
      categoriesBoxVal
    );

    drawArray(matches);

    getCountriesBtn.empty();
    getCountriesBtn.text("Show All");
  });

  getCountriesBtn.on("click", async function () {
    $(this).html(loader);
    // console.log("search start");
    // console.log("loader start");
    // container.html(loader);
    //resolve =>>> then
    // reject =>>> catch

    try {
      const countries = await getCountriesFromServer();
      drawArray(countries);
      getCountriesBtn.empty();
      getCountriesBtn.text("Show All");
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
    const commaSeperatedPopulation = population
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const card = $("<div class='country-card'></div>").css(
      "background-image",
      `url(${flag})`
    );
    const h3 = $("<h3></h3>").text(name);
    const populationDiv = $("<div class='population'></div>").text(
      commaSeperatedPopulation
    );
    card.append(h3, populationDiv);
    return card;
  }
}

init();
