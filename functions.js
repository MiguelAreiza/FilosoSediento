$(document).ready(function(){

    setTimeout(() => {
        Start();
        Message('Bienvenido, ¿qué deseas hoy?', 'Success');
        
        $('#Theme').addClass('AnimationTheme');
        setTimeout(() => {
            $('#Theme').hide();
        }, 2000);       
    }, 3000);

    
    $('#Translate').click(()=> {
        if (sessionStorage.Language) {

            let lib = new google.translate.TranslateService();
            lib.translatePage('en', 'es', function () {});

            sessionStorage.removeItem('Language');
            Message('Traducción a español','Success')
        } else {
            let lib = new google.translate.TranslateService();
            lib.translatePage('es', 'en', function () {});

            sessionStorage.setItem('Language', 'true')
            Message('Translate to english', 'Success')
        }
    });

    $('#btnHome').click(()=> {
        Start();
        Message('¿Qué deseas hoy?', 'Success')
    });

    $('.fa.fa-location-arrow.link-icon').click(()=>{
        window.open('https://www.google.com/maps/place/FILOSO+Y+SEDIENTO/@6.1911869,-75.6179074,15z/data=!3m1!4b1!4m5!3m4!1s0x8e4683ba47fbb723:0x9858fafe4e8a75c5!8m2!3d6.1912176!4d-75.5994751?hl=es')
    })

    $('#WhatsApp').click(()=>{
        window.open('https://api.whatsapp.com/send?phone=573105001311&text=');
    })

    $('.Networks > .Facebook').click(()=>{
        window.open('https://www.facebook.com/people/Filoso-y-sediento/100063938236618/')
    })

    $('.Networks > .Instagram').click(()=>{
        window.open('https://www.instagram.com/filosoysediento/')
    })

    $('.Networks > .WhatsApp').click(()=>{
        window.open('https://api.whatsapp.com/send?phone=573105001311&text=');
    })

});

function Message(msj, mode) {
    let color = '#0000ff'
    if (mode == 'Success') {
        color = '#009900'
    } else if (mode == 'Error') {
        color = '#990000'
    }
    $('#Notificacion').show();
    $('#Notificacion').html(msj);
    $('#Notificacion').css('background', color);
    setTimeout(() => {
        $('#Notificacion').hide();
    }, 4000);
}

function Start() {
    $.ajax({
        url : 'Products.txt',
        dataType: "text",
        success : function (data)         
        {
            data = JSON.parse(data).Productos;
            let categories = [];

            for (let i = 0; i < data.length; i++) {
                let cat = data[i].categoria;
                let existe = false;
                if (categories.length > 0) {
                    for (let j = 0; j < categories.length; j++) {
                        if (categories[j] == cat) {
                            existe = true;
                        }
                    }
                    if (!existe) {
                        categories.push(cat);
                    }                    
                } else {
                    categories.push(cat);
                }
            }

            let html = ``;

            for (let i = 0; i < categories.length; i++) {
                
                html += `<div class="CardCategory" id="${categories[i]}">
                            <div class="Line"></div>
                            <img src="Imagenes/Categorias/${categories[i]}.png" alt="Categoría ${categories[i]}">
                        </div>`
                
            }

            $('.Categories').show();
            $('#CardsCategories').html(html);

            $('.Products').hide();

            CreateEventsCategory(categories);

        }
    })
}

function CreateEventsCategory(categories) {    
    for (let i = 0; i < categories.length; i++) {        
        $(`#${categories[i]}`).click(()=>{
            FilterProducts(categories[i]);
        })        
    }
}

function FilterProducts(Category) {
    $.ajax({
        url : 'Products.txt',
        dataType: "text",
        success : function (data)         
        {
            data = JSON.parse(data).Productos;
            let Products = [];

            for (let i = 0; i < data.length; i++) {
                let Prod = data[i];
                if (Prod.categoria == Category) {
                    Products.push(Prod);
                }
            }

            let html = ``;

            for (let i = 0; i < Products.length; i++) {
                
                html += `<div class="CardProduct">
                            <label class="Name">🍴 ${Products[i].titulo}</label>
                            <b class="Price">$ ${Products[i].precio}</b>
                            <p class="Description">${Products[i].descripcion}</p>
                        </div>`
                
            }
            if (Products.length <= 0) {
                Message('Por el momento no hay productos', 'info');
            } else {
                $('.Products').show();
                $('.Products > #CatProduct').html(Category);
                $('.Products > img').attr("src",`Imagenes/Productos/${Category}.png`);            
                $('.Products > img').attr("alt",`Categoria ${Category}`);
                $('#CardsProducts').html(html);
                $('.Categories').hide();
                Message(`Encontrarás lo mejor en ${Category}`, 'Success');        
            }
        }
    })
}