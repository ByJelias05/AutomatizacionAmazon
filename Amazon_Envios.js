const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

async function changeLanguage() {
    let driver = await new Builder().forBrowser('chrome').build();
    let resultadosPruebas = [];

    try {
        // Abrir la página de Amazon
        await driver.get('https://www.amazon.com/');

        // Esperar hasta que el botón de idioma esté presente y sea interactuable
        await driver.wait(until.elementLocated(By.id('nav-global-location-slot')), 10000);

        // Hacer clic en el botón de idioma
        await driver.findElement(By.id('nav-global-location-slot')).click();

        // Tomar una captura de pantalla
        await driver.takeScreenshot().then(
            function(image, err) {
                fs.writeFile('CaptureEnvios/amazon_spanish.png', image, 'base64', function(err) {
                    if(err) console.log(err);
                });
            }
        );

        resultadosPruebas.push({ testName: 'Cambio de Idioma en Amazon', status: 'Exitoso' });
    } catch (error) {
        console.error('Error en la prueba:', error);
        resultadosPruebas.push({ testName: 'Cambio de Idioma en Amazon', status: 'Fallido' });
    } finally {
        // Cerrar el navegador
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

    fs.writeFileSync('ReporteEnvio/reporte.html', html);
}

changeLanguage();
