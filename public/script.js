let film = document.getElementsByClassName("film");
console.log(film)



for(let f of film){
    f.addEventListener("click", (event) =>{
        console.log(f.getAttribute('id'));
        axios.get("/apidetail/"+f.getAttribute('id')).then(response => {
            let note = 0;
            for(let n of response.data.comment) {note += n.note}
            let moyen = note/response.data.comment.length;
            let notemoyenne = moyen.toFixed(1)

            document.getElementById("detailfilm").innerHTML = 
            '<div class="note">'+
                '<svg style="display:none;">'+
                    '<defs>'+
                    '<symbol id="fivestars">'+
                        '<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd"/>'+
                        '<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(24)"/>'+
                        '<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(48)"/>'+
                        '<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(72)"/>'+
                        '<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd"  transform="translate(96)"/>'+
                    '</symbol>'+
                    '</defs>'+
                '</svg>'+
                '<div class="rating">'+
                '<!--   <div class="rating-bg" style="width: 90%;"></div> -->'+
                    '<progress class="rating-bg" value="'+notemoyenne+'" max="5"></progress>'+
                    '<svg><use xlink:href="#fivestars"/></svg>'+
                '</div>'+
            '</div>'+

            '<center><p> Titre : '+response.data.film.titre+'</p>'+
            '<img src="/uploads/'+response.data.film.affiche+'" width="240" height="320">'+
            '<p>Description : '+response.data.film.description +'</p>';
            for(let j of response.data.joue){
                for(let a of response.data.acteur){
                    if (j.Id_acteur == a.id_acteur) {
                        document.getElementById("detailfilm").innerHTML +=
                        '<p> Acteurs : '+a.nom+' '+a.prenom+'</p>'
                    };
                }
            }

        });
    })
}
    // let saisie = document.getElementById("envoi").class
    // axios.get('/detailfilm/:id', {obj: saisie}).then((response) => {
    //     console.log(response.data)
    // });