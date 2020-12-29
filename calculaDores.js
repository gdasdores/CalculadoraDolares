const { parse } = require("path");

var inputMoneda;
var outputText;

async function validate() {

    // get the input

    inputMoneda = document.forms["input_form"]["elInput"].value;

    var peticionApi = await fetch('https://api.exchangerate.host/latest?base=USD');
    var peticionApiJSON = await peticionApi.json();

    console.log({ peticionApiJSON });

    // validate
    if (inputMoneda == 0) {
        outputText = "No puede ser cero";
    } else if (isNaN(inputMoneda)) {
        outputText = "Tiene que ser un número";
    } else {
        // calculate the result


        var dolarOficial = peticionApiJSON.rates.ARS.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var dolarBlue = 164.00;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var dolarAhorroUnidad = (dolarOficial * 1.65).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var dolarAhorro = (inputMoneda * (dolarOficial * 1.65)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        outputText = "<font size='+3'><strong>$" + dolarAhorro + "</font></strong><br/><br/> Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte <strong>$ " + dolarAhorro + " pesos</strong>. <br/> La cotización oficial del dólar al día <strong>" + date + " </strong> es de <strong>$ " + dolarOficial + " pesos</strong>, y la del dólar ahorro es de <strong>$" + dolarAhorroUnidad + " pesos</strong>.";

    }

    // output the result (or errors)
    document.getElementById("output_text").innerHTML = outputText;
}