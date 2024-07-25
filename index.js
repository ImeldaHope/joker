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
    const deleteJoke = document.createElement('button');
       
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
    
    deleteJoke.textContent = 'Delete Joke'
    deleteJoke.addEventListener('click', () => {
        deleteAJoke(mzaha.id)
    })

    type.textContent = mzaha.type;
    setup.textContent = mzaha.setup;
    punchline.textContent = mzaha.punchline;

    localJokesDiv.append(type, setup, showPunchline, deleteJoke, punchline);    
}


function renderJokeForm(){
    const formDiv = document.querySelector('.new-joke');
    const jokeForm = document.createElement('form');
    const jokeType = document.createElement('input'); 
    const jokeSetup = document.createElement('input'); 
    const jokePunchline = document.createElement('input'); 
    const submitBtn = document.createElement('input'); 

    formDiv.className = 'form-container'
    submitBtn.type = 'submit'
    
    jokeType.placeholder = 'Enter type of joke'
    jokeSetup.placeholder = 'Enter setup of joke'
    jokePunchline.placeholder = 'Enter punchline'
    submitBtn.placeholder = 'Submit'

    jokeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            type: jokeType.value,
            setup: jokeSetup.value,
            punchline: jokePunchline.value,
        };

        postLocalJoke(formData);
        jokeForm.reset();
    })
    jokeForm.append(jokeType, jokeSetup, jokePunchline, submitBtn);
    formDiv.append(jokeForm)
}

renderJokeForm()

function postLocalJoke(formInput){
    
    fetch(localJokesURL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(formInput)
    })
    .then(res => res.json())
    .then(data => {
        renderLocalJokes(data)
    })
}

function deleteAJoke(id){
    const deletedJoke = document.querySelector('.local');

    fetch(`${localJokesURL}/${id}`, {
        method: 'DELETE'              
    })
    .then(res => res.json())
    .then(() => {
        deletedJoke.remove(id);        
    })
}