document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("darkModeToggle");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
  } else {
    toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
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
          <br>
             <p class="card-text"><strong>Native Name:</strong> ${
               country.name?.official
             }</p>
            <p class="card-text"><strong>Population:</strong> ${
              country.population ? country.population.toLocaleString() : "N/A"
            }</p>
            <p class="card-text"><strong>Region:</strong> ${
              country.region || "N/A"
            }</p>
            <p class="card-text"><strong>Sub Region:</strong> ${
              country.subregion || "N/A"
            }</p>
            <p class="card-text"><strong>Capital:</strong> ${
              country.capital ? country.capital[0] : "N/A"
            }</p>
            <br>
            <br>
             <p class="card-text"><strong>Top Level Domain:</strong> ${
               country.tld
             }</p>
            <p class="card-text"><strong>Currencies:</strong> ${Object.values(
              country.currencies
            )
              .map((c) => `${c.name} (${c.symbol})`)
              .join(", ")}</p>

             
            <p class="card-text"><strong>Languages:</strong> ${Object.values(
              country.languages
            ).join(", ")}</p>     
           
            <br> 
            
            <p class="card-text"><strong style="font-size:20px">Border Countries:</strong><br> ${
              country.borders ? country.borders.join(", ") : "None"
            }</p>
             
                              
        </div>
      `;
  }
});
