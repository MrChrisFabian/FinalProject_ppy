

// Variables para la racha
const BOTON = document.getElementById('boton');
const INBOTON = document.getElementById('inicioBoton');
const TEXT = document.getElementById('Contador');
const MSG = document.getElementById('msgFinal');

//variables para lista de cosas 
const INPUTLISTA = document.getElementById('TodoInput');
const LIST = document.querySelector('ul');
let itemsLista = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const BAGREGAR =document.getElementById('BotonCarga');
const BELIMINAR =document.getElementById('BotonElimina');
const msgERROR = document.getElementById('msgError');
//Eventos para la lista
BAGREGAR.addEventListener('click',() =>{
    newHab();

})
BELIMINAR.addEventListener('click',()=>{
    eliminar();
})
//Eventos Para las rachas
window.addEventListener('DOMContentLoaded', () => {
    uiAct();
})
INBOTON.addEventListener('click', () => {
    inicioRacha();
    uiAct();
    MSG.style.display='none'

})

BOTON.addEventListener('click', () => {

    uiAct();
    if (compareUwI()) {
        
        if (checkRacha()) {
            console.log('paso un dia');
            sumarRacha();
            ultimaRacha();
            uiAct();
            MSG.innerHTML="Tienes un día mas!"
        } 
        else{
            console.log('paso mas de un dia');
            inicioRacha();
            uiAct();
            MSG.innerHTML="Perdiste la racha :("
        }
    }
})
// Funciones para la racha
function inicioRacha() {
    const INICIORACHA = fechaActual();
    localStorage.setItem('inicio', JSON.stringify({ dia: INICIORACHA[0], mes: INICIORACHA[1] }));
    localStorage.setItem('racha', 0);
    localStorage.setItem('ultimo',JSON.stringify({ dia: INICIORACHA[0], mes: INICIORACHA[1] }))

}

function checkRacha() {
    let esteDia = fechaActual();
    let inicio = JSON.parse(localStorage.getItem('ultimo'))
    if ((esteDia[0] - inicio.dia) == 1) {
        return true;
    }
    else {
        if (esteDia[1] != inicio.mes) {
            return true;
        }
        else {
            console.log('pq')
            return false;
        }
    }
}
function fechaActual() {
    let fechaDeHoy = new Date();
    const INICIORACHA = [fechaDeHoy.getDate(), fechaDeHoy.getMonth() + 1];
    return INICIORACHA;
}
function sumarRacha() {
    let rachaActual = parseInt(localStorage.getItem('racha')) || 0;
    let rachaActualizada = rachaActual + 1;
    localStorage.setItem('racha', rachaActualizada);
}
function reiniciaRacha() {
    localStorage.setItem('racha', 0);
}
function ultimaRacha() {
    let ultimoDia = fechaActual();
    localStorage.setItem('ultimo', JSON.stringify({ dia: ultimoDia[0], mes: ultimoDia[1] }));
}
function compareUwI() {
    let ultDia = JSON.parse(localStorage.getItem('ultimo'));
    let actualF = fechaActual();
    return (ultDia.dia != actualF[0]);
}
function uiAct() {
    let racha = localStorage.getItem('racha')
    TEXT.innerHTML = 'llevas una racha de: ' + racha + ' días';
    msgERROR.style.display='none'
}



// Funciones para la lista
itemsLista.forEach(agregarHab);
function agregarHab(texto){
    if(texto!=''){
        const li = document.createElement('li')
        li.textContent=texto;
        LIST.appendChild(li);
        msgERROR.style.display='none'

    }
    else{
        msgERROR.style.display='block'
    }
}
function newHab(){
    itemsLista.push(INPUTLISTA.value);
    localStorage.setItem('items',JSON.stringify(itemsLista));
    agregarHab(INPUTLISTA.value);
    INPUTLISTA.value='';
}
function eliminar(){
    localStorage.removeItem('items')
    INPUTLISTA.innerHTML ='';
    itemsLista = [];
    LIST.removeChild(LIST.firstChild);
}
