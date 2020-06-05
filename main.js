$(document).ready(function(){

    // Color Picker - Does not effect the total price
    var $carImg = $('#imgHolder img');

    $carImg .on('click', function() {
        $(this).attr('src', 'img/blue.png');   
    });

    $('#colorSelector .colorItem').on('click', function(){
        var imgPath;
        imgPath = $(this).attr('data-img-path');

        $carImg .fadeOut(600, function(){

            $carImg .attr('src', imgPath).fadeIn(600);
        }); 
    });

 // Price calculator and Specification function   
    var modelSpecs,
        modelPrice,
        modelSpecHolder,
        modelPriceHolder,
        modelPriceConverter;

    modelSpecHolder = $('#modelSpecs');
    modelPriceHolder = $('#modelPrice');
    modelPriceConverter= $('#modelPriceEuro')

    modelPrice = 0;
    modelSpecs = '';

    calcPrice();
    compileSpesc ();
    calcEuro();

    $('#autoForm input').on('change', function(){
        calcPrice();
        compileSpesc ();
        calcEuro();
    });
   
// Price Calculation function starts here 
    function calcPrice(){
        var modelPriceEngine =  $('input[name=engine]:checked', '#autoForm').val();
        var modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
        var modelPricepackage = $('input[name=package]:checked', '#autoForm').val();
        modelPriceEngine = parseInt(modelPriceEngine);
        modelPriceTransmission = parseInt(modelPriceTransmission);
        modelPricepackage = parseInt(modelPricepackage);

        modelPrice = modelPriceEngine + modelPriceTransmission + modelPricepackage;

        modelPriceHolder.text( '$ '+modelPrice);
     
    }

// Specification monitring function starts here
    function compileSpesc (){
        modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
        modelSpecs =  modelSpecs + ', ' + $('input[name=transmission]:checked + label', '#autoForm').text();
        modelSpecs  =  modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text();
        modelSpecHolder.text(modelSpecs);
    }

// Currency Convertor 
var currencyUrl = "https://api.exchangerate-api.com/v4/latest/USD";

var usdToEuro = 0;

$.ajax({
    url: currencyUrl,
    cache: false,
    success: function(html){
        // console.log(html.rates.EUR);

        usdToEuro = html.rates.EUR;

        calcEuro();
        
    }
});  

function calcEuro(){
    var modelPriceEuro = (modelPrice * usdToEuro);
// alert(modelPriceEuro);
    modelPriceConverter.text( '€ '+ modelPriceEuro.toFixed(0));
}
});
