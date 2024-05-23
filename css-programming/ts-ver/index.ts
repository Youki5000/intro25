let heading = document.getElementById('heading') as HTMLElement;
let degree = 0;

function rotateHeading(): void {
  degree = degree + 6;
  degree = degree % 360;
  if (90 <= degree && degree < 270) {
    heading.setAttribute('class', 'back');
  } else {
    heading.setAttribute('class', 'face');
  }
  heading.style.transform = `rotateX(${degree}deg)`;
}

setInterval(rotateHeading, 20);
