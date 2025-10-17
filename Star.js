function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sky = document.querySelector(".sky");
sky.style.height = `${screen.height-10}px;`;
var stars = 50;

var heights = [];
var widths = [];

for (var $ = 0; $ < stars; $++) {
    heights.push(getRandomInt(10, screen.height-10));
    widths.push(getRandomInt(10, screen.width-10));
}
for (var a = 0; a < heights.length; a++) {
    sky.innerHTML += `<div class="star" style="margin-left:${widths[a]}px;margin-top:${heights[a]}px;position:fixed;z-index:2;">&nbsp;</div>`;
}