const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

async function runTest() {

    let driver = await new Builder().forBrowser('chrome').build();
    let resultadosPruebas = [];

    try{

        await driver.get('https://www.amazon.com/');

        await driver.wait(until.elementLocated(By.id('twotabsearchtextbox')), 10000);

        await driver.findElement(By.id('twotabsearchtextbox')).sendKeys('chancletas', Key.RETURN);

        await driver.wait(until.elementLocated(By.id('search')), 20000);

       
        await driver.takeScreenshot().then(
            function(image, err) {
            fs.writeFile(`captureBusqueda/amazon_search_result_id_${Math.random() * 256}.png`, image, 'base64', function(err) {
                if(err) console.log(err);
            });
        });

        resultadosPruebas.push({ testName: 'Búsqueda en Amazon', status: 'Exitosa' });
    } 
    catch (error) {
        console.error('Error en la prueba:', error);
        resultadosPruebas.push({ testName: 'Búsqueda en Amazon', status: 'Fallida' });
     } finally {
        await driver.quit();
        generateHTMLReport(resultadosPruebas);
    }
}
 

function generateHTMLReport(results) {

    let html = '<html><head><title>Reporte de Pruebas</title></head><body>';
        html += '<h1>Reporte de Pruebas Automatizadas</h1>';
        html += '<table border="1"><tr><th>Nombre de la Prueba</th><th>Estado</th></tr>'; 

  
        results.forEach(result => {
            html += `<tr><td>${result.testName}</td><td>${result.status}</td></tr>`;
        });

        html += '</table></body></html>';

 
    fs.writeFileSync(`ReporteBusqueda/reporte_id_${Math.random() * 256}.html`, html);
}

runTest();
