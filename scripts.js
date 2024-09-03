document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries");
  const searchInput = document.getElementById("search");
  const filterRegionSelect = document.getElementById("filterRegion");
  const toggleButton = document.getElementById("darkModeToggle");

  let countriesData = [];

  const apiUrl = "https://restcountries.com/v3.1/all";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      countriesData = data;
      displayCountries(countriesData);
    })
    .catch((error) => console.error("Error fetching data: ", error));

  function displayCountries(countries) {
    countriesContainer.innerHTML = "";
    countries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("col-12", "col-sm-4", "col-lg-3", "mb-4");
      countryCard.innerHTML = `
              <div class="card h-100">
                  <img src="${country.flags.svg}" class="card-img-top" alt="${
        country.name.common
      }">
                  <div class="card-body">
                      <h5 class="card-title">${country.name.common}</h5>
                      <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                      <p class="card-text"><strong>Region:</strong> ${
                        country.region
                      }</p>
                      <p class="card-text"><strong>Capital:</strong> ${
                        country.capital ? country.capital[0] : "N/A"
                      }</p>
                  </div>
              </div>
          `;
      countryCard.addEventListener("click", () => {
        window.location.href = `country-details.html?name=${country.name.common}`;
      });
      countriesContainer.appendChild(countryCard);
    });
  }

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCountries = countriesData.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
  });

  filterRegionSelect.addEventListener("change", () => {
    const region = filterRegionSelect.value;
    const filteredCountries = region
      ? countriesData.filter((country) => country.region === region)
      : countriesData;
    displayCountries(filteredCountries);
  });

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleButton.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });
});
