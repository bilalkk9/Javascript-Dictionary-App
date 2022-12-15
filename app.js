let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let apiKey = '046ece23-023a-4358-a118-65e842263ddb';

searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    
    // Clear Data

    audioBox.innerHTML = '';
    notFound.innerHTML = '';
    defBox.innerHTML = '';

    // Get input Data

    let word = input.value;

    // Call API and Get Data

    if(word === '' ){
        alert('Enter Value');
        return;
}

getData(word);


})


async function getData(word){

    // Ajax Call

    const response = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();

    // Result not found

    if(!data.length){
        notFound.innerText = 'No Result Found';
        return;
    }

    // If suggestion

    if(typeof data[0] === 'string'){
        let heading = document.createElement('h3');
        heading.innerText = 'Did You Mean?';
        notFound.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);

            suggestion.addEventListener('click',function(){
                input.value = this.innerText;
            })

        });

        return;

    }

    // Result Found

    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    //Sound

    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }

}

function renderSound(soundName){
    let subFolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}


