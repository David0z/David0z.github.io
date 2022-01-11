const navbar = document.getElementById('navbar');

// NAVBAR EVENT LISTENER

let lastScrollValue = 0;

document.addEventListener('scroll', (e) => {
    var currentScrollValue = window.scrollY;
    if(lastScrollValue < currentScrollValue) {
        navbar.style.marginTop = '-4rem';
    } else {
        navbar.style.marginTop = 0;
    }
    lastScrollValue = currentScrollValue;
});

// ABOUT SECTION WORD WALL

const wordWall = document.getElementById('word-wall');

const worldWallHeight = parseFloat(getComputedStyle(wordWall).getPropertyValue('--word-wall-height').slice(0, this.length - 3));
const numberOfRows = 10;
const wordFontSize = worldWallHeight / numberOfRows;
const minAnimationTime = 5;
const maxAnimationTime = 10;

const numberOfWords = 50;

const wordsArr = ['<body>', '</body>', '<nav>', '</nav>', '<section>', '</section>', '<div>', '</div>', '<h1>Hello World</h1>', '<p>Welcome to my page</p>', '<ul>', '</ul>', '<br>', '<li>', '</li>', '<a>', '</a>', '<hr>', '<footer>', '</footer>', '<button>Contact me</button>', '<head>', '</head>', '<script>', '</script>', '<img>'];

function createWordElement() {
    let newWordElement = document.createElement('p');
    newWordElement.innerText = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    let newWordElementRow = Math.floor(Math.random() * numberOfRows);
    newWordElement.style.fontSize = `${wordFontSize}rem`;
    newWordElement.style.lineHeight = `${wordFontSize}rem`;
    newWordElement.style.top = `${newWordElementRow * wordFontSize}rem`;
    newWordElement.style.left = '-100%';
    newWordElement.style.animation = `word-wall ${minAnimationTime * 1000 + (Math.random() * (maxAnimationTime - minAnimationTime) * 1000)}ms linear infinite`;
    wordWall.append(newWordElement);
}

for (let z=0; z < numberOfWords; z++) {
    setTimeout(() => {createWordElement();}, Math.random() * maxAnimationTime * 1000);
}

// PROJECTS

const projects = document.getElementById('projects-display');
const projectsList = [];

const projectsArray = [
    {
        projectName: 'Choropleth Map',
        projectUrl: 'https://codepen.io/dawid0zz/full/oNeJqEZ',
        projectImage: '/resources/usmap.png',
        projectTools: ['HTML, CSS, Javascript', 'React.js', 'D3.js']
    },
    {
        projectName: 'Calculator',
        projectUrl: 'https://codepen.io/dawid0zz/full/bGRJzyO',
        projectImage: '/resources/calculator.png',
        projectTools: ['HTML, CSS, Javascript', 'Math.js']
    },
    {
        projectName: 'Drum Machine',
        projectUrl: 'https://codepen.io/dawid0zz/full/gORXKoV',
        projectImage: '/resources/drum.png',
        projectTools: ['HTML, CSS, Javascript']
    },
    {
        projectName: 'Product Landing Page',
        projectUrl: 'https://codepen.io/dawid0zz/full/ZEKbPza',
        projectImage: '/resources/cola.png',
        projectTools: ['HTML, CSS']
    }
];

const listLength = projectsArray.length;

function returnTools(index) {
    let htmlstring='';
    for (let j=0; j < projectsArray[index].projectTools.length; j++) {
        htmlstring+= `&bull; ${projectsArray[index].projectTools[j]}<br>`;
    }
    return htmlstring;
}

const firstFrame = document.createElement('div');
firstFrame.innerText = 'First frame';
firstFrame.classList.add('frame', 'invisible');
projectsList.push(firstFrame);

for (let i = 0; i < listLength; i++) {
    const frame = document.createElement('div');
    const card = document.createElement('div');
    const frontSide = document.createElement('div');
    const backSide = document.createElement('div');
    frontSide.style.backgroundImage = `url(${projectsArray[i].projectImage})`;
    // Fill in
    backSide.innerHTML = 
    `<div class="frame-back-left"><h5>Tools used:</h5><p>${returnTools(i)}</p></div>
    <div class="frame-back-right"><a href="${projectsArray[i].projectUrl}" target="_blank">Click here to preview</a></div>`;
    // Fill in
    frame.append(card);
    card.append(frontSide);
    card.append(backSide);
    frame.classList.add('frame');
    card.classList.add('frame-card');
    frontSide.classList.add('frame-front');
    backSide.classList.add('frame-back');
    if(i > 1) {
        frame.classList.add('transparent');
    }
    if(i == 0) {
        frame.classList.add('displaying');
    }
    if(i >= 1) {
        frame.classList.add('frame-right');
    }
    projectsList.push(frame);
}

const finalFrame = document.createElement('div');
finalFrame.innerText = 'Final frame';
finalFrame.classList.add('frame', 'invisible');
projectsList.push(finalFrame);

for (let i = 0; i < projectsList.length; i++) {
    projects.append(projectsList[i]);
}

const projectsTitle = document.getElementById('projects-title');
projectsTitle.innerText = projectsArray[0].projectName;
const projectsTitleTransitionTime = parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--displaying-transition-time').slice(0, this.length - 1)) * 1000;

let currentyDisplayed = 1;
const frameMargin = parseFloat(getComputedStyle(document.querySelector('.frame')).getPropertyValue('--margin').slice(0, this.length - 3));
const frameWidth = parseFloat(getComputedStyle(document.querySelector('.frame')).getPropertyValue('--width').slice(0, this.length - 3));
let currentMargin = frameMargin + (frameWidth + 2 * frameMargin) * (listLength - 1);
document.querySelector('.invisible:first-child').style.marginLeft = currentMargin + 'rem';
const setLeftMargin = function(newMargin) {
    document.querySelector('.invisible:first-child').style.marginLeft = newMargin + 'rem';
}

document.querySelectorAll(".projects-menu-button").forEach(element => {
    element.addEventListener('click', (e) => {
        if(e.target.id === 'projects-menu-left' && currentyDisplayed > 1) {
            currentMargin+= (frameWidth + 2 * frameMargin)*2;
            setLeftMargin(currentMargin);
            projectsList[currentyDisplayed].classList.toggle('displaying');
            projectsList[currentyDisplayed].classList.toggle('frame-right');
            projectsList[currentyDisplayed - 1].classList.toggle('frame-left');
            projectsList[currentyDisplayed - 1].classList.toggle('displaying');
            projectsList[currentyDisplayed - 2].classList.toggle('transparent');
            projectsList[currentyDisplayed + 1].classList.toggle('transparent');
            projectsTitle.style.opacity = 0;
            document.querySelectorAll('.projects-menu-button').forEach(button => {
                button.disabled = true;
            });
            setTimeout(() => {
                projectsTitle.style.opacity = 1;
                projectsTitle.innerText = projectsArray[currentyDisplayed - 1].projectName;
                document.querySelectorAll('.projects-menu-button').forEach(button => {
                    button.disabled = false;
                });
            }, projectsTitleTransitionTime / 2);
            currentyDisplayed--;
        } else if (e.target.id === 'projects-menu-right' && currentyDisplayed < projectsList.length - 2) {
            currentMargin-= (frameWidth + 2 * frameMargin)*2;
            setLeftMargin(currentMargin);
            projectsList[currentyDisplayed].classList.toggle('displaying');
            projectsList[currentyDisplayed].classList.toggle('frame-left');
            projectsList[currentyDisplayed + 1].classList.toggle('frame-right');
            projectsList[currentyDisplayed + 1].classList.toggle('displaying');
            currentyDisplayed++;
            projectsTitle.style.opacity = 0;
            document.querySelectorAll('.projects-menu-button').forEach(button => {
                button.disabled = true;
            });
            setTimeout(() => {
                projectsTitle.style.opacity = 1;
                projectsTitle.innerText = projectsArray[currentyDisplayed - 1].projectName;
                document.querySelectorAll('.projects-menu-button').forEach(button => {
                    button.disabled = false;
                });
            }, projectsTitleTransitionTime / 2);
            if(currentyDisplayed > 1) {
                projectsList[currentyDisplayed - 2].classList.toggle('transparent');
                projectsList[currentyDisplayed + 1].classList.toggle('transparent');
            }
        } else {
            return;
        }
    })
})