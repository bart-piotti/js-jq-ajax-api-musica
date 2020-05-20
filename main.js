$(document).ready(function() {
    var source   = document.getElementById("cd-template").innerHTML;
    var template = Handlebars.compile(source);

    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'GET',
        'success': function(data) {
            var musica = data.response
            console.log(musica);
            var generi = [];
            for (var i = 0; i < musica.length; i++) {
                if (!generi.includes(musica[i].genre)) {
                    generi.push(musica[i].genre)
                }
            }

            for (var x = 0; x < generi.length; x++) {
                for (var i = 0; i < musica.length; i++) {
                    if (generi[x] == musica[i].genre) {
                        autore = musica[i].author;
                        titolo = musica[i].title;
                        anno = musica[i].year;
                        link = musica[i].poster;
                        genere = musica[i].genre

                        context = {
                            link: link,
                            titolo: titolo,
                            autore: autore,
                            anno: anno,
                            genere: genere
                        }
                        html = template(context)
                        $('.cds-container').append(html)
                    }
                }
            }
        },
        'error': function() {
            alert('si è verificato un errore');
        }
    });

    $('.generi div').click(function(){
        $(this).children('.fa-eye').toggle()
        $(this).children('.fa-eye-slash').toggle()
        genere = '.' + $(this).children('h2').text()
        $(genere).toggle()
    })
});
