import Image from 'next/image';

let images = ["bluesea.png", "event.png", "candyland.png", "emerald.png", "flamingo.png", "lilac.png", "mojito.png", "santorini.png", "summer.png"];
let nextImages = ["/bluesea.png", "/candyland.png", "/emerald.png", "/flamingo.png", "/lilac.png", "/mojito.png", "/santorini.png", "/summer.png"];

function getRandomInt() {
    let randomNum = Math.floor(Math.random() * nextImages.length);
    console.log("the random num", randomNum);
    console.log("the image returned", nextImages[randomNum]);
    return nextImages[randomNum];
  }

export default getRandomInt;