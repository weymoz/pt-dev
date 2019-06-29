(
  window.onload = () => {
    const buttons = document.getElementsByClassName('landing-button')

    for(const button of buttons) {
      button.addEventListener('click', function(evt) {

        evt.preventDefault();

        const readMoreDiv = this.previousElementSibling;
        const nextDiv = this.nextElementSibling;

        if(readMoreDiv.style.maxHeight) {
          this.innerText = "Далее";
          readMoreDiv.style.maxHeight = null;
          setTimeout(() => {
            this.scrollIntoView();
          }, 700);
        } else {
          readMoreDiv.style.maxHeight = readMoreDiv.scrollHeight + "px";
          this.innerText = "Закрыть";
        }
      })
    }
  }
)()
