var inputMoneda;
var outputText;
var dondeCompra2;
var dondeCompra;

async function validate() {

    // get the input

    inputMoneda = document.forms["input_form"]["elInput"].value;

    var peticionApi = await fetch('https://dolarapi.com/v1/dolares');
    var peticionApiJSON = await peticionApi.json();

    console.log({ peticionApiJSON });

    // validate
    if (inputMoneda == 0) {
        outputText = "No puede ser cero";
    } else if (isNaN(inputMoneda)) {
        outputText = "Tiene que ser un número";
    } else {
        // calculate the result

        var dolarOficial = peticionApiJSON[0].venta;
        var dolarBlue1 = peticionApiJSON[1].venta;
        var dolarLiqui = peticionApiJSON[3].venta;
        var dolarBolsa = peticionApiJSON[2].venta;
        var dolarAhorroUnidad = (dolarOficial * 1.60);

        var dolarAhorroFin = (dolarAhorroUnidad*1).toFixed(2);
        var dolarBlueFin = (dolarBlue1*1).toFixed(2);
        var dolarLiquiFin = (dolarLiqui*1).toFixed(2);
        var dolarBolsaFin = (dolarBolsa*1).toFixed(2);
  
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        var dolarAhorro = (inputMoneda * (dolarOficial * 1.60));
        var dolarBlueCalc = (inputMoneda * dolarBlue1);
        var dolarLiquiCalc = (inputMoneda * dolarLiqui);
        var dolarBolsaCalc = (inputMoneda * dolarBolsa);

        dondeCompra2 = String(document.getElementById("dondeCompra").options[document.getElementById("dondeCompra").selectedIndex].value);

        if (dondeCompra2 == "En el banco (Dólar ahorro)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarAhorro.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          if (inputMoneda > 200) {
            alert("Tené en cuenta que el banco no va a dejarte comprar más de $200 USD.");
          }
        }
        else if (dondeCompra2 == "Compras online en USD (Netflix, Spotify, Apple, Amazon, etc)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarAhorro.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else if (dondeCompra2 == "Operaciones en la bolsa (CCL - Dólar Contado con Liqui)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarLiquiCalc.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else if (dondeCompra2 == "Compra de bonos en pesos y venta en dólares (MEP - Dólar Bolsa)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarBolsaCalc.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else if (dondeCompra2 == "Compra Informal (Dólar Blue)"){
          outputText = "Tu compra por un total de <strong>$ " + inputMoneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " dólares </strong> va a costarte: <strong><br/><br/><font size='+3'>$" + dolarBlueCalc.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
    }

    // output the result (or errors)
    document.getElementById("output_text").innerHTML = outputText;
}

async function soloCot() {

  var peticionApi = await fetch('https://dolarapi.com/v1/dolares');
  var peticionApiJSON = await peticionApi.json();

  console.log({ peticionApiJSON });

      var dolarOficial = peticionApiJSON[0].venta;
      var dolarBlue1 = peticionApiJSON[1].venta;
      var dolarLiqui = peticionApiJSON[3].venta;
      var dolarBolsa = peticionApiJSON[2].venta;
      var dolarAhorroUnidad = (dolarOficial * 1.60);

      var dolarOficialFin = (dolarOficial*1).toFixed(2);
      var dolarAhorroFin = (dolarAhorroUnidad*1).toFixed(2);
      var dolarBlueFin = (dolarBlue1*1).toFixed(2);
      var dolarLiquiFin = (dolarLiqui*1).toFixed(2);
      var dolarBolsaFin = (dolarBolsa*1).toFixed(2);

      var today = new Date();
      var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        //outputText = "Cotizaciones al día <strong>" + date + "</strong>:</br></br> Dólar Oficial: <strong>$ " + dolarOficialFin + " </strong></br> Dólar Ahorro: <strong>$ " + dolarAhorroFin + " </strong></br> Dólar CCL: <strong>$ " + dolarLiquiFin + "</strong><br/>Dólar Blue: <strong>$ " + dolarBlueFin + "</strong></br> Dólar Bolsa: <strong>$ " + dolarBolsaFin + "</strong>";
        outputBlue = dolarBlueFin;
        outputOfi = dolarOficialFin;
        outputAhorro = dolarAhorroFin;
        outputLiqui = dolarLiquiFin;
        outputBolsa = dolarBolsaFin;
        outputDate = date;


  // output the result (or errors)
  //document.getElementById("output_text").innerHTML = outputText;
  document.getElementById("output_blue").innerHTML = outputBlue;
  document.getElementById("output_ofi").innerHTML = outputOfi;
  document.getElementById("output_ahorro").innerHTML = outputAhorro;
  document.getElementById("output_liqui").innerHTML = outputLiqui;
  document.getElementById("output_bolsa").innerHTML = outputBolsa;
  document.getElementById("output_date").innerHTML = outputDate;
}

