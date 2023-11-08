const apiURL = 'https://www.swapi.tech/api/films/';
const content = document.querySelector('#content');

window.addEventListener('load', getMoviesData);

async function getMoviesData() {
    const response = await fetch(apiURL);
    const dataReceived = await response.json();

    let movies = dataReceived.result;

    renderMovies(movies);
};

function renderMovies(movies) {

    movies.forEach(async (movie) => {

        //create a div for every movie 

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
        <div class="movie-info">
            <h3>${movie.properties.title}</h3>
            <p>Episode: ${movie.properties.episode_id}</p>
            <p>Release year: ${movie.properties.release_date.slice(0, 4)}</p>
            <p>Director: ${movie.properties.director}</p>
            <p>${movie.properties.opening_crawl}</p>
        </div>`;
        
        /* 
        The data about heroes received from the API is arrays of links. 
        To display character names we need to get information from each link.
        Each element's link is saved as its id.
        */
        
        let characters = movie.properties.characters;
        const characterElement = document.createElement('div');
        characterElement.classList.add('char-info');
        characterElement.innerHTML = `<h3> List of characters: </h3>`;

        for (let i = 0; i < 10; i++) {
            let charURL = characters[i];
            let data = await fetch(charURL);
            let charData = await data.json();
            if (charData != undefined) {
                let charName = document.createElement('a');
                charName.setAttribute('id', `${charURL}`);
                charName.textContent = `${charData.result.properties.name}`;
                characterElement.appendChild(charName);
            }
        }

        const charLinks = document.getElementsByTagName('a');
        
        /*
        An event listener is placed on each character link.
        Clicking on a character's link initiates receiving data about character from the API.
        */

        for (let i = 0; i <= charLinks.length - 1; i++) {
            charLinks[i].addEventListener('click', async function getCharData() {
                let charDataURL = this.getAttribute('id');
                let data = await fetch(charDataURL);
                let charInfoData = await data.json();
                let charInfo = charInfoData.result.properties;
                showModal(charInfo);
            })
        }

        movieElement.appendChild(characterElement);
        content.appendChild(movieElement);
    }) //the end of creating and rendering div(movieElements) 
} //the end of function renderMovies


//this function gets the information about the clicked character and shows it in the modal
function showModal(charInfo) {
    document.querySelector('#charName').textContent = charInfo.name;
    document.querySelector('#charBirth').textContent = `Birth Year: ${charInfo.birth_year}`;
    document.querySelector('#charGender').textContent = `Gender: ${charInfo.gender}`;
    document.querySelector('#charHeight').textContent = `Height: ${charInfo.height}`;
    document.querySelector('#charMass').textContent = `Weight: ${charInfo.mass}`;
    document.querySelector('#charSkin').textContent = `Skin color: ${charInfo.skin_color}`;
    document.querySelector('#charHair').textContent = `Hair color: ${charInfo.hair_color}`;
    document.querySelector('#charEyes').textContent = `Eyes color: ${charInfo.eye_color}`;

    document.querySelector('#modal').classList.add('is-visible');
}

document.querySelector('#close-btn').addEventListener('click', function () {
    document.querySelector('#modal').classList.remove('is-visible');
});


//background animation
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 355,
            "density": {
                "enable": true,
                "value_area": 790
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 0.2,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 0.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 83.91608391608392,
                "size": 1,
                "duration": 3,
                "opacity": 1,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
