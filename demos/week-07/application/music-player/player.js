// List of songs (details)
let track_list = [
    {
        name: "Demo1",
        artist: "Broke For Free",
        image: "https://picsum.photos/640/360",
        path: "songs/sample1.mp3",
    },
    {
        name: "Every Morning",
        artist: "Anton Vlasov",
        image: "https://picsum.photos/320/180",
        path: "songs/every-morning-18304.mp3",
    },
    {
        name: "Relax and Sleep",
        artist: "Anton Vlasov",
        image: "https://picsum.photos/480/270",
        path: "songs/relax-and-sleep-18565.mp3",
    },
    {
        name: "Uplifting Day",
        artist: "Lesfm",
        image: "https://picsum.photos/240/180",
        path: "songs/uplifting-day-15583.mp3",
    },
];

// select ALL DOM nodes
const now_playing = document.querySelector( '.now-playing' );
const track_art = document.querySelector( '.track-art' );
const track_name = document.querySelector( '.track-name' );
const track_artist = document.querySelector( '.track-artist' );

const playpause_btn = document.querySelector( '.playpause-track' );
const next_btn = document.querySelector( '.next-track' );
const prev_btn = document.querySelector( '.prev-track' );

const seek_slider = document.querySelector( '.seek_slider' );
const curr_time = document.querySelector( '.current-time' );
const total_duration = document.querySelector( '.total-duration' );
const volume_slider = document.querySelector( '.volume_slider' );

const curr_track = document.createElement( 'audio' );

var track_index = 0; // play first song initially
var isPlaying = false;
var intervalId = 0;

function loadTrack() {
    // stop any previously scheduled timers (from track being played currently)
    if( intervalId !== 0 ) {
        clearInterval( intervalId );
    }

    const track = track_list[track_index];
    curr_track.setAttribute( 'src', track.path );
    curr_track.load();

    track_art.style.backgroundImage = 'url( "' + track.image + '" )';
    track_name.innerText = track.name;
    track_artist.innerText = track.artist;
    now_playing.innerText = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    intervalId = setInterval( seekUpdate, 1000 );
    random_bg_color();
}

// Set up a random background color
function random_bg_color() {
    let red = Math.floor( Math.random() * ( 256 - 64 ) ) + 64;
    let green = Math.floor( Math.random() * ( 256 - 64 ) ) + 64;
    let blue = Math.floor( Math.random() * ( 256 - 64 ) ) + 64;

    let color = `rgb( ${red}, ${green}, ${blue} )`;
    document.body.style.backgroundColor = color;
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function playPauseTrack() {
    if( isPlaying ) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function seekUpdate() {
    const totalDuration = curr_track.duration;
    const currentDuration = curr_track.currentTime;

    seek_slider.value = ( currentDuration / totalDuration ) * 100;

    const currentMinutes = Math.floor( currentDuration / 60 ); // 150 / 60 -> 2.5 -> 2
    const currentSeconds = Math.floor( currentDuration - ( currentMinutes * 60 ) );
    
    const totalMinutes = Math.floor( totalDuration / 60 ); // 150 / 60 -> 2.5 -> 2
    const totalSeconds = Math.floor( totalDuration - ( totalMinutes * 60 ) );

    curr_time.innerText = ( '' + currentMinutes).padStart(2, '0') + ':' + ('' + currentSeconds).padStart(2, '0');
    total_duration.innerText = ( '' + totalMinutes).padStart(2, '0') + ':' + ('' + totalSeconds).padStart(2, '0');
}

loadTrack();

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekTo() {
    curr_track.currentTime = curr_track.duration * seek_slider.value / 100;
}

function nextTrack() {
    // track_index = ( track_index + 1 ) % track_list.length;
    if( track_index === track_list.length - 1 ) {
        track_index = 0;
    } else {
        track_index++;
    }
    
    loadTrack();
    playTrack();
}

function prevTrack() {

    if( track_index === 0 ) {
        track_index = track_list.length - 1;
    } else {
        track_index--;
    }
    
    loadTrack();
    playTrack();
}

playpause_btn.addEventListener( 'click', playPauseTrack );
volume_slider.addEventListener( 'input', setVolume );
seek_slider.addEventListener( 'input', seekTo );
curr_track.addEventListener( 'ended', nextTrack );
prev_btn.addEventListener( 'click', prevTrack );
next_btn.addEventListener( 'click', nextTrack );