
const BOTON = document.getElementById('boton');
const INBOTON = document.getElementById('inicioBoton');
const TEXT = document.getElementById('msgInicio');
INBOTON.addEventListener('click', () => {
    const INICIORACHA = inicioRacha();
    localStorage.setItem('inicio', JSON.stringify({ dia: INICIORACHA[0], mes: INICIORACHA[1] }));
    localStorage.setItem('racha', 0);
})

BOTON.addEventListener('click', () => {
    if(compareUwI()){
        if (checkRacha) {
            sumarRacha();
            ultimaRacha();
            uiAct();
        }
    }
})

function inicioRacha() {
    const INICIORACHA = fechaActual();
    return INICIORACHA;
}

function checkRacha() {
    let esteDia = fechaActual();
    let inicio = JSON.parse(localStorage.getItem('inicio'))
    if ((esteDia[0] - inicio.dia) == 1) {
        console.log('true sale de aca')
        return true;
    }
    else {
        if (esteDia[1] != inicio.mes) {
            console.log('true sale de mes')
            return true;
        }
        else {
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
function ultimaRacha(){
    let ultimoDia = fechaActual();
    localStorage.setItem('ultimo', JSON.stringify({ dia: ultimoDia[0], mes: ultimoDia[1] }));    
}
function compareUwI(){
    let ultDia = JSON.parse(localStorage.getItem('ultimo'));
    let actualF = fechaActual();
    return(ultDia.dia != actualF[0]);
}
function uiAct(){
    let racha = localStorage.getItem('racha')
    TEXT.innerHTML='llevas una racha de: '+ racha;
}

