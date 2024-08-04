const fetchCountryList = async () => {
  try {
    const res = await fetch("data.json");
    const data = res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const showCountryList = async (countryList) => {
  const countryContainer = document.querySelector(".country-list .wrapper");

  countryContainer.innerHTML = "";

  countryList.forEach((country) => {
    const countryElement = document.createElement("div");
    countryElement.classList.add("country");

    countryElement.innerHTML = `

      <img src=${country.flag}
              alt="random"
            />
            <div class="info">
              <h3 class="title">${country.name}</h3>
              <p class="text"><span>Population:</span> ${country.population.toLocaleString()}</p>
              <p class="text"><span>Region:</span> ${country.region}</p>
              <p class="text"><span>Capital:</span> ${country.capital}</p>
            </div>
    `;

    countryContainer.appendChild(countryElement);
  });

  console.log(countryList);
};

const filterCountry = async (searchText) => {
  const countryList = await fetchCountryList();
  const filteredCountry = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );
  showCountryList(filteredCountry);
};

document.querySelector(".search-input").addEventListener("input", (event) => {
  filterCountry(event.target.value);
});

const initialize = async () => {
  const countryList = await fetchCountryList();
  showCountryList(countryList);
};

initialize();
