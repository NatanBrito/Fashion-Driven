let contador = 0;
let allSelect;
let nameUser;
let numberId;
callingModels();
callingCollars();
callingMaterial();
callingInput();
callingButton();
callingShirtGet();
idUser();
function idUser() {
    nameUser = prompt("Qual é o seu nome??");
    if (nameUser === '') {
        alert("escreva um nome válido")
        idUser();
    }
}
function callingModels() {
    const models = document.querySelector(".models")
    models.innerHTML = `
    <div class="option">
    <div class="circle model t-shirt" onclick=" modelSelected('t-shirt','model')"> <img src="./img/models-tshirt 1.png"></div>
    <h2>T-shirt</h2>
</div>
<div class="option">
    <div class="circle model top-tank" onclick=" modelSelected('top-tank','model')"> <img src="./img/models-camiseta.png"></div>
    <h2>Camiseta</h2>
</div>
<div class="option">
    <div class="circle model long" onclick=" modelSelected('long','model')"> <img src="./img/models-manga-longa.png"></div>
    <h2>Manga longa</h2>
</div>
    `
}
function modelSelected(selected, classe) {
    shirtOrder.model = selected;
    removeSelect(classe);
    if (selected === "t-shirt") {
        model1();
    } else if (selected === "top-tank") {
        model2();
    }
    else {
        model3();
    }

}
function model1() {
    const add1 = document.querySelector(".t-shirt")
    add1.classList.add("select")
}
function model2() {
    const add2 = document.querySelector(".top-tank")
    add2.classList.add("select")
}
function model3() {
    const add3 = document.querySelector(".long")
    add3.classList.add("select")
}
function removeSelect(classe) {
    const remove = document.querySelectorAll("." + classe);
    for (let i = 0; i < remove.length; i++) {
        remove[i].classList.remove("select")
    }
}
function callingCollars() {
    const collars = document.querySelector(".collars")
    collars.innerHTML = `
    <div class="option">
    <div class="circle collar v-neck" onclick="collarSelected('v-neck','collar')"> <img src="./img/golaV.png"></div>
    <h2>Gola V</h2>
</div>
<div class="option">
    <div class="circle collar round" onclick="collarSelected('round','collar')"> <img src="./img/gola-redonda.png"></div>
    <h2>Gola Redonda</h2>
</div>
<div class="option">
    <div class="circle collar polo " onclick="collarSelected('polo','collar')"> <img src="./img/polo-shirt (1) 1.png"></div>
    <h2>Gola polo</h2>
</div>
    `
}
function collarSelected(selected, classe) {
    shirtOrder.neck = selected;
    removeSelect(classe);
    if (selected === "v-neck") {
        collar1();
    } else if (selected === "round") {
        collar2();
    }
    else {
        collar3();
    }

}
function collar1() {
    const add1 = document.querySelector(".v-neck")
    add1.classList.add("select")
}
function collar2() {
    const add1 = document.querySelector(".round")
    add1.classList.add("select")
}
function collar3() {
    const add1 = document.querySelector(".polo")
    add1.classList.add("select")
}
function callingMaterial() {
    const material = document.querySelector(".materials")
    material.innerHTML = `
<div class="option">
<div class="circle material silk" onclick="materialSelected('silk','material')"> <img class="img-seda" src="./img/silk 1.png"></div>
<h2>Seda</h2>
</div>
<div class="option">
<div class="circle material cotton" onclick="materialSelected('cotton','material')"> <img class="img-algodao" src="./img/organic-cotton 1.png"></div>
<h2>Algodão</h2>
</div>
<div class="option">
<div class="circle material polyester" onclick="materialSelected('polyester','material')"> <img class="img-poliester" src="./img/quimica 1.png"></div>
<h2>Poliéster</h2>
</div>
`
}
function materialSelected(selected, classe) {
    shirtOrder.material = selected;
    removeSelect(classe)
    if (selected === "silk") {
        material1();
    } else if (selected === "cotton") {
        material2();
    }
    else {
        material3();
    }
}
function material1() {
    const add1 = document.querySelector(".silk")
    add1.classList.add("select")
}
function material2() {
    const add1 = document.querySelector(".cotton")
    add1.classList.add("select")
}
function material3() {
    const add1 = document.querySelector(".polyester")
    add1.classList.add("select")
}
function callingInput() {
    const inputHtml = document.querySelector(".input")
    inputHtml.innerHTML = `
    <input class="link" type="url" placeholder="  Insira o link"></input>
    `
}
setInterval(check, 20)
function check() {
    shirtOrder.image = document.querySelector(".link").value;
    allSelect = document.querySelectorAll(".select")
    if (allSelect.length === 3 && shirtOrder.image !== "") {
        const onclickAdd = document.querySelector(".btn")
        onclickAdd.classList.add("finish-button")
        idBtn.removeAttribute('disabled');
    } else {
        idBtn.setAttribute('disabled', 'disabled')
        const onclickRemove = document.querySelector(".btn")
        onclickRemove.classList.remove("finish-button")
    }
}
function callingButton() {
    const buttonHtml = document.querySelector('.button')
    buttonHtml.innerHTML = `
    <button id="idBtn" class="btn" disabled="disabled" onclick="activeButton();">Confirmar pedido</button>
    `
}
function activeButton() {
    sendShirtApi();
    setTimeout(callingShirtGet, 500)
    setTimeout(removeShirts, 500)
    setTimeout(removeRemove,700)
}
function removeRemove(){
    const remove = document.querySelectorAll(".select");
    for (let i = 0; i < remove.length; i++) {
        remove[i].classList.remove("select")
    }
}
function addShirt() {
    const shirtRequestHtml = document.querySelector(".models-request");
    shirtRequestHtml.innerHTML += `
        <div class="shirt-user"><img src="${shirtOrder.image}" />
            <span class="user-name">
            <bold>Criador:</bold>${nameUser}
            </span>
        </div>`
}
function callingShirtGet() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    promise.then(renderShirt)
    promise.catch(bad)
}
function bad() {
    alert("algo deu errado, reiniciaremos a pagina...")
    document.location.reload(true);
}
function renderShirt(arquivosGet) {
    let data = arquivosGet.data
    data.forEach(renderGetShirt)
}
function renderGetShirt(arquivosGet) {
    const shirtRequestHtml = document.querySelector(".models-request");
    shirtRequestHtml.innerHTML += `
        <div class="shirt-user" id="${arquivosGet.id}" onclick="shirtConfirm(${arquivosGet.id})"><img src="${arquivosGet.image}" />
            <span class="user-name">
            <bold>Criador:</bold>${arquivosGet.owner}
            </span>
        </div>`
}
let shirtOrder = {
    model: ``,
    neck: ``,
    material: ``,
    image: ``,
    owner: `${nameUser}`,
    author: `${nameUser}`
}
function sendShirtApi() {
    const sendApi = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", shirtOrder)
    sendApi.then(apiSucess)
    sendApi.catch(apiError)
}
function apiSucess() {
    alert("sua camiseta foi encomendada")
}
function apiError() {
    alert("Ops, não conseguimos processar sua encomenda")
}
function removeShirts() {
    const shirtRequestHtml = document.querySelectorAll(".shirt-user");
    if (shirtRequestHtml.length > 10) { }
    for (let i = 0; i < shirtRequestHtml.length; i++) {
        const shirtRequestHtml = document.querySelector(".models-request");
        shirtRequestHtml.innerHTML = `
            <div class="shirt-user" id= onclick="confirm()">
                <span class="user-name">
                <bold></bold>
                </span>
            </div>`
    }
}
function shirtConfirm(id) {
    let guardandoId = id
    let orderConfirm = confirm("deseja realmente comprar essa blusa??");
    if (orderConfirm === true) {
        getUserShirtRequest(id)
    }
}
function getUserShirtRequest(userId) {
    const shirtPromise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    shirtPromise.then(goodGood)
    shirtPromise.catch(badBad)
    numberId = userId;
}
function goodGood(info) {
    const infoData = info.data
    const filterId = infoData.filter(item => item.id === numberId)
    sendApiUserShirt(filterId)
}
function badBad() {
    alert("algo inesperado aconteceu..., atualizaremos a página :)")
    document.location.reload(true);
}
function sendApiUserShirt(shirt) {
    let shirtUserApi = {
        model: `${shirt[0].model}`,
        neck: `${shirt[0].neck}`,
        material: `${shirt[0].material}`,
        image: `${shirt[0].image}`,
        owner: `${shirt[0].owner}`,
        author: `${shirt[0].owner}`
    }
    const sendUserApi = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", shirtUserApi)
    sendUserApi.then(apiUserSucess)
    sendUserApi.catch(apiUserError)
}
function apiUserSucess() {
    alert("sua camiseta foi encomendada, obrigado pela preferencia :)")
    callingShirtGet();
    removeShirts();
}
function apiUserError() {
    alert("não conseguimos encomendar sua camiseta :(, tente criar uma... :)")
}