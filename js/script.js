document.addEventListener("DOMContentLoaded", function () {
  const url = "https://japceibal.github.io/japflix_api/movies-data.json";
  const btn = document.getElementById("btnBuscar");
  const search = document.getElementById("inputBuscar");
  const list = document.getElementById("lista");
  const contenido = document.getElementById("contenido");

  function showmovies(arr, searchs) {
    if (searchs) {
      return arr.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchs) ||
          movie.overview.toLowerCase().includes(searchs) ||
          movie.tagline.toLowerCase().includes(searchs) ||
          movie.genres.some((genre) =>
            genre.name.toLowerCase().includes(searchs)
          )
      );
    }
    return [];
  }

  function starCalif(n) {
    let stars = "";
    for (let i = 1; i <= n; i++) {
      stars += `<span class="fa fa-star checked"></span>`;
    }
    for (let j = n; j < 5; j++) {
      stars += `<span class="fa fa-star"></span>`;
    }
    return stars;
  }

  function genres(arr) {
    let range = "";
    for (let i = 0; i < arr.length; i++) {
      range += `<div class="col-auto ms-3">${arr[i].name}</div>`;
    }
    return range;
  }

  async function getData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      btn.addEventListener("click", function () {
        const elementos = showmovies(data, search.value.toLowerCase());
        list.innerHTML = "";
        for (let i = 0; i < elementos.length; i++) {
          const movie = elementos[i];
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="row" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${movie.id}" aria-controls="offcanvasTop"">
              <div class="col text-white">${movie.title}</div>
              <div class="col-auto text-white-50">${starCalif(Math.round(movie.vote_average) / 2)}</div>
            </div>
            <div class="row">           
              <div class="col text-white-50">${movie.tagline}</div>
            </div>
            <hr>
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${movie.id}" aria-labelledby="offcanvasTopLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <p>${movie.overview}</p>
                <hr>
              </div>
              <div class="row" id="genres">
                ${genres(movie.genres)}
                <div class="col">
                  <div class="d-flex">
                    <div class="dropdown ms-auto">
                      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Year: ${movie.release_date.substring(0,4)}</a></li>
                        <li><a class="dropdown-item" href="#">Runtime: ${movie.runtime}</a></li>
                        <li><a class="dropdown-item" href="#">Budget: ${movie.budget}</a></li>
                        <li><a class="dropdown-item" href="#">Revenue: ${movie.revenue}</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          li.classList.add("movie-item");
          list.appendChild(li);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  getData(url);
});
