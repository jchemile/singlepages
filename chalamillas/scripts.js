const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


//Movie Titles
const movies = ['chalamillas']

//Keep track of movies
let movieIndex = 0

//First Movie
loadMovie(movies[movieIndex])

//Movies details

function loadMovie(movie){
    title.innerText = movie
    audio.src = `movie/${movie}.ogg`
    cover.src = `images/${movie}.jpg`
}

function playMovie(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function prevMovie(){
    movieIndex--

    if(movieIndex < 0){
        movieIndex = movies.length - 1
    }

    loadMovie(movies[movieIndex])

    playMovie()
}

function nextMovie(){
    movieIndex++

    if(movieIndex > movies.length - 1){
        movieIndex = 0
    }

    loadMovie(movies[movieIndex])

    playMovie()
}

function updateProgress(e){
    const { duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const widht = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration


    audio.currentTime = (clickX / widht) * duration
}

function pauseMovie(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

//Event listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseMovie()
    }else {
        playMovie()
    }
})

prevBtn.addEventListener('click', prevMovie)
nextBtn.addEventListener('click', nextMovie)


audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextMovie)