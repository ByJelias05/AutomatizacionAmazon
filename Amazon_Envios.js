const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

async function changeLanguage() {
    let driver = await new Builder().forBrowser('chrome').build();
    let resultadosPruebas = [];

    try {
  
        await driver.get('https://www.amazon.com/');

        await driver.wait(until.elementLocated(By.id('nav-global-location-slot')), 10000);

        await driver.findElement(By.id('nav-global-location-slot')).click();

        await driver.takeScreenshot().then(
            function(image, err) {
                fs.writeFile(`CaptureEnvios/amazon_envios_id_${Math.random() * 256}.png`, image, 'base64', function(err) {
                    if(err) console.log(err);
                });
            }
        );

        resultadosPruebas.push({ testName: 'Envios en Amazon', status: 'Exitoso' });
    } catch (error) {
        console.error('Error en la prueba:', error);
        resultadosPruebas.push({ testName: 'Envios en Amazon', status: 'Fallido' });
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

    fs.writeFileSync(`ReporteEnvio/reporte_id_${Math.random() * 256}.html`, html);
}

changeLanguage();
