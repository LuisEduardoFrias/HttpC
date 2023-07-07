const tABody = [...document.getElementsByClassName("tx-body")];
const tANumber = [...document.getElementsByClassName("tx-number")];
const form = [...document.getElementsByClassName("form_")];
const tValueParanm = [...document.getElementsByClassName("tx-value-paranm")];
const container = [...document.getElementsByClassName("container-post")];


[...document.getElementsByClassName("text-url")]
.forEach(inp=> inp.setAttribute("readonly", "true"));

tValueParanm.forEach((input_) => {
  input_.addEventListener(
    "input",
    () => (input_.style.backgroundColor = "black")
  );
});

tABody.forEach((body_) =>
  body_.addEventListener("scroll", (e) => {
    getTANum(body_).scrollTop = body_.scrollTop;
  })
);

tABody.forEach((body_) => body_.addEventListener("keyup", (e) => {}));

const getTANum = (body) => {
  for (const ten of tANumber) {
    if (ten.id === body.id) {
      return ten;
    }
  }
};

tABody.forEach((body_) =>
  body_.addEventListener("input", (e) => {
    try {
      const parseJSON = JSON.parse(e.target.value);
      const JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);

      e.target.value = JSONInPrettyFormat;

      body_.style.color = "white";
      body_.style.backgroundColor = "black";
      getTANum(body_).style.color = "white";
      getTANum(body_).style.backgroundColor = "black";
    } catch {
      body_.style.color = "red";
      body_.style.backgroundColor = "#ffa1a1";
      getTANum(body_).style.color = "red";
      getTANum(body_).style.backgroundColor = "#ffa1a1";
    }

    let rows = body_.value.split("\n").length;
    let msj = "";
    for (let i = 0; i < rows; i++) {
      msj += i + 1 + "\n";
    }
    getTANum(body_).innerHTML = msj;
  })
);

form.forEach((form_) => {
  form_.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      let textMethod;
      let textUrl;
      let TittleParanm;
      let txBody;
      let result;
      let textStatus;
      let contenResul;
      let isfetch = true;
      let loadin;


     //Todo refactorizar

      try {
        [...form_.childNodes].forEach((ch) => {
          if (ch.className === "text-method") {
            textMethod = ch.innerHTML.replace("Method: ", "");
          } //
          else if (ch.className === "body-container") {
            [...ch.childNodes].forEach((cha) => {
              if (cha.className === "text-url") {
                textUrl = cha.value;
              } //
              else if (`${cha.className}`.search("container-paranms") !== -1) {
                [...cha.childNodes].forEach((chal) => {
                  if (chal.className === "content-tx-paranm") {
                    [...chal.childNodes].forEach((chald) => {
                      if (chald.id === "t-tittle-paranm") {
                        TittleParanm = chald.innerHTML;
                      } else if (
                        `${chald.className}`.search("tx-value-paranm") !== -1
                      ) {
                        if (chald.value.trim() === "") {
                          chald.style.backgroundColor = "#ffa1a1";

                          isfetch = false;
                        } else {
                          textUrl = textUrl.replace(
                            `:${TittleParanm}`,
                            chald.value
                          );
                        }
                      }
                    });
                  }
                });
              } else if (cha.className === "container-text-area") {
                [...cha.childNodes].forEach((chal) => {
                  if (`${chal.className}`.search("tx-body") !== -1) {
                 
                    chal.style.backgroundColor = "black"
                    getTANum(chal).style.backgroundColor = "black";
                
                    txBody = chal.value;

                    if (
                      txBody.trim() === "" ||
                      chal.style.backgroundColor === "rgb(255, 161, 161)"
                    ) {
                      if (txBody.trim() === "") {
                        chal.style.backgroundColor = "#ffa1a1";
                        getTANum(chal).style.backgroundColor = "#ffa1a1";
                      }

                      isfetch = false;
                    }
                  }
                });
              } 
              else if(cha.className === "lds-dual-ring"){
                
                [...ch.childNodes].forEach((chal_) => {
                    if (`${chal_.className}`.search("conten-result") !== -1) {
                      chal_.style.display= "none";
                    }
                });
                
                loadin = cha;
                loadin.style.display = "block";
             } else if (`${cha.className}`.search("conten-result") !== -1) {
                contenResul = cha;
                [...cha.childNodes].forEach((chal) => {
                  if (chal.className === "text-status") {
                    textStatus = chal;
                  } else if (`${chal.className}`.search("result") !== -1) {
                    result = chal;
                    result.style.backgroundColor = "black";
                  }
                });
              }
            });
          }
        });
      } catch (err) {
        alert(err);
      }

      if (!isfetch) {
        loadin.style.display = "none";
        textStatus.innerHTML = "";
        alert("se requieren algunos datos.");
      } else {
        
        fetch(textUrl, {
          method: textMethod,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: txBody,
        })
          .then((response) => {
            loadin.style.display = "none";
            contenResul.style.display = "flex";
            textStatus.innerHTML = `${response.statusText}  `;
            textStatus.innerHTML += `${response.status}`;
            contenResul.style.backgroundColor =
              response.status >= 200 && response.status < 300
                ? "rgba(0,249,4,0.762)"
                : response.status >= 300 && response.status < 400
                ? "rgba(0,46,249,0.762)"
                : response.status >= 400 && response.status < 500
                ? "rgba(249,0,0,0.762)"
                : response.status >= 500
                ? "rgba(96,96,96,0.762)"
                : "transparent";


            return response.json()
          })
          .then((data) => {
            result.innerHTML = JSON.stringify(data, undefined, 4);
          })
          .catch((err) => {
            loadin.style.display = "none";
            textStatus.innerHTML = "";
            contenResul.style.backgroundColor = "red";
            contenResul.style.display = "flex";
            result.style.backgroundColor = "rgba(249,0,0,0.762)";
            result.innerHTML =
              "Hubo un problema con la petición Fetch: " + err.message;
          });
      }
    },
    false
  )
  }
);
