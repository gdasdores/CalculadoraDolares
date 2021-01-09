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
        var dolarLiqui = peticionApiJSON[3].casa.venta.replace(/,/g, '.');
        var dolarBolsa = peticionApiJSON[4].casa.venta.replace(/,/g, '.');

        var dolarAhorroUnidad = (dolarOficial * 1.65);
        var dolarAhorroFin = (dolarAhorroUnidad*1).toFixed(2);
        var dolarBlueFin = (dolarBlue1*1).toFixed(2);
        var dolarLiquiFin = (dolarLiqui*1).toFixed(2);
        var dolarBolsaFin = (dolarBolsa*1).toFixed(2);
  
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        var dolarAhorro = (inputMoneda * (dolarOficial * 1.65));
        var dolarBlueCalc = (inputMoneda * dolarBlue1);
        var dolarLiquiCalc = (inputMoneda * dolarLiqui);
        var dolarBolsaCalc = (inputMoneda * dolarBolsa);

        dondeCompra2 = String(document.getElementById("dondeCompra").options[document.getElementById("dondeCompra").selectedIndex].value);

        if (dondeCompra2 == "En el banco (Dólar ahorro)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarAhorro.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong></font><br/><br/> Cotización al día <strong>" + date + "</strong> del dólar ahorro: <strong>$ " + dolarAhorroFin + " </strong>";
          if (inputMoneda > 200) {
            alert("Tené en cuenta que el banco no va a dejarte comprar más de $200 USD.");
          }
        }
        else if (dondeCompra2 == "Compras online en USD (Netflix, Spotify, Apple, Amazon, etc)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarAhorro.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong></font><br/><br/> Cotización al día <strong>" + date + "</strong> del dólar ahorro: <strong>$ " + dolarAhorroFin + " </strong>";
        }
        else if (dondeCompra2 == "Operaciones en la bolsa (CCL - Dólar Contado con Liqui)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarLiquiCalc.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong></font><br/><br/> Cotizaciones al día <strong>" + date + "</strong> del dólar CCL: <strong>$ " + dolarBolsaFin + " </strong>";
        }
        else if (dondeCompra2 == "Compra de bonos en pesos y venta en dólares (MEP - Dólar Bolsa)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarBolsaCalc.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong></font><br/><br/> Cotizaciones al día <strong>" + date + "</strong> del dólar MEP: <strong>$ " + dolarLiquiFin + " </strong>";
        }
        else if (dondeCompra2 == "Compra Informal (Dólar Blue)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarBlueCalc.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong></font><br/><br/> Cotizaciones al día <strong>" + date + "</strong> del dólar blue: <strong>$ " + dolarBlueFin + " </strong>";
        }
        
    }

    // output the result (or errors)
    document.getElementById("output_text").innerHTML = outputText;
}

async function soloCot() {

  var peticionApi = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
  var peticionApiJSON = await peticionApi.json();

  console.log({ peticionApiJSON });

      var dolarOficial = peticionApiJSON[7].casa.venta.replace(/,/g, '.');

      var dolarBlue1 = peticionApiJSON[1].casa.venta.replace(/,/g, '.');

      var dolarLiqui = peticionApiJSON[3].casa.venta.replace(/,/g, '.');

      var dolarBolsa = peticionApiJSON[4].casa.venta.replace(/,/g, '.');

      var dolarAhorroUnidad = (dolarOficial * 1.65);

      var dolarOficialFin = (dolarOficial*1).toFixed(2);
      var dolarAhorroFin = (dolarAhorroUnidad*1).toFixed(2);
      var dolarBlueFin = (dolarBlue1*1).toFixed(2);
      var dolarLiquiFin = (dolarLiqui*1).toFixed(2);
      var dolarBolsaFin = (dolarBolsa*1).toFixed(2);

      var today = new Date();
      var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        outputText = "Cotizaciones al día <strong>" + date + "</strong>:</br></br> Dólar Oficial: <strong>$ " + dolarOficialFin + " </strong></br> Dólar Ahorro: <strong>$ " + dolarAhorroFin + " </strong></br> Dólar CCL: <strong>$ " + dolarLiquiFin + "</strong><br/>Dólar Blue: <strong>$ " + dolarBlueFin + "</strong></br> Dólar Bolsa: <strong>$ " + dolarBolsaFin + "</strong>";

  // output the result (or errors)
  document.getElementById("output_text").innerHTML = outputText;
}