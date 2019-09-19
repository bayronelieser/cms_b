

$(document).ready(function () {

    $('#probar-css').click(
        function mostrarCss() {
            console.log(hola);
            document.getElementById("ventana-css").innerHTML = `
                
                    @media only screen and (max-width: 600px) {
                        #form-categories{
                            width: 90% !important; 
                        }
                    }
                    @media only screen and (min-width: 600px) and (max-width: 900px) {
                        #form-categories{
                            width: 80% !important; 
                        }
                    }
        
                    /*Themes o plantillas*/
                    #editor-css , #mostrar-css{
                        width: 100rem !important;
                    }
                `

        }

    );


});

// (function mostrarCss() {
//     var hola = document.getElementById('highlight-css').value;
//     console.log(hola);
//     document.getElementById("ventana-css").innerHTML = `
       
//             ${hola}
//             @media only screen and (max-width: 600px) {
//                 #form-categories{
//                     width: 90% !important; 
//                 }
//             }
//             @media only screen and (min-width: 600px) and (max-width: 900px) {
//                 #form-categories{
//                     width: 80% !important; 
//                 }
//             }

//             /*Themes o plantillas*/
//             #editor-css , #mostrar-css{
//                 width: 100rem !important;
//             }
//         `

// });

