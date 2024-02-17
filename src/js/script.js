const input = document.querySelector("input");
const divContent = document.getElementById("showContent");
const divContentDefinitions = document.getElementById("content");
const dictionaryName = document.getElementById("name");
const dictionaryAntonyms = document.getElementById("antonyms");
const audio = document.querySelector("audio");
const buttonPlay = document.querySelector(".play");
buttonPlay.onclick = () => {
    audio.play();
};
input.onkeypress = (e) => {
  if (e.key == "Enter") {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return res;
        }
      })
      .then((res) => {
        if (!res.status) {
          res[0].meanings.forEach((element) => {
            if (element.antonyms.length > 0) {
              dictionaryAntonyms.innerHTML = "";
              let ai = 0;
              element.antonyms.forEach((e) => {
                ai++;
                if (ai <= 3) {
                  dictionaryAntonyms.innerHTML += `
                    <p>${e}</p>
                    `;
                }
              });
            } else {
              dictionaryAntonyms.innerHTML = "";
            }
            if (element.definitions.length > 0) {
              divContentDefinitions.innerHTML = "";
              divContentDefinitions.innerHTML = `<h1 class="text-white text-xl">Definitions</h1>`;
              element.definitions.forEach((e) => {
                divContentDefinitions.innerHTML += `
                <li class="pt-3 hover:text-white cursor-default transition-colors ">${e.definition}</li>
                `;
              });
            }
          });
          //
          dictionaryName.innerHTML = input.value;
          dictionaryName.href = res[0].sourceUrls[0];
          dictionaryName.title = input.value;
          console.log(res[0].phonetics);
          if (res[0].phonetics.length > 0) {
            if (res[0].phonetics[0].audio) {
              audio.src = res[0].phonetics[0].audio;
            } else if ((audio.src = res[0].phonetics[1].audio)) {
              audio.src = res[0].phonetics[1].audio;
            }else if((audio.src = res[0].phonetics[2].audio)){
              (audio.src = res[0].phonetics[2].audio)
            }
          } else {
            audio.src = "";
          }
          input.value = "";
          if (divContent.classList.contains("hidden")) {
            divContent.classList.remove("hidden");
            divContent.classList.add("flex");
          }
        } else {
          document.getElementById("content").innerHTML = "No Definitions Found";
        }
      });
  }
};
