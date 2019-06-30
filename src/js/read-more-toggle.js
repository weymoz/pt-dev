function toggleReadMore(evt) {

  //this = current button, should be set in html
  //like this: return toggleReadMore.call(this, event)

  evt.preventDefault();

  //get div to open/close
  const readMoreDiv = this.previousElementSibling;

  //get the div to scroll to when closed
  const nextDiv = this.nextElementSibling;

  //if div is open ...
  if(readMoreDiv.style.maxHeight) {
    this.innerText = "Далее";
    readMoreDiv.style.maxHeight = null;

    //wait untill css animation allmost stopped and then scroll
    setTimeout(this.scrollIntoView.bind(this), 500);
  } 

  //if div is closed ... 
  else {
    readMoreDiv.style.maxHeight = readMoreDiv.scrollHeight + "px";
    this.innerText = "Закрыть";
  }
} 
