async function searchMovie() {
      const query = document.getElementById('search').value.trim();
      const resultDiv = document.getElementById('result');
      const loader = document.getElementById('loader');

      resultDiv.innerHTML = "";
      loader.style.display = "block";

      const apiKey = "3375cf35";
      const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        loader.style.display = "none";

        if (data.Response === "True") {
          resultDiv.innerHTML = data.Search.map(movie => `
            <div class="movie-card" onclick="showMovieDetails('${movie.imdbID}')">
              <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/230x320?text=No+Image'}" alt="${movie.Title}">
              <h3>${movie.Title}</h3>
              <span>${movie.Type.toUpperCase()} | ${movie.Year}</span>
            </div>
          `).join('');
        } else {
          resultDiv.innerHTML = `<p>${data.Error}</p>`;
        }
      } catch (error) {
        console.error("Error fetching movie data", error);
        loader.style.display = "none";
        resultDiv.innerHTML = `<p>Something went wrong.</p>`;
      }
    }

    async function showMovieDetails(imdbID) {
      const apiKey = "3375cf35";
      const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
      const modal = document.getElementById('modal');
      const overlay = document.getElementById('overlay');

      try {
        const response = await fetch(url);
        const movie = await response.json();

        document.getElementById('modal-title').innerText = movie.Title;
        document.getElementById('modal-content').innerHTML = `
          <strong>Year:</strong> ${movie.Year}<br>
          <strong>Genre:</strong> ${movie.Genre}<br>
          <strong>IMDB Rating:</strong> ${movie.imdbRating}<br>
          <strong>Plot:</strong> ${movie.Plot}
        `;

        modal.classList.add('active');
        overlay.classList.add('active');
      } catch (error) {
        alert("Failed to load movie details.");
      }
    }

    function closeModal() {
      document.getElementById('modal').classList.remove('active');
      document.getElementById('overlay').classList.remove('active');
    }
  
