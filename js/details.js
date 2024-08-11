const fetchCountryList = async () => {
  try {
    const res = await fetch("../data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCountryFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("country");
};

const showCountryDetails = async () => {
  const countryName = getCountryFromUrl();
  const countryList = await fetchCountryList();
  const country = countryList.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  console.log(country);

  if (!country) {
    document.querySelector(".country-details .wrapper").innerHTML =
      "<p>Country not found</p>";
    return;
  }

  document.querySelector(".country-details .wrapper").innerHTML = `
      <img src=${country.flag} alt="${country.name} flag" />
      <div class="details">
         <div>
            <h2>${country.name}</h2>
         </div>
     <div>
        <p><strong>Native Name:</strong> ${country.nativeName || "N/A"}</p>
        <p><strong>Population:</strong> ${
          country.population ? country.population.toLocaleString() : "N/A"
        }</p>
        <p><strong>Region:</strong> ${country.region || "N/A"}</p>
        <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
        <p><strong>Capital:</strong> ${
          country.capital ? country.capital : "N/A"
        }</p>
     </div>
     <div>
        <p><strong>Top Level Domain:</strong> ${
          country.topLevelDomain.join(", ") || "N/A"
        }</p>
        <p><strong>Currencies:</strong> ${
          country.currencies && country.currencies.length > 0
            ? country.currencies.map((currency) => currency.name).join(", ")
            : "N/A"
        }</p>
        <p><strong>Languages:</strong> ${
          country.languages && country.languages.length > 0
            ? country.languages.map((language) => language.name).join(", ")
            : "N/A"
        }</p>
     </div>

         <div>
            <p>Border Countries: </p>
         ${
           country.borders && country.borders.length > 0
             ? country.borders
                 .map((border) => `<span class="tag">${border}</span>`)
                 .join("")
             : "<span>No border countries</span>"
         } 
         </div>
      </div>
    `;
};

document.getElementById("back-btn").addEventListener("click", () => {
  window.history.back();
});

showCountryDetails();
