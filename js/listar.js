let $URL_REST = "https://2019ncov.asia/api/country_region"
var nRow = 1;
var celdas = ["pais", "casosConf", "defunciones", "recuperados", "detalle"];
var celdasCompletas = ["pais", "casosConf", "defunciones", "recuperados", "detalle"];

function agregarRenglon(idT) {
    nRow = 1;
    var tabla = document.getElementById(idT);
    var endPoint = $URL_REST;
    if (document.getElementById("paises").value != "") {
        endPoint = $URL_REST + document.getElementById("paises").value;
        document.getElementById("paises").value = "";
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }

    }
    fetch(endPoint)
        .then(response => response.json())
        .then(result => {
            result.results.forEach(pais => {
                var renglon = tabla.insertRow(nRow);
                for (i = 0; i < celdas.length; i++) {
                    var celda = renglon.insertCell(i);
                    if (celdas[i] == "pais") {
                        var textoCelda = document.createTextNode(pais.country_region);
                    } else {
                        switch (celdas[i]) {
                            case "casosConf":
                                var textoCelda = document.createTextNode(pais.confirmed);
                                break;
                            case "defunciones":
                                var textoCelda = document.createTextNode(pais.deaths);
                                break;
                            case "recuperados":
                                var textoCelda = document.createTextNode(pais.recovered);
                                break;
                            case "detalle":
                                var textoCelda = document.createElement('a');
                                textoCelda.classList.add('btn', 'btn-primary');
                                textoCelda.textContent = 'ver';
                                textoCelda.href = "hola.html" + "?" + pais.country_region;
                                break;

                        }
                    }

                    celda.appendChild(textoCelda);
                }
                nRow++;
            });
        }).catch(error => console.log())
}

function detalle(idT) {
    var idPais = 0;
    nRow = 1;
    var nombrePais = location.search;
    console.log("primero : " + nombrePais);
    nombrePais = nombrePais.slice(1);
    console.log("nombre : " + nombrePais);
    var tabla = document.getElementById(idT);
    var endPoint = $URL_REST;

    fetch(endPoint)
        .then(response => response.json())
        .then(result => {
            result.results.forEach(pais => {

                console.log("val1: " + pais.country_region + " val2: " + nombrePais);
                if (pais.country_region == nombrePais) {
                    console.log("entre");
                    // var renglon = tabla.insertRow(nRow);
                    var renglon = tabla.insertRow(1);
                    var celda = renglon.insertCell(0);
                    var textoCelda = document.createTextNode("Pais: " + pais.country_region);
                    celda.appendChild(textoCelda);
                    var renglon = tabla.insertRow(2);
                    var celda = renglon.insertCell(0);
                    var textoCelda = document.createTextNode("Casos confirmados: " + pais.confirmed);
                    celda.appendChild(textoCelda);
                    var renglon = tabla.insertRow(3);
                    var celda = renglon.insertCell(0);
                    var textoCelda = document.createTextNode("Defunciones: " + pais.deaths);
                    celda.appendChild(textoCelda);
                    var renglon = tabla.insertRow(4);
                    var celda = renglon.insertCell(0);
                    var textoCelda = document.createTextNode("Recuperados: " + pais.recovered);
                    celda.appendChild(textoCelda);
                    var renglon = tabla.insertRow(5);
                    var celda = renglon.insertCell(0);
                    var textoCelda = document.createTextNode("Ultima actualizacion: " + pais.last_updated);
                    celda.appendChild(textoCelda);
                } else {

                }
                idPais += 1;

            });
            nRow++;
        }).catch(error => console.log())
}

function filtrar(idT) {
    var idPais = 0;
    nRow = 1;
    var tabla = document.getElementById(idT);
    var endPoint = $URL_REST;

    if (document.getElementById("paises").value != "") {
        endPoint = $URL_REST;
        //document.getElementById("paises").value = "";
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }

    }

    fetch(endPoint)
        .then(response => response.json())
        .then(result => {
            result.results.forEach(pais => {

                //console.log("val1: " + pais.country_region + " val2: " + document.getElementById("paises").value);
                if (pais.country_region == document.getElementById("paises").value) {
                    //console.log("entre");
                    var renglon = tabla.insertRow(nRow);
                    for (i = 0; i < celdas.length; i++) {
                        var celda = renglon.insertCell(i);
                        if (celdas[i] == "pais") {
                            var textoCelda = document.createTextNode(pais.country_region);
                            console.log(pais.country_region);
                        } else {
                            switch (celdas[i]) {
                                case "casosConf":
                                    var textoCelda = document.createTextNode(pais.confirmed);
                                    break;
                                case "defunciones":
                                    var textoCelda = document.createTextNode(pais.deaths);
                                    break;
                                case "recuperados":
                                    var textoCelda = document.createTextNode(pais.recovered);
                                    break;
                                case "detalle":
                                    var textoCelda = document.createElement('a');
                                    textoCelda.classList.add('btn', 'btn-primary');
                                    textoCelda.textContent = 'ver';
                                    textoCelda.href = "hola.html" + "?" + pais.country_region;
                                    break;

                            }
                        }

                        celda.appendChild(textoCelda);


                    }

                } else {

                }
                idPais += 1;

            });
            nRow++;
        }).catch(error => console.log())
}