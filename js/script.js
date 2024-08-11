const fetchCountryList = async () => {
  try {
    const res = await fetch("../data.json");
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
    <img src=${country.flag} alt="${country.name} flag" />
    <div class="info">
      <h3 class="title">${country.name}</h3>
      <p class="text"><span>Population:</span> ${country.population.toLocaleString()}</p>
      <p class="text"><span>Region:</span> ${country.region}</p>
      <p class="text"><span>Capital:</span> ${country.capital}</p>
    </div>
  `;

    //click event to navigate to details page
    countryElement.addEventListener("click", () => {
      window.location.href = `details.html?country=${country.name}`;
    });

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

const filterCountryByRegion = async (selectedRegion) => {
  const countryList = await fetchCountryList();
  if (!countryList) return;

  const filteredCountryList = selectedRegion
    ? countryList.filter(
        (country) =>
          country.region.toLowerCase() === selectedRegion.toLowerCase()
      )
    : countryList;

  showCountryList(filteredCountryList);
};

//Events

//search by country
document.getElementById("search-input").addEventListener("input", (event) => {
  filterCountry(event.target.value);
});

//select by region
document.getElementById("region").addEventListener("change", (event) => {
  const selectedRegion = event.target.value;
  filterCountryByRegion(selectedRegion);
});

//initialize
const initialize = async () => {
  const countryList = await fetchCountryList();
  showCountryList(countryList);
};

initialize();
