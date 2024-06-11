// Prends tout les éléments requis
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector("input + div"); // Liste des suggestions
const icon = searchWrapper.querySelector("input+div+div"); // icon
let lienTag = searchWrapper.querySelector(".search-input > a"); // Lien vers la page
let page;

// Si l'utilisateur n'appuie pas sur la suggestions
inputBox.onkeyup = (e) => {
    let userData = e.target.value; //Valeur de l'entrée de l'utilisateur
    let listeVide = [];
    if (userData) {
        icon.onclick = () => {
            page = `#`;
            // Attribue à la page si le nom est exactement le même
            for (let id = 0; id < suggestions.length; id++) {
                if (suggestions[id].serie === userData) {
                    page = suggestions[id].lien;
                }
            }
            lienTag.setAttribute("href", page);
            lienTag.click();
        };
        listeVide = suggestions.filter((data) => {
            //filtre tout les suggestions contenant l'entrée de l'utilisateur
            return data.serie
                .toLocaleLowerCase()
                .includes(userData.toLocaleLowerCase());
        });
        listeVide = listeVide.map((data) => {
            // Insert la suggestion
            return (data = `<li>${data.serie}</li>`);
        });
        searchWrapper.classList.add("active"); //afficher la boîte d'auto-completation
        afficheSuggestions(listeVide);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //Ajoute sur un clic un attribue dans tout les <li>
            allList[i].setAttribute("onclick", "select(this)");
        }
    } else {
        searchWrapper.classList.remove("active"); //afficher la boîte d'auto-completation
    }
};

function select(element) {
    let lienPage;
    let indice;
    // parcours les suggetions et attribue le lien de la page
    for (let id = 0; id < suggestions.length; id++) {
        if (suggestions[id].serie === element.textContent) {
            lienPage = suggestions[id].lien;
            indice = id;
        }
    }
    inputBox.value = suggestions[indice].serie;
    icon.onclick = () => {
        lienTag.setAttribute("href", lienPage);
        lienTag.click();
    };
    searchWrapper.classList.remove("active");
}

function afficheSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join("");
    }
    suggBox.innerHTML = listData;
}

function togglePopup() {
    let popup = document.querySelector("#overlay");
    popup.classList.remove("open");
}

function detailSaison(Class, balise, indice) {
    const blockSeries = document.querySelector(Class);
    const listeSerie = blockSeries.querySelectorAll(balise);

    const destination = "ouvert";

    listeSerie.forEach(element => {
        if (element.classList.contains(destination)) {
            element.classList.remove(destination);
        }
    });

    let compteur = 0;
    listeSerie.forEach(element => {
        if (indice == compteur) {
            element.classList.add(destination);
        }
        compteur++;
    });
}
