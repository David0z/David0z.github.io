const navbar = document.getElementById('navbar');

// NAVBAR EVENT LISTENER

let lastScrollValue = 0;

document.addEventListener('scroll', (e) => {
    var currentScrollValue = window.scrollY;
    if(lastScrollValue < currentScrollValue) {
        navbar.style.marginTop = '-14rem';
    } else {
        navbar.style.marginTop = 0;
    }
    lastScrollValue = currentScrollValue;
});

// ABOUT SECTION WORD WALL

const wordWall = document.getElementById('word-wall');
const worldWallHeight = 100;
// default 10
const numberOfRows = 10; 
const wordFontSize = worldWallHeight / numberOfRows;
// default 5
const minAnimationTime = 5;
// default 10
const maxAnimationTime = 10;
// default 0.1
const minOpacity = 0.1;
// default 0.5
const maxOpacity = 0.5;
// default 50
const numberOfWords = 50;

const wordsArr = ['<body>', '</body>', '<nav>', '</nav>', '<section>', '</section>', '<div>', '</div>', '<h1>Hello World</h1>', '<p>Welcome to my page</p>', '<ul>', '</ul>', '<br>', '<li>', '</li>', '<a>', '</a>', '<hr>', '<footer>', '</footer>', '<button>Contact me</button>', '<head>', '</head>', '<script>', '</script>', '<img>'];

let wordWallRows = [];
let animationTime = [];

for (let r = 0; r < numberOfRows; r++) {
    wordWallRows.push([]);
    animationTime.push([]);
}

function createWordElement() {
    let newWordElement = document.createElement('p');
    newWordElement.innerText = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    let newWordElementRow = Math.floor(Math.random() * numberOfRows);
    let fontAndLineHeight = `${wordFontSize / 2}vw`;
    newWordElement.style.fontSize = fontAndLineHeight;
    newWordElement.style.lineHeight = fontAndLineHeight;
    newWordElement.style.top = `${newWordElementRow * wordFontSize}%`;
    newWordElement.style.left = '-100%';
    newWordElement.style.opacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
    let newAnimationTime = minAnimationTime * 1000 + (Math.random() * (maxAnimationTime - minAnimationTime) * 1000);
    animationTime[newWordElementRow].push(newAnimationTime);
    wordWallRows[newWordElementRow].push(newWordElement);
}

for (let z=0; z < numberOfWords; z++) {
    createWordElement();
}

let sortedWordWallRows = [];
let sortedAnimationTime = [];

for (let z=0; z < wordWallRows.length; z++) {
    let newRow = wordWallRows[z].sort((a, b) => {return a.style.opacity - b.style.opacity});
    sortedWordWallRows.push(newRow);
    let newAnimationRow = animationTime[z].sort((a, b) => {return b - a});
    sortedAnimationTime.push(newAnimationRow);
}

for (let z=0; z < sortedWordWallRows.length; z++) {
    for (let y=0; y < sortedWordWallRows[z].length; y++) {
        sortedWordWallRows[z][y].style.animation = `word-wall ${sortedAnimationTime[z][y]}ms  ${Math.random() * maxAnimationTime * 1000}ms linear infinite`;
        wordWall.append(sortedWordWallRows[z][y]);
    }
}

// PROJECTS

const projects = document.getElementById('projects-display');
const projectsList = [];

const projectsArray = [
    {
        projectName: 'Image Gallery',
        projectUrl: 'https://david0z.github.io/image-gallery/',
        projectImage: '/resources/image_gallery.png',
        projectTools: ['React.js', 'styled-components', 'react-icons', 'uuid', 'react-masonry-css', 'react-intersection-observer', 'framer-motion']
    },
    {
        projectName: 'Audio Playlist',
        projectUrl: 'https://david0z.github.io/sound-playlist/',
        projectImage: '/resources/playlist_app.png',
        projectTools: ['React.js, SCSS', 'react-beautiful-dnd', 'react-icons', 'uuid']
    },
    {
        projectName: 'Choropleth Map',
        projectUrl: 'https://david0z.github.io/choropleth-map/',
        projectImage: '/resources/usmap.png',
        projectTools: ['HTML, CSS, Javascript', 'React.js', 'D3.js']
    },
    {
        projectName: 'Calculator',
        projectUrl: 'https://david0z.github.io/calculator/',
        projectImage: '/resources/calculator.png',
        projectTools: ['HTML, CSS, Javascript', 'Math.js']
    },
    {
        projectName: 'Drum Machine',
        projectUrl: 'https://david0z.github.io/sound-machine/',
        projectImage: '/resources/drum.png',
        projectTools: ['HTML, CSS, Javascript']
    },
    {
        projectName: 'Product Landing Page',
        projectUrl: 'https://david0z.github.io/product-landing-page/',
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

// INTERSECTION OBSERVERS

// section header observer
const sectionHeaderParent = document.querySelectorAll(".section-title");

const sectionHeaderObserver = new IntersectionObserver (
    entries => {
        entries.forEach(entry => {
            entry.target.querySelector('.section-header').classList.toggle('show', entry.isIntersecting);
        });
    },
    {
        threshold: 1
    }
);

sectionHeaderParent.forEach(header => {
    sectionHeaderObserver.observe(header);
});

// contact menu observer
const contactMenu = document.querySelector("#contact-menu");

const contactButtonObserver = new IntersectionObserver (
    entries => {
        entries.forEach(entry => {
            entry.target.querySelectorAll('a').forEach(button => {
                button.classList.toggle('show', entry.isIntersecting);
            });
        });
    },
    {
        threshold: 0.9
    }
);

contactButtonObserver.observe(contactMenu);

const projectsDiv = document.getElementById('projects');

const projectsDivObserver = new IntersectionObserver (
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    },
    {
        threshold: 0.5
    }
);

projectsDivObserver.observe(projectsDiv);