import { test } from '@playwright/test';

test('test web table', async ({ page }) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    /*
    element container: //table[@id='countries']
    .//tr  -> filas
    
    //table[@id='countries']//tr[2]//td[1]  -> Check
    //table[@id='countries']//tr[2]//td[2]  -> Country
    //table[@id='countries']//tr[2]//td[3]  -> Capital
    //table[@id='countries']//tr[2]//td[4]  -> Currency
    //table[@id='countries']//tr[2]//td[5]  -> Primary Language
    
    
    */

    //Localizo el contenedor de la tabla
    const tableContainer = await page.locator("//table[@id='countries']");
    //Saco elemento filas
    const rows = await tableContainer.locator("//tr").all();
    //Las recorro para imprimir los textos

    console.log(rows.length);

    for (let row of rows) {
        console.log(await row.innerText());
    }



    //Imprime los datos de la fila 1

    const row1 = rows.at(1);
    const countryName = await row1?.locator("//td[2]").first().innerText();
    const countryCapital = await row1?.locator("//td[3]").first().innerText();
    const countryCurrency = await row1?.locator("//td[4]").first().innerText();
    const countryPrimaryLanguage = await row1?.locator("//td[5]").first().innerText();

    console.log(countryName, countryCapital, countryCurrency, countryPrimaryLanguage);


    //Aqui creo la interfaz Countries para darle forma, un contrato

    interface Country {
        name: string;
        capital: string;
        currency: string;
        primaryLanguage: string;
    }

    //me creo el objeto Countries

    const countries: Country[] = [];

    for (let row of rows) {
        let country: Country = {
            name: await row.locator("//td[2]").innerText(),
            capital: await row.locator("//td[3]").innerText(),
            currency: await row.locator("//td[4]").innerText(),
            primaryLanguage: await row.locator("//td[5]").innerText(),
        }


        //y lo relleno con todos los paises
        countries.push(country);


        //y los imprimo, ya estan MAPEADOS
    }
    console.log(countries);


});