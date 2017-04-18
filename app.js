'use stict';

// CREATE AN ARRAY OF ALL THE POSSIBLE IMAGES
var allImages = [];
// 0
new FocusImage('R2D2 bag', 'img/bag.jpg', 'bag-img', allImages);
// 1
new FocusImage('banana slicer', 'img/banana.jpg', 'banana-img', allImages);
// 2
new FocusImage('bathroom tablet holder', 'img/bathroom.jpg', 'bathroom-img', allImages);
// 3
new FocusImage('toeless boots', 'img/boots.jpg', 'boots-img', allImages);
// 4
new FocusImage('all-in-one breakfast machine', 'img/breakfast.jpg', 'breakfast-img', allImages);
// 5
new FocusImage('meatball bubblegum', 'img/bubblegum.jpg', 'bubblegum-img', allImages);
// 6
new FocusImage('inverted chair', 'img/chair.jpg', 'chair-img', allImages);
// 7
new FocusImage('chthlhu action figure', 'img/cthulhu.jpg', 'cthulhu-img', allImages);
// 8
new FocusImage('dog duck beak', 'img/dog-duck.jpg', 'dog-duck-img', allImages);
// 9
new FocusImage('dragon meat', 'img/dragon.jpg', 'dragon-img', allImages);
// 10
new FocusImage('utensil pen caps', 'img/pen.jpg', 'pen-img', allImages);
// 11
new FocusImage('pet footie sweepers', 'img/pet-sweep.jpg', 'pet-sweep-img', allImages);
// 12
new FocusImage('pizza scissors', 'img/scissors.jpg', 'scissors-img', allImages);
// 13
new FocusImage('shark sleeping bag', 'img/shark.jpg', 'shark-img', allImages);
// 14
new FocusImage('baby onesie sweeper', 'img/sweep.png', 'sweep-img', allImages);
// 15
new FocusImage('tauntaun sleeping bag', 'img/tauntaun.jpg', 'tauntaun-img', allImages);
// 16
new FocusImage('unicorn meat', 'img/unicorn.jpg', 'unicorn-img', allImages);
// 17
new FocusImage('tentacle usb', 'img/usb.gif', 'usb-img', allImages);
// 18
new FocusImage('self-watering can', 'img/water-can.jpg', 'water-can-img', allImages);
// 1
new FocusImage('closed-top wine glass', 'img/wine-glass.jpg', 'wine-glass-img', allImages);

/**
creates an object for a image with the name, path, and id. adds to given array.
**/
function FocusImage(imageTitle, imagePath, imageId, imageArray) {
  this.imageTitle = imageTitle;
  this.imagePath = imagePath;
  this.imageId = imageId;
  this.timesClick = 0;
  this.timesShow = 0;
  imageArray.push(this);
}

/**
chooses a random index from an array
**/
function randomIndex(imageArray) {
  return Math.floor(Math.random() * imageArray.length);
}

/**
picks 3 images and returns them, no duplicates. ignores images from the previous round.
**/
function randomImages(remainingImages, previousImages) {
  var chosenIndex;
  var chosenImages = [];
  var numToChoose = 3;
  for (var i = 0; i < numToChoose; i++) {
    chosenIndex = randomIndex(remainingImages);
    chosenImages.push(remainingImages[chosenIndex]);
    remainingImages.splice(chosenIndex, 1); // removes chosen item
  }
  for (var j = 0; j < previousImages.length; j++) {
    remainingImages.push(previousImages[j]); // add back in the previous images
  }
  return chosenImages;
}

/**
sticks the chosen images in a div to print. adds event listeners to each.
**/
function renderImages(chosenImages) {
  var div = document.createElement('div');
  div.id = 'app-images';
  var image;
  var printImage;
  for (var i = 0; i < chosenImages.length; i++) {
    printImage = chosenImages[i];
    image = document.createElement('img');
    image.src = printImage.imagePath; //display the image
    image.id = printImage.imageId;
    printImage.timesShow++; //increment times shown
    image.addEventListener('click', handleImageClick);
    div.appendChild(image);
  }
  return div;
}

/**
handles a click on one of the set of images. gives another set if more rounds required, removes the listener if done.
**/
function handleImageClick(e) {
  console.log(currentRound);
  var imageId = e.target.id;
  var imageObj;
  for (var i = 0; i < allImages.length; i++) {
    if (imageId === allImages[i].imageId) {
      imageObj = allImages[i];
      i = allImages.length;
    }
  }
  imageObj.timesClick++;
  if (currentRound != maxRound) {
    previousImages = randomImages(remainingImages, previousImages);
    imageBox.removeChild(document.getElementById('app-images'));
    imageBox.appendChild(renderImages(previousImages));
  } else {
    console.log('DONE!');
    removeAllListeners();
    imageBox.appendChild(renderStatistics());
  }
  currentRound++;
}

/**
removes the click event listeners from all the images
**/
function removeAllListeners() {
  var imageElements = document.querySelectorAll('#app-images img');
  for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].removeEventListener('click', handleImageClick);
  }
}

/**
renders the times clicked for every image in a list
**/
function renderStatistics() {
  var statsList = document.createElement('ul');
  var imageStats;
  for (var i = 0; i < allImages.length; i++) {
    imageStats = document.createElement('li');
    imageStats.textContent = allImages[i].timesClick + ' votes for the ' + allImages[i].imageTitle;
    statsList.appendChild(imageStats);
  }
  return statsList;
}

/**
MAIN APPLICATION
**/

var remainingImages = allImages.slice(); // copy to leave original alone

var previousImages = [];
var maxRound = 25;
var currentRound = 1;
var imageBox = document.getElementById('app');

previousImages = randomImages(remainingImages, previousImages);
imageBox.appendChild(renderImages(previousImages));
