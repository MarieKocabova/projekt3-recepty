/* 
const detailReceptDiv = document.querySelector('.recept-detail');
const detailImg = document.querySelector('#recept-foto');
const detailTitle = document.querySelector('#recept-nazev');
const detailDescr = document.querySelector('#recept-popis');
const metaKategory = document.querySelector('#recept-kategorie');
const metaRating = document.querySelector('#recept-hodnoceni'); 
*/

const receptyList = document.querySelector('.recepty');
let receptyToDisplay = recepty;

//1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".

receptyToDisplay.forEach(getList);

function getList(ele) {
    
    let singleRecept = document.createElement('div');
        singleRecept.setAttribute ("class", "recept");
        singleRecept.setAttribute("data-receptIndex", recepty.indexOf(ele))
        singleRecept.setAttribute ("onclick", "clickOnRecept(this)");

        let thumbnail = document.createElement('div');
        thumbnail.setAttribute ("class", "recept-obrazek");

        let thumbnailImg = document.createElement('img');
        thumbnailImg.src = ele.img;

        let listTitle = document.createElement('div');
        listTitle.setAttribute ("class", "recept-info");

        let listTitleText = document.createElement('h3');
        listTitleText.innerHTML = ele.nadpis;

        listTitle.appendChild(listTitleText);
        thumbnail.appendChild(thumbnailImg);

        singleRecept.appendChild(thumbnail);
        singleRecept.appendChild(listTitle);

        receptyList.appendChild(singleRecept);
}

//2) Pri kliknutí na tlačítko Hledat by se měl seznam receptů vyfiltrovat podle hledaného slova.

let inputHledat = document.querySelector('input[id=hledat]');
inputHledat.addEventListener('change', compareString)

function compareString() {
    receptyList.innerHTML = '';
   
    for (i=0; i<recepty.length; i++) {
        let receptyLowercase = recepty[i].nadpis.toLowerCase();
        let inputLowercase = inputHledat.value.toLowerCase();
        
        if (receptyLowercase.includes(inputLowercase)) {
            receptyToDisplay = [];
            receptyToDisplay.push(recepty[i]);

            receptyToDisplay.forEach(getList);
        } 
    }     
} 

//3) Doplň filtrovanání receptů podle kategorie. asi tady: https://www.w3schools.com/jsref/event_onchange.asp

function compareCategory() {
    receptyList.innerHTML = '';
    let selectedCategory = document.getElementById("kategorie").value;
    
    for (i=0; i<recepty.length; i++) {
                        
        if (selectedCategory === recepty[i].stitek || selectedCategory === '') {
            receptyToDisplay = [];
            receptyToDisplay.push(recepty[i]);

            receptyToDisplay.forEach(getList);
        } 
    }     
}

//4) Doplň řazení receptů podle hodnocení. možná tady: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_localecompare

function sortRating() {

}

//5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu. Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie, recept-hodnoceni, recept-nazev, recept-popis.
function clickOnRecept(selected) {
    let indexSelected = selected.getAttribute("data-receptIndex")
    console.log(indexSelected)
}

//6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
