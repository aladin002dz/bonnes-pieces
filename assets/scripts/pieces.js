import { addListenerAvis } from "./avis.js";


// const productsFile = "../../pieces-autos.json";
const productsFile = './api/pieces-autos.json';

//Fetching Datas
async function getDatas(dataFile) {

    const response = await fetch(dataFile);
    const datas = await response.json();

    return datas;
}

//Create Data Array
let dataSet = [];

//Get Data Fecth in DataSet to display datas
async function initProducts(dataFile) {

    dataSet = await getDatas(dataFile);

    //Display All of Datas
    displayProductDatas(dataSet);
    // displayProductDatas(dataSet.pieces);

    return dataSet;

}

initProducts(productsFile);

//Ordered BY Price
const orderedByPrice = document.querySelector('.btn-order-price');
orderedByPrice.addEventListener('click', (e) => {

    // orderedPrice(dataSet);

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML = '';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter}`;

    console.log(dataSet);

    //Display datas with function who ordered datas
    displayProductDatas(orderedPrice(dataSet));

}, { once: true });



//Desordered BY Price
const desorderedByPrice = document.querySelector('.btn-desorder-price');
desorderedByPrice.addEventListener('click', (e) => {

    // desorderedPrice(dataSet);

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML = '';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter}`;

    displayProductDatas(desorderedPrice(dataSet));

}, { once: true });


//Filtered BY Price
const filteredUnderPrice = document.querySelector('.btn-filter-price');
filteredUnderPrice.addEventListener('click', (e) => {

    // filteredPrice(dataSet);

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML = '';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter}`;

    displayProductDatas(filteredPrice(dataSet));

}, { once: true });


// Filtered BY Desc
const filteredByDesc = document.querySelector('.btn-get-desc');
filteredByDesc.addEventListener('click', (e) => {

    // filteredDesc(dataSet);

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML = '';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter}`;

    displayProductDatas(filteredDesc(dataSet));

}, { once: true });


// Filtered BY Stock
const filteredByStock = document.querySelector('.btn-get-stock');
filteredByStock.addEventListener('click', (e) => {

    // filteredStock(dataSet);

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML = '';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter}`;

    displayProductDatas(filteredStock(dataSet));

}, { once: true });

//Range Filtered

const filteredByRange = document.querySelector('#ranged');
filteredByRange.addEventListener('change', (e) => {

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML = '';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter} : <= ${e.target.value} euros`;

    displayProductDatas(filteredPriceByRange(dataSet, e.target.value));

});


const productByPrice = document.querySelector('.btn-filter-price');

productByPrice.addEventListener('click', (e) => {

    e.target.classList.add('active');

    // Create SubArray Of Simple Data of Main DataSet
    const getNameData = dataSet.map((dataElement) => {
        return dataElement.nom;
    });
    // console.log('get Name of Data =>',getNameData);


    // const getPriceData = dataSet.map((dataElement) => {

    //     return dataElement.description;

    // });

    // console.log(getPriceData);


    //Get Array of Product < 35 euros
    let targetPrice = 35;

    getProductByLowerPrice(dataSet, getNameData, targetPrice);

    displayProductByLowerPrice(getNameData);

    document.querySelector('.displayed-datas').innerHTML = '';

}, { once: true });


const productByDispo = document.querySelector('.btn-get-stock');

productByDispo.addEventListener('click', (e) => {

    e.target.classList.add('active');


    // Create SubArray Of Simple Data of Main DataSet
    const getNameData = dataSet.map(dataElement => dataElement.nom);
    const getPriceData = dataSet.map(dataElement => dataElement.prix);
    const getDescData = dataSet.map(dataElement => dataElement.description);

    console.log('Data Before Actions =>', getNameData, getPriceData, getDescData);


    getProductAvailable(dataSet, getNameData, getPriceData, getDescData);

    // Arrays
    let productNameAvailable = getNameData;
    let productPriceAvailable = getPriceData;
    let productDescAvailable = getDescData;

    displayProductAvailable(productNameAvailable, productPriceAvailable, productDescAvailable);

    console.log('Data After Actions =>', productNameAvailable, productPriceAvailable, productDescAvailable);

}, { once: true });






// FUNCTIONS
// Get Set Display Datas Products
async function displayProductDatas(dataElement) {

    //Display in Console datas
    // console.log('ALL of datas =>',dataElement);

    for (const data in dataElement) {

        let dataWrapper = document.createElement('article');
        let dataName = document.createElement('h2');
        let dataImg = document.createElement('img');
        let dataPrice = document.createElement('span');
        let dataDesc = document.createElement('p');
        let dataDispo = document.createElement('div');
        let dataCat = document.createElement('span');
        let dataAvisBtn = document.createElement('button');


        //Afficher les infos des objects dans le tableau retour de données
        const objectData = dataElement[data];

        // Set Datas
        dataWrapper.classList.add('product');
        dataWrapper.setAttribute('data-id', `${objectData.id}`);

        dataName.classList.add('product_name');
        dataName.textContent = `${objectData.nom}`;

        dataPrice.classList.add('product_price');
        dataPrice.textContent = `Prix: ${objectData.prix} ${objectData.prix < 35 ? "$" : "$$$"}`;

        dataImg.classList.add('product_img');
        dataImg.setAttribute('src', `${objectData.image}`);

        dataDesc.classList.add('product_desc');
        dataDesc.textContent = `${objectData.description ?? " ❌ pas de description produit"}`;

        dataDispo.classList.add('product_avail');
        dataDispo.textContent = `${objectData.disponibilite === true ? 'En stock' : 'En rupture de stock'}`;
        dataDispo.dataset.available = `${objectData.disponibilite === true ? 'on' : 'off'}`;

        dataCat.classList.add('product_cat');
        dataCat.textContent = `${objectData.categorie ?? '❌ pas de catégorie'}`;

        dataAvisBtn.classList.add('btn', 'btn-avis');
        dataAvisBtn.textContent = `Afficher les avis`;

        // dataAvis.classList.add('product_avis');

        // Push Datas in DOM
        dataWrapper.append(dataCat, dataImg, dataName, dataDesc, dataPrice, dataDispo, dataAvisBtn);

        //Push Global Datas
        document.querySelector('.displayed-datas').append(dataWrapper);
    }

    //Import de la fonction Click on Btn-Avis
    addListenerAvis();

}

// Funny Display of Datas on DOM
function eventDisplayDatas(eventName, targetEvent, datas) {

    document.querySelector(`${targetEvent}`).addEventListener(`${eventName}`, (e) => {

        displayProductDatas(datas);

    }, { once: true });

}

function orderedPrice(dataElement) {

    let copyOfdataElement = Array.from(dataElement);

    copyOfdataElement.sort((a, b) => {

        //  Have to check how create an sub function of this with integration of prop (price) of Data
        return a.prix - b.prix;

    });

    // console.log('initial Data =>', dataElement);
    // console.log('Ordered Data Price =>', copyOfdataElement);

    return copyOfdataElement;
}

function desorderedPrice(dataElement) {

    let copyOfdataElement = Array.from(dataElement);

    copyOfdataElement.sort((a, b) => {

        //  Have to check how create an sub function of this with integration of prop (price) of Data
        return b.prix - a.prix;

    });

    // console.log('initial Data =>', dataElement);
    // console.log('Desordered Data Price =>', copyOfdataElement);

    return copyOfdataElement;
}

function filteredPrice(dataElement) {


    let dataFiltered = dataElement.filter((data) => {

        return data.prix <= 35;

    });

    // console.log('initial Data =>', dataElement);
    // console.log('Filtered Data Price =>', dataFiltered);

    return dataFiltered;
}

function filteredDesc(dataElement) {

    let dataDescFiltered = dataElement.filter((data) => {

        return data.description;

    });

    // console.log('Filtered Data Desc =>',dataDescFiltered);

    return dataDescFiltered;

}

function filteredStock(dataElement) {

    let dataStockFiltered = dataElement.filter((data) => {

        return data.disponibilite;

    });

    // console.log('Filtered Data Stock =>',dataStockFiltered);

    return dataStockFiltered;
}

function filteredPriceByRange(dataElement, priceRange) {

    let dataPriceByRange = dataElement.filter((data) => {

        return data.prix <= priceRange;

    })

    // console.log('Filtered Data Price by range =>',dataPriceByRange);

    return dataPriceByRange;
}

function getProductByLowerPrice(dataElement, subArrayOfData, priceCondition) {

    // Looping on element
    for (let i = dataElement.length - 1; i >= 0; i--) {

        // Price Condition
        if (dataElement[i].prix > priceCondition) {

            console.log(`prix trop élevé (> ${priceCondition} euros) pour l'élèment index = ${i} =>`, dataElement[i].nom);

            //Remove items in Array of Product Name 
            subArrayOfData.splice(i, 1);

        }
    }


    // Exemple for Falsy Result with Array Parse by the beginning
    //     for (let i= 0; i < dataElement.length ; i++ ){

    //         if (dataSet[i].prix < 35) {
    //                 console.log(`prix trop élevé pour l'élèment index = ${i} =>`, dataElement[i].nom);


    //                 getNameData.splice(i,1);
    //             }
    // }

}

function displayProductByLowerPrice(subArrayOfData) {

    //Create Element Wrapper
    const productListSlicedByPrice = document.createElement('list-product');
    productListSlicedByPrice.classList.add('list-filtered');


    for (let i = 0; i < subArrayOfData.length; i++) {

        const productItemSlicedByPrice = document.createElement('item-product');
        productItemSlicedByPrice.classList.add('item-filtered');

        const productNameSlicedByPrice = document.createElement('div');
        productNameSlicedByPrice.textContent = `${subArrayOfData[i]}`;


        //FULL LI
        productItemSlicedByPrice.append(productNameSlicedByPrice);

        //FULL UL
        productListSlicedByPrice.append(productItemSlicedByPrice);
    }

    // Add Datas in DOM target Area
    document.querySelector('.filter-name').append(productListSlicedByPrice);
}

function getProductAvailable(dataElement, subArrayName, subArrayPrice, subArrayDesc) {

    // Looping on element
    for (let i = dataElement.length - 1; i >= 0; i--) {

        // Price Condition
        if (dataElement[i].disponibilite === false) {

            //Remove items in Arrays of Product
            subArrayName.splice(i, 1);
            subArrayPrice.splice(i, 1);
            subArrayDesc.splice(i, 1);
        }

    }

    //Get New Array of datas because splitted before

    // Methode 1
    // let productNameAvailable = subArrayName;
    // let productPriceAvailable = subArrayPrice;
    // let productDescAvailable = subArrayDesc;

    // return productNameAvailable,productPriceAvailable,productDescAvailable;

    return subArrayName, subArrayPrice, subArrayDesc;
}

function displayProductAvailable(subArrayName, SubArrayPrice, SubArrayDesc) {

    //Create Element Wrapper
    const productListAvailable = document.createElement('ul');
    productListAvailable.classList.add('list-filtered');

    for (let i = 0; i < subArrayName.length; i++) {

        const productItemAvailable = document.createElement('li');
        productItemAvailable.classList.add('item-filtered');

        productItemAvailable.textContent = `${subArrayName[i]} -- ${SubArrayPrice[i]}euros -- ${SubArrayDesc[i] ?? 'pas de description'}`;

        //FULL UL
        productListAvailable.append(productItemAvailable);
    }

    // Add Datas in DOM target Area
    document.querySelector('.filter-name').append(productListAvailable);

}


