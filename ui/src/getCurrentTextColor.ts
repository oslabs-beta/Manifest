
//returns a rgb value string i.e. 'rgb(0,0,0)' that represents the current color of the text based on light/dark mode set by docker desktop. 

  const bodyElement: HTMLElement = document.body;
  const compStyles: CSSStyleDeclaration = window.getComputedStyle(bodyElement);
  const currentTextColor: string = compStyles.getPropertyValue('color');


// console.log('body Element:', bodyElement);
export { currentTextColor }