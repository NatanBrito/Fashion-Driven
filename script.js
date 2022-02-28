let contador = 0;
let linkImg;
let allSelect;
let nameUser;
let xx= "t-shirt";
let yy= "v-neck";
let zz= "silk";
let Model;
let Collar;
let Material;
callingModels();
callingCollars();
callingMaterial();
callingInput();
callingButton();
callingShirtGet();
idUser();
function idUser(){
nameUser= prompt("Qual é o seu nome??");
if(nameUser===''){
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
function modelSelected(selected,classe) {
    shirtOrder.model=selected;
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
    const remove = document.querySelectorAll("."+classe);
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
function collarSelected(selected,classe) {
    shirtOrder.neck=selected;
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
function materialSelected(selected,classe) {
    shirtOrder.material=selected;
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
    if (allSelect.length === 3 &&  shirtOrder.image !== "") {
        const xx = document.querySelector(".btn")
        xx.classList.add("finish-button")
        idBtn.removeAttribute('disabled');
    } else {
        idBtn.setAttribute('disabled','disabled')
        const zz = document.querySelector(".btn")
        zz.classList.remove("finish-button")
    }
    //só falta pensar em um jeito de vir os nomes tbm pra ir pra API
    // falta FAZER VERIFICAR se é link

}
function callingButton() {
    const buttonHtml = document.querySelector('.button')
    buttonHtml.innerHTML = `
    <button id="idBtn" class="btn" disabled="disabled" onclick="activeButton();">Confirmar pedido</button>
    `
}
function activeButton() {
    sendShirtApi();
    setTimeout(callingShirtGet,2000)
    console.log(shirtOrder)
}
function addShirt(){
    const shirtRequestHtml=document.querySelector(".models-request");
    shirtRequestHtml.innerHTML+=`
        <div class="shirt-user"><img src="${ shirtOrder.image}" />
            <span class="user-name">
            <bold>Criador:</bold>${nameUser}
            </span>
        </div>`
}

function callingShirtGet(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
promise.then(renderShirt)
promise.catch(bad)
}
function bad(){
    alert("algo deu errado, reiniciaremos a pagina...")
    document.location.reload(true);
}
function renderShirt(arquivosGet){
    let  data=arquivosGet.data
    console.log(data);
    data.forEach(renderGetShirt)
}
function renderGetShirt(arquivosGet){
    const shirtRequestHtml=document.querySelector(".models-request");
    shirtRequestHtml.innerHTML+=`
        <div class="shirt-user" id=${arquivosGet.id} onclick="confirm(${arquivosGet.id})"><img src="${arquivosGet.image}" />
            <span class="user-name">
            <bold>Criador:</bold>${arquivosGet.owner}
            </span>
        </div>`
}
function confirm(idShirt){
    console.log(idShirt)
   confirm("voce deseja encomendar uma igual ??")
   // ta disparando em loop infinito
}
let shirtOrder={
	model: ``,
	neck: ``,
	material: ``,
	image: ``,
	owner: `${nameUser}`,
	author: `${nameUser}`
}
function sendShirtApi(){
const sendApi= axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", shirtOrder)
sendApi.then(apiSucess)
sendApi.catch(apiError)
}
function apiSucess(){
    alert("sua camiseta foi encomendada")
}
function apiError(){
    alert("Ops, não conseguimos processar sua encomenda")
}