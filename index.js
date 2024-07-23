const randomJokesURL = 'https://official-joke-api.appspot.com/random_joke';
const localJokesURL = 'http://localhost:3000/jokes';

function fetchRandomJoke () {
    fetch(randomJokesURL)
    .then(res => res.json())
    .then(jokes => {
        renderJokes(jokes)
    })
}

fetchRandomJoke();

function renderJokes(joke){
    const jokesDiv = document.querySelector('.random');
    
    const type = document.createElement('h4');
    const setup = document.createElement('p');
    const punchline = document.createElement('p');
    const showPunchline = document.createElement('button');
    const nextJoke = document.createElement('button');

    punchline.className = 'hide';
    
    showPunchline.addEventListener('click', () => {
        if(punchline.className === 'hide'){
            punchline.className = 'show'
            showPunchline.textContent = 'Hide Punchline'
                                  
       } else {
            punchline.className = 'hide'
            showPunchline.textContent = 'Show Punchline'
       }
    })

    

    nextJoke.addEventListener('click', () => {
        jokesDiv.innerHTML = '';
        fetchRandomJoke();
    })

    showPunchline.textContent = 'Show Punchline';
    nextJoke.textContent = 'Next';

    type.textContent = joke.type;
    setup.textContent = joke.setup;
    punchline.textContent = joke.punchline;

    jokesDiv.append(type, setup, showPunchline, punchline, nextJoke);
    
}

function fetchLocalJoke () {
    fetch(localJokesURL)
    .then(res => res.json())
    .then(mzaha => {
        mzaha.map(renderLocalJokes)

        // mzaha.map((jk) => {
        //     renderLocalJokes(jk)
        // })
    })
}

fetchLocalJoke(); //Invocation

function renderLocalJokes(mzaha){
    const localJokesDiv = document.querySelector('.local');

    const type = document.createElement('h4');
    const setup = document.createElement('p');
    const punchline = document.createElement('p');
    const showPunchline = document.createElement('button');
       
    punchline.className = 'hide';

    showPunchline.textContent = 'Show Punchline';
    
    showPunchline.addEventListener('click', () => {       
       if(punchline.className === 'hide'){
            punchline.className = 'show'
            showPunchline.textContent = 'Hide Punchline'
                                  
       } else {
            punchline.className = 'hide'
            showPunchline.textContent = 'Show Punchline'
       }
    })   
    

    type.textContent = mzaha.type;
    setup.textContent = mzaha.setup;
    punchline.textContent = mzaha.punchline;

    localJokesDiv.append(type, setup, showPunchline, punchline);
    
}


