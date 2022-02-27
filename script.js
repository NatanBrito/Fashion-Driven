let contador = 0;
let linkImg;
let allSelect;
let nameUser;
let xx= "t-shirt";
let yy="v-neck";
let zz="silk";
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
    <div class="circle model T-shirt" onclick=" modelSelected('T-shirt','model')"> <img src="./img/models-tshirt 1.png"></div>
    <h2>T-shirt</h2>
</div>
<div class="option">
    <div class="circle model Camiseta" onclick=" modelSelected('Camiseta','model')"> <img src="./img/models-camiseta.png"></div>
    <h2>Camiseta</h2>
</div>
<div class="option">
    <div class="circle model Manga-longa" onclick=" modelSelected('Manga-longa','model')"> <img src="./img/models-manga-longa.png"></div>
    <h2>Manga longa</h2>
</div>
    `
}
function modelSelected(selected,classe) {

    removeSelect(classe);
    if (selected === "T-shirt") {
        model1();
    } else if (selected === "Camiseta") {
        model2();
    }
    else {
        model3();
    }

}
function model1() {
    const add1 = document.querySelector(".T-shirt")
    add1.classList.add("select")
}
function model2() {
    const add2 = document.querySelector(".Camiseta")
    add2.classList.add("select")
}
function model3() {
    const add3 = document.querySelector(".Manga-longa")
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
    <div class="circle collar Gola-v" onclick="collarSelected('Gola-v','collar')"> <img src="./img/golaV.png"></div>
    <h2>Gola V</h2>
</div>
<div class="option">
    <div class="circle collar Gola-redonda" onclick="collarSelected('Gola-redonda','collar')"> <img src="./img/gola-redonda.png"></div>
    <h2>Gola Redonda</h2>
</div>
<div class="option">
    <div class="circle collar Gola-polo " onclick="collarSelected('Gola-polo','collar')"> <img src="./img/polo-shirt (1) 1.png"></div>
    <h2>Gola polo</h2>
</div>
    `
}
function collarSelected(selected,classe) {
   removeSelect(classe);
    if (selected === "Gola-v") {
        collar1();
    } else if (selected === "Gola-redonda") {
        collar2();
    }
    else {
        collar3();
    }

}
function collar1() {
    const add1 = document.querySelector(".Gola-v")
    add1.classList.add("select")
}
function collar2() {
    const add1 = document.querySelector(".Gola-redonda")
    add1.classList.add("select")
}
function collar3() {
    const add1 = document.querySelector(".Gola-polo")
    add1.classList.add("select")
}
function callingMaterial() {
    const material = document.querySelector(".materials")
    material.innerHTML = `
<div class="option">
<div class="circle material Seda" onclick="materialSelected('Seda','material')"> <img class="img-seda" src="./img/silk 1.png"></div>
<h2>Seda</h2>
</div>
<div class="option">
<div class="circle material Algodao" onclick="materialSelected('Algodao','material')"> <img class="img-algodao" src="./img/organic-cotton 1.png"></div>
<h2>Algodão</h2>
</div>
<div class="option">
<div class="circle material Poliester" onclick="materialSelected('Poliester','material')"> <img class="img-poliester" src="./img/quimica 1.png"></div>
<h2>Poliéster</h2>
</div>
`
}
function materialSelected(selected,classe) {
    removeSelect(classe)
    if (selected === "Seda") {
        material1();
    } else if (selected === "Algodao") {
        material2();
    }
    else {
        material3();
    }
}
function material1() {
    const add1 = document.querySelector(".Seda")
    add1.classList.add("select")
}
function material2() {
    const add1 = document.querySelector(".Algodao")
    add1.classList.add("select")
}
function material3() {
    const add1 = document.querySelector(".Poliester")
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
    linkImg = document.querySelector(".link").value;
    allSelect = document.querySelectorAll(".select")
    if (allSelect.length === 3 && linkImg !== "") {
        const xx = document.querySelector(".btn")
        xx.classList.add("finish-button")
    } else {
        
        const zz = document.querySelector(".btn")
        zz.classList.remove("finish-button")
    }
    //só falta pensar em um jeito de vir os nomes tbm pra ir pra API
    // falta FAZER VERIFICAR se é link

}
function callingButton() {
    const buttonHtml = document.querySelector('.button')
    buttonHtml.innerHTML = `
    <button class="btn" onclick="activeButton();">Confirmar pedido</button>
    `
}
function activeButton() {
    sendShirtApi();
    setTimeout(callingShirtGet,2000)
}
function addShirt(){
    const shirtRequestHtml=document.querySelector(".models-request");
    shirtRequestHtml.innerHTML+=`
        <div class="shirt-user"><img src="${linkImg}" />
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
        <div class="shirt-user"><img src="${arquivosGet.image}" />
            <span class="user-name">
            <bold>Criador:</bold>${arquivosGet.owner}
            </span>
        </div>`
}
function sendShirtApi(){
  const sendApi= axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts",objApi)
  sendApi.then(apiSucess)
  sendApi.catch(apiError)
}
function apiSucess(){
    alert("sua camiseta foi encomendada")
}
function apiError(){
    alert("Ops, não conseguimos processar sua encomenda")
}

let objApi={
	"model": xx,
	"neck": yy,
	"material": zz,
	"image": linkImg,
	"owner": nameUser,
	"author": nameUser
}