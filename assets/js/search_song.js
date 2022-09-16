const d = document,
  $main = d.querySelector(".container");

const searchSong = async (e) => {
  e.preventDefault();
  if (e.target.matches("form")) {
    try {
      let artist = e.target.autor.value.toLowerCase(),
        // title = e.target.title.value.toLowerCase(),
        artistApi = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;

        $main.innerHTML = `
        <section class="modal-section">
        <img class="loading" src="assets/icons/loading.svg" alt="Cargando...">
        </section>
        `;
        
        let fetchArtist = await fetch(artistApi)
        artistData = await fetchArtist.json();
        console.log(artistData.artists)
        if(artistData.artists === null) {
            $main.innerHTML = `
        <article class="artist">
        <h2 class="artist-name">We don't have data of ${artist} :(</h2>
        </article>`;
        }else{
        $main.innerHTML = `<article class="artist">
            <img class="artist-image" style="height:400px;" src="${artistData.artists[0].strArtistThumb}">
            <h2 class="artist-name">${artistData.artists[0].strArtist}</h2>
            <p class="artist-genre">${artistData.artists[0].strGenre} - ${artistData.artists[0].strCountryCode}</p>
            <p class="artist-bio">${artistData.artists[0].strBiographyEN}</p>
        </article>`;
    }



      console.log(artistData);
  
    } catch (err) {
      console.log(err);
      let message = err.statusText || "Ocurrió un error";
      $main.innerHTML = `${err.status}: ${message}`;
    }
  }

  // Make fetch to TV MAZE
};

d.addEventListener("submit", searchSong);
