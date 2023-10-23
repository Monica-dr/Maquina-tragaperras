    // El crédito al inicio es un número al azar entre 10 y 15
    var credito= Math.ceil(Math.random() * (15 - 10) + 10);
    var otraTirada = false;
    const imagenes= ["juego1.jpg","juego2.jpg","juego3.jpg","juego4.jpg","juego5.jpg","juego6.jpg"];
    var imagenesJuego = ["","",""];
    
    window.onload=inicio;

    function inicio(){  
        actualizarCredito(credito);
        
        // hacer botón tirar
        document.querySelector("#lanzar").onclick= tirar

        // botones de volver a tirar
        for (let k=0;k<document.querySelectorAll(".boton").length;k++) {
            document.querySelectorAll(".boton")[k].onclick= volvertirar;
        }

        // cerrar mensaje del cuadro
        document.querySelector("#cruz").onclick= cerrar_mensaje;
    }

    function tirar(){
        // Miramos si tenemos crédito disponible
        if (credito > 0) {
            // Añadir sonido
            reproducir_sonido("lanzar.mp3");
            //cambiar imagenes de tirar y mostrar la imagen
            for (k=0;k<imagenesJuego.length;k++) {
                imagenesJuego[k]= imagen_random();
                document.querySelectorAll(".ventana img")[k].src =  `img/${imagenesJuego[k]}`
            }
            //  si las 3 imagenes son iguales
            comprobar_iguales();
            // a partir de ahora ya se puede volver a tirar
            otraTirada = true;
            
        } else {
            sin_credito();
        }
    }

    function volvertirar() {
        // saber qué botón se ha pulsado
        let hijosBoton= this.parentNode.children;
        let activo = 0;
        for (let k=0; k<hijosBoton.length;k++) {
            if (this===hijosBoton[k]) {
                activo = k;
            }
        }
        // se comprueba que haya crédito y que se pueda volver a tirar
        if (credito > 0 && otraTirada) {
            // Añadir sonido
            reproducir_sonido("otra.wav");
            // buscar una imagen por azar y comprobar que es diferente a la que ya existe
            let imagenProvisional;
            do {
                imagenProvisional =  imagen_random();
            } while (imagenProvisional==imagenesJuego[activo]);
            // mostrar la imagen en pantalla
            imagenesJuego[activo] = imagenProvisional;
            document.querySelectorAll(".ventana img")[activo].src =  `img/${imagenesJuego[activo]}`;
            // mirar si las 3 imagenes son iguales
            comprobar_iguales();
        } else if (credito == 0) {
            sin_credito();
        }
    }

    function reproducir_sonido(sonido) {
        let mp3=document.getElementById("sonido");
        mp3.src="audios/"+sonido;
        mp3.play();
    }

    function imagen_random() {
        return imagenes[Math.floor(Math.random() * imagenes.length)];
    }

    function comprobar_iguales() {
        if  (imagenesJuego[0] === imagenesJuego[1] && imagenesJuego[1] === imagenesJuego[2]) {
            // se ha conseguido el premio
            reproducir_sonido("ganar.mp3")
            // ganar monedas
            let premio= Math.ceil(Math.random() * (5 - 3) + 3);
            credito+= premio;
            mostrarMensaje("Has ganado "+premio +" monedas",premio);
            // no se puede volver a tirar si ganas el premio
            otraTirada = false;
        } else {
            // bajar crédito un euro
            credito--;
            actualizarCredito();
        }
        
        // si nos quedamos sin crédito, mensaje y música sin crédito
        if (credito == 0) {
            sin_credito();
        }
    }


    function mostrarMensaje(mensaje, premio) {
        document.querySelector("#velo").style.display = "flex";
        document.querySelector("#mensaje").innerHTML = mensaje;
        let monedas = 0;
        if (premio>0) {
            document.querySelector("#mensaje").innerHTML += "<br>"
            while (monedas < premio){
                monedas++;
                document.querySelector("#mensaje").innerHTML +=  `<img src="img/moneda.png" height="40px">`;
            } 
        }
        
    }

    function sin_credito() {
        // Añadir sonido
        reproducir_sonido("final.mp3")

        // enseñar mensaje "sin crédito"
        mostrarMensaje("Te has quedado sin crédito",0);

    }

    function actualizarCredito() {
        // Poner el total de crédito disponible
        document.querySelector("#dinero").innerHTML = credito + `<span class="euros">€</span>`;
        // Poner tantos dibujos de moneda como crédito hay
        let monedas = 0;
        document.querySelector("#monedas").innerHTML= ""
        while (monedas < credito){
            monedas++;
            document.querySelector("#monedas").innerHTML +=  `<img src="img/moneda.png">`;
        } 
    }

    function cerrar_mensaje() {
        document.querySelector("#velo").style.display = "none";
        actualizarCredito();
    }

  
    