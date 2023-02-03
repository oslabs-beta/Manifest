
//returns a rgb value string i.e. 'rgb(0,0,0)' that represents the current color of the text based on light/dark mode set by docker desktop. 
const getCurrentTextColor = () => {
  const bodyElement = document.body;
  const compStyles = window.getComputedStyle(bodyElement);
  return compStyles.getPropertyValue('color');

}
// console.log('body Element:', bodyElement);
export { getCurrentTextColor }