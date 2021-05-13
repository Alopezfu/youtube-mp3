window.addEventListener("load", function (event) {

    var socket = io();

    socket.on('file', function(data){

        document.getElementById("okey").style.display = "none";
        document.getElementById("url").value = "";
        btn.setAttribute("style", "cursor: ponter;");
        btn.disabled = false;
    });

    function validateYouTubeUrl(url) {

        let out;
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                out = true;
            }
            else {

                out = false;
            }
        }
        
        return out;
    }

    btn.addEventListener('click', event => {

        let url = document.getElementById("url").value;
        url = url.split('&')[0];

        if (validateYouTubeUrl(url)) {

            socket.emit('url', url);
            document.getElementById("err").innerHTML = "";
            document.getElementById("okey").style.display = "inline";
            btn.setAttribute("style", "cursor: no-drop;");
            btn.disabled = true;
        }else{

            document.getElementById("err").innerHTML = "URL no válida.";
        }

    });
});