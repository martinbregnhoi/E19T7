let retter;
document.addEventListener("DOMContentLoaded", hentJson);
async function hentJson() {
    //hent json
  //  let jsonData = await fetch("json/menu.json");
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    
    let tempVar = await jsonData.json();
    retter = tempVar.feed.entry;
    //console.log(retter);
    visRetter(retter,"Menu");
    //find events der indeholder de valgte kategorier
    let forretter =  retter.filter(ret => ret.gsx$kategori.$t == "forretter");
    let hovedretter =  retter.filter(ret => ret.gsx$kategori.$t == "hovedretter");
    let desserter =  retter.filter(ret => ret.gsx$kategori.$t == "desserter");
    let drikkevarer =  retter.filter(ret => ret.gsx$kategori.$t == "drikkevarer");
    
//sorter retter efter kategori
    document.querySelector('#filter-alle').addEventListener("click", () => {
//        console.log(retter); 
        
        visRetter(retter,"Menu");
    });

    document.querySelector('#filter-forretter').addEventListener("click", () => {
//        console.log(forretter); 
        visRetter(forretter, "Forretter");

    });
    document.querySelector('#filter-hovedretter').addEventListener("click", () => {
        visRetter(hovedretter, "Efterretter");
    });
    document.querySelector('#filter-desserter').addEventListener("click", event => {
        visRetter(desserter, "Desserter");
    });
    document.querySelector('#filter-drikkevarer').addEventListener("click", e => {
        visRetter(drikkevarer,"Drikkevarer");
    });

}

function visRetter(retAtVise, overskrift) {
    let menuTemplate = document.querySelector("[data-template]");
    let templateModtager = document.querySelector("[data-container]");
    templateModtager.innerHTML = "";
  
    document.querySelector('[data-overskrift]').textContent = overskrift;
    //for hver ret vis dem i DOM
    retAtVise.forEach(hverRet => {
        //klon template og indsÃ¦t person
        let klon = menuTemplate.cloneNode(true).content;
        klon.querySelector("[data-navn]").textContent = hverRet.gsx$navn.$t;
       klon.querySelector("[data-kortbeskrivelse]").textContent = hverRet.gsx$kort.$t;
        klon.querySelector("[data-pris]").textContent = hverRet.gsx$pris.$t;
        klon.querySelector("[data-billede]").src=  `imgs/large/${hverRet.gsx$billede.$t}.jpg`;
        klon.querySelector("[data-ret]").setAttribute("data-id", hverRet.gsx$id.$t);
        templateModtager.appendChild(klon);
        templateModtager.lastElementChild.addEventListener("click", showSingle);
    });
}


function showSingle() {
    console.log ("SHOW SINGLE");
    let my_id = this.getAttribute("data-id");
    let single = retter.find(ret => {
       // console.log(ret.gsx$id.$t);
        if (my_id == ret.gsx$id.$t) {
//            console.log("hurra", single.id);
            document.querySelector(".popup").style.visibility = "visible";
            document.querySelector("[data-titel]").textContent = ret.navn;
            document.querySelector("[data-singleimg]").setAttribute("src", "imgs/large/" + ret.gsx$billede.$t + ".jpg")
            document.querySelector("[data-beskrivelse]").textContent = ret.langbeskrivelse;

        }

        document.querySelector(".popup button").addEventListener("click", e => {
            document.querySelector(".popup").style.visibility = "hidden";
        })

    });
}

function toggleMenu() {

    document.querySelector(".burger").classList.toggle("change");
    document.querySelector("nav").classList.toggle("show");
}

document.querySelector(".burger").addEventListener("click", toggleMenu);
document.querySelector("nav").addEventListener("click", toggleMenu);


