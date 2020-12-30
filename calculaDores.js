var inputMoneda;
var outputText;
var dondeCompra2;
var dondeCompra;

async function validate() {

    // get the input

    inputMoneda = document.forms["input_form"]["elInput"].value;

    var peticionApi = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    var peticionApiJSON = await peticionApi.json();

    console.log({ peticionApiJSON });

    // validate
    if (inputMoneda == 0) {
        outputText = "No puede ser cero";
    } else if (isNaN(inputMoneda)) {
        outputText = "Tiene que ser un número";
    } else {
        // calculate the result

        var dolarOficial = peticionApiJSON[7].casa.venta.replace(/,/g, '.');
        var dolarBlue1 = peticionApiJSON[1].casa.venta.replace(/,/g, '.');

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var dolarAhorroUnidad = (dolarOficial * 1.65).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var dolarBlue = (dolarBlue1*1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        var dolarAhorro = (inputMoneda * (dolarOficial * 1.65)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var dolarBlueCalc = (inputMoneda * dolarBlue).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        dondeCompra2 = String(document.getElementById("dondeCompra").options[document.getElementById("dondeCompra").selectedIndex].value);

        if (dondeCompra2 == "En el banco (Dólar ahorro)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'><strong>$" + dolarAhorro + "</font></strong><br/><br/><font size='-2'> Cotizaciones del dólar al día <strong>" + date + " </strong>:     Dólar Oficial: <strong>$ " + dolarOficial + " </strong>// Dólar solidario o ahorro: <strong>$" + dolarAhorroUnidad + " </strong>// Dólar blue: <strong>$" + dolarBlue + "</strong>.</font>";
        }
        else if (dondeCompra2 == "Compras online en USD (Netflix, Spotify, Apple, Amazon, etc)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'><strong>$" + dolarAhorro + "</font></strong><br/><br/><font size='-2'> Cotizaciones del dólar al día <strong>" + date + " </strong>:     Dólar Oficial: <strong>$ " + dolarOficial + " </strong>// Dólar solidario o ahorro: <strong>$" + dolarAhorroUnidad + " </strong>// Dólar blue: <strong>$" + dolarBlue + "</strong>.</font>";
        }
        else if (dondeCompra2 == "Compra Informal (Blue)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'><strong>$" + dolarBlueCalc + "</font></strong><br/><br/><font size='-2'> Cotizaciones del dólar al día <strong>" + date + " </strong>:     Dólar Oficial: <strong>$ " + dolarOficial + " </strong>// Dólar solidario o ahorro: <strong>$" + dolarAhorroUnidad + " </strong>// Dólar blue: <strong>$" + dolarBlue + "</strong>.</font>";
        }
        
    }

    // output the result (or errors)
    document.getElementById("output_text").innerHTML = outputText;
}