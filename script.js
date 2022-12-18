// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 35;
let timerInicial = 35;
let tiempoRegresivoId = null;

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

let winAudio = new Audio(`sounds/win.wav`)
let loseAudio = new Audio(`sounds/lose.wav`)
let clickAudio = new Audio(`sounds/click.wav`)
let rightAudio = new Audio(`sounds/right.wav`)
let wrongAudio = new Audio(`sounds/wrong.wav`)

// Generacion de numero aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(()=>{return Math.random()-0.5});
//console.log(numeros);

// Funciones
function contarTiempo(){
	tiempoRegresivoId = setInterval(()=>{
		timer--;
		mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
		if(timer == 0){
			clearInterval(tiempoRegresivoId);
			bloquearTarjetas();
			window.alert("Se acabo el tiempo")
			loseAudio.play();
		}
	},1000);
}

function bloquearTarjetas(){
	for (let i = 0; i<=15; i++){
		let tarjetaBloqueada = document.getElementById(i);
		tarjetaBloqueada.innerHTML = `<img src="img/${numeros[i]}.png">`;
		tarjetaBloqueada.disabled = true; 
	}
}

// Funcion principal
function destapar(id){

	if(temporizador == false){
		contarTiempo();
		temporizador = true;
	}

	tarjetasDestapadas++;
	console.log(tarjetasDestapadas);

	if(tarjetasDestapadas == 1){
		// Mostrar primer numero
		tarjeta1 = document.getElementById(id);
		primerResultado = numeros[id]
		tarjeta1.innerHTML = `<img src="img/${primerResultado}.png">`;
		clickAudio.play();
		//Deshabilitar primer boton
		tarjeta1.disabled = true;
		
	}

	else if(tarjetasDestapadas ==2){
		// Mostrar segundo numero
		tarjeta2 = document.getElementById(id);
		segundoResultado = numeros[id];
		tarjeta2.innerHTML = `<img src="img/${segundoResultado}.png">`;

		// Deshabilitar segundo boton
		tarjeta2.disabled = true;

		// Incrementar movimientos
		movimientos++;
		mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

		if(primerResultado == segundoResultado){
			// Encerar contador tarjetas destapadas
			tarjetasDestapadas = 0;

			// Aumetar aciertos
			aciertos++;
			mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
			rightAudio.play();

			if(aciertos == 8){
				clearInterval(tiempoRegresivoId);
				mostrarAciertos.innerHTML =  `Aciertos: ${aciertos} 😱`;
				mostrarTiempo.innerHTML = `Tardaste ${timerInicial - timer} segundos 🎉`;
				mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎`;
				winAudio.play();
			}
		}

		else{
			// Mostrar momentaneamente valores y volver a tapar
			setTimeout(()=>{
				wrongAudio.play();
				tarjeta1.innerHTML = ` `;
				tarjeta2.innerHTML = ` `;
				tarjeta1.disabled = false;
				tarjeta2.disabled = false;
				tarjetasDestapadas = 0;
			},800);
		}
	}
}