$(document).ready(function() {
    var source   = document.getElementById("cd-template").innerHTML;
    var template = Handlebars.compile(source);

    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'GET',
        'success': function(data) {
            //Creo funzione per reimpire template handlebars
            function riempiCard() {
                //Inserisco i dati ricevuti dalla chiamata ajax nel template handlebars
                context = {
                    link: musica[i].poster,
                    titolo: musica[i].title,
                    autore: musica[i].author,
                    anno: musica[i].year,
                    genere: musica[i].genre
                }
                //Salvo il template con i parametri attuali
                html = template(context)
            }

            //Creo un array che contiene gli oggetti della chiamata
            var musica = data.response

            //Ordina l'array per data di uscita
            musica.sort(function(a, b){
                return a.year-b.year
            })

            for (var i = 0; i < musica.length; i++) {
                riempiCard()
                $('.new-old').prepend(html)
                $('.old-new').append(html)
            }

            //-------------ORDINA PER GENERE---------------
            //Creo un array per salvare i generi musicali presenti
            var generi = [];
            //Inserisco nell'array i generi musicali
            for (var i = 0; i < musica.length; i++) {
                if (!generi.includes(musica[i].genre)) {
                    generi.push(musica[i].genre)
                }
            }

            //Ciclo i generi musicali e per ognuno inserisco i relativi dischi in pagina
            for (var x = 0; x < generi.length; x++) {
                //Appende in pagina i dischi, un genere alla volta
                for (var i = 0; i < musica.length; i++) {
                    if (generi[x] == musica[i].genre) {
                        riempiCard()
                        $('.genre').append(html)
                    }
                }
            }
            //-------------/ORDINA PER GENERE---------------
        },
        'error': function() {
            alert('si è verificato un errore');
        }
    });

//Click su un genere per fare toggle dei dischi ai quali corrisponde
    $('.generi div').click(function(){
        $(this).children('.fa-eye').toggle()
        $(this).children('.fa-eye-slash').toggle()
        //Creo una stringa '[genere su cui ho cliccato]' per richiamare la classe che mi serve
        genere = $(this).children('h2').text()
        //Toggle degli elementi con la classe corrispondente all'elemento che ho cliccato (this)
        $('.' + genere).toggle()
    })

    $('.ordina-data p').click(function(){
        if ($('.old-new').hasClass('flex') || $('.new-old').hasClass('flex')) {
            $('.old-new').toggleClass('flex')
            $('.new-old').toggleClass('flex')
        }
        else {
            $('.old-new').toggleClass('flex')
            $('.genre').toggleClass('flex')
        }

        if ($('.old-new').hasClass('flex')) {
            $('.fa-arrow-up').show()
            $('.fa-arrow-down').hide()
        }
        else {
            $('.fa-arrow-up').hide()
            $('.fa-arrow-down').show()
        }
    })

    $('.ordina-genere p').click(function(){
        $('.cds-container').removeClass('flex')
        $('.genre').addClass('flex')
    })
});
