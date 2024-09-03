document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("darkModeToggle");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleButton.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggleButton.textContent = "🌙 Dark Mode";
    }
  });

  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("name");

  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        displayCountryDetails(data[0]);
      } else {
        console.error("No data found for the specified country.");
      }
    })
    .catch((error) => console.error("Error fetching data: ", error));

  function displayCountryDetails(country) {
    console.log("Country Data:", country);

    const countryDetailsContainer = document.getElementById("countryDetails");

    countryDetailsContainer.innerHTML = `
        <div class="card mb-4">
          <img src="${
            country.flags?.svg || "default.png"
          }" class="card-img-top" alt="${
      country.name?.common || "Country Flag"
    }">
          <div class="card-body">
            <h5 class="card-title">${country.name?.common || "N/A"}</h5>
          
            <p class="card-text"><strong>Population:</strong> ${
              country.population ? country.population.toLocaleString() : "N/A"
            }</p>
            <p class="card-text"><strong>Region:</strong> ${
              country.region || "N/A"
            }</p>
            <p class="card-text"><strong>Subregion:</strong> ${
              country.subregion || "N/A"
            }</p>
            <p class="card-text"><strong>Capital:</strong> ${
              country.capital ? country.capital[0] : "N/A"
            }</p>
             <p class="card-text"><strong>Continent:</strong> ${
               country.continents || "N/A"
             }</p>
            <p class="card-text"><strong>Area:</strong> ${
              country.area ? country.area.toLocaleString() : "N/A"
            } km²</p>
            <p class="card-text"><strong>Timezones:</strong>${
              country.timezones ? country.timezones.join(", ") : "N/A"
            }</p>
            <p class="card-text"><strong>Borders:</strong> ${
              country.borders ? country.borders.join(", ") : "None"
            }</p>
            <p class="card-text"><strong>Map:</strong> ${
              country.maps?.googleMaps || "N/A"
            }</p>
             
            <p class="card-text"><strong>Currencies:</strong> ${Object.values(
              country.currencies
            )
              .map((c) => `${c.name} (${c.symbol})`)
              .join(", ")}</p>
               <p class="card-text"><strong>Country Code:</strong> ${
                 country.ccn3 || "N/A"
               }</p>
               <p class="card-text"><strong>Coordinates:</strong> Latitude: ${
                 country.latlng[0]
               }, Longitude: ${country.latlng[1]}</p>
<p class="card-text"><strong>Common Name:</strong> ${country.name.common}</p>

              <p class="card-text"><strong>Translations:</strong> ${
                country.translations
                  ? Object.entries(country.translations)
                      .map(([lang, names]) => {
                        // Combine official and common names, ensuring no duplicates
                        const uniqueNames = new Set(
                          [names.official, names.common].filter(Boolean)
                        );
                        const namesList = Array.from(uniqueNames).join(", ");
                        return `${lang.toUpperCase()}: ${namesList}`;
                      })
                      .join(", ")
                  : "N/A"
              }</p>

            <p class="card-text"><strong>Languages:</strong> ${Object.values(
              country.languages
            ).join(", ")}</p>      
             <p class="card-text"><strong>Start of Week:</strong> ${
               country.startOfWeek || "N/A"
             }</p>             
        </div>
      `;
  }
});
