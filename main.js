$(document).ready(function() {
    var source   = document.getElementById("cd-template").innerHTML;
    var template = Handlebars.compile(source);

    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'GET',
        'success': function(data) {
            var musica = data.response
            console.log(musica);
            for (var i = 0; i < musica.length; i++) {
                autore = musica[i].author;
                titolo = musica[i].title;
                anno = musica[i].year;
                link = musica[i].poster;

                context = {
                    link: link,
                    titolo: titolo,
                    autore: autore,
                    anno: anno
                }
                html = template(context)
                $('.cds-container').append(html)
            }
        },
        'error': function() {
            alert('si è verificato un errore');
        }
    });
});
