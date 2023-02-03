
//returns a rgb value string i.e. 'rgb(0,0,0)' that represents the current color of the text based on light/dark mode set by docker desktop. 

  const bodyElement = document.body;
  const compStyles = window.getComputedStyle(bodyElement);
  const currentTextColor = compStyles.getPropertyValue('color');


// console.log('body Element:', bodyElement);
export { currentTextColor }