 let retter;
        const dest = document.querySelector("#menu-container");
        const theTemplatePointer = document.querySelector("template");
        let filterRet = "alle";

        document.addEventListener("DOMContentLoaded", getJson);


        async function getJson() {
           let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    
    let tempVar = await jsonData.json();
    retter = tempVar.feed.entry;
    //console.log(retter);
        visRetter();
            addEventListenersToButtons();
        }

        function visRetter() {
            dest.innerHTML = "";
            retter.forEach(ret => {
                if (filterRet == "alle" || filterRet == ret.gsx$kategori.$t)  {
                    const theClone = theTemplatePointer.cloneNode(true).content;
                    theClone.querySelector("h2").textContent = ret.gsx$navn.$t;
                    theClone.querySelector("img").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;
                    theClone.querySelector("img").alt = ret.gsx$navn.$t;
                    theClone.querySelector("p.info").textContent = ret.gsx$kort.$t;
                    theClone.querySelector("span").textContent = ret.gsx$pris.$t;

                    dest.appendChild(theClone);
                    dest.lastElementChild.addEventListener("click", () => {
                        visSingle(ret)
                    });
                }
            })
        }

        function visSingle(ret) {

           console.log("ret", ret) ;document.querySelector(".popup").style.display = "block";
            document.querySelector(".popup button").addEventListener("click", lukSingle);
            
            document.querySelector(".popup h2").textContent = ret.gsx$navn.$t;
            document.querySelector(".popup img").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;
            document.querySelector(".popup img").alt = ret.gsx$navn.$t;
            document.querySelector(".popup details p").textContent = ret.gsx$lang.$t;
            
        }

        function lukSingle(){
            document.querySelector(".popup").style.display = "none";
        }
        
        function addEventListenersToButtons() {
            document.querySelectorAll("nav button").forEach(elm => {
                elm.addEventListener("click", filtrering);
            })
        }

        function filtrering() {
            filterRet = this.dataset.ret;
            document.querySelector("h1").textContent = this.textContent;
//            document.querySelectorAll(".filter").forEach(elm => {
//                elm.classList.remove("valgt");
//            });
//            this.classList.add("valgt");
            visRetter();
        }

document.querySelector(".burger").addEventListener("click",()=>{
    document.querySelector("nav").classList.toggle("show");
})