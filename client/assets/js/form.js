const animeCategory = document.querySelector([value="Anime"])


function changeBackgroundImageForAnime () {
    // Eres un disastre! Donde esta la fetch? DONDE ESTA LA ROUTE PARA LA FETCH. Tu es un idiota.
    let backgroundImage = document.querySelector('body');
    return backgroundImage.innerHTML = "background-image: url('images/anime-home-background.jpeg');"
}

animeCategory.addEventListener('click', changeBackgroundImageForAnime)