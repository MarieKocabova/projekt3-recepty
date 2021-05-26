const receptyList = document.querySelector('.recepty');
let receptyToDisplay = recepty;
const vychoziRecepty = Array.from(recepty);

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
inputHledat.addEventListener('input', compareString)

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

//4) Doplň řazení receptů podle hodnocení. opsáno tady: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value

function asc (a,b) {
    if (a.hodnoceni < b.hodnoceni) {
        return -1;
    }
    if (a.hodnoceni > b.hodnoceni) {
        return 1;
    }
    return 0;
}

function desc (a,b) {
    if (a.hodnoceni > b.hodnoceni) {
        return -1;
    }
    if (a.hodnoceni < b.hodnoceni) {
        return 1;
    }
    return 0;
}

function sortRating() {
    receptyList.innerHTML = '';
    let selectedRating = document.getElementById("razeni").value;

    if (selectedRating == '') {
        receptyToDisplay = vychoziRecepty;
        receptyToDisplay.forEach(getList);
    } else {
        for (i=0; i<recepty.length; i++) {
            let sortedRecept = recepty
                            
            if (selectedRating == "1") {
                sortedRecept.sort(desc);
                receptyToDisplay = sortedRecept;
                receptyToDisplay.forEach(getList);
            } else if (selectedRating == "2") {
                sortedRecept.sort(asc);
                receptyToDisplay = sortedRecept;
                receptyToDisplay.forEach(getList);
            }
        }     
    }   
}

//5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.

function clickOnRecept(selected) {
    let indexSelected = selected.getAttribute("data-receptIndex")

    document.querySelector('#recept-foto').src = recepty[indexSelected].img;
    document.querySelector('#recept-kategorie').innerHTML = recepty[indexSelected].kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = recepty[indexSelected].hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = recepty[indexSelected].nadpis;
    document.querySelector('#recept-popis').innerHTML = recepty[indexSelected].popis;

    let receptSelected = recepty[indexSelected]
    
    localStorage.clear();
    localStorage.receptSelected = JSON.stringify(receptSelected);
}

//6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.

let receptFromLocal = JSON.parse(localStorage.receptSelected);

document.querySelector('#recept-foto').src = receptFromLocal.img;
    document.querySelector('#recept-kategorie').innerHTML = receptFromLocal.kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = receptFromLocal.hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = receptFromLocal.nadpis;
    document.querySelector('#recept-popis').innerHTML = receptFromLocal.popis;
