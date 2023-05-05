const fs = require(`fs`);
const randomWords = require( `random-words`);
const wordList = fs.readFileSync('WordList.txt', 'utf-8').split('\n');

Feature('Shopee Product URl Retrieval');

const loopCount = 1000;

for (let i = 0; i < loopCount; i++) {
  Scenario(`Shopee Navigation - Loop ${i}`, async ({ I }) => {
    
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];

    I.clearCookie();
    //I.refreshPage();
    I.amOnPage('https://shopee.ph/buyer/login?next=https%3A%2F%2Fshopee.ph%2F');
    I.waitForElement(`input[name="loginKey`,10);
    I.fillField(`input[name="loginKey`,'');
    I.waitForElement(`//input[@name="password"]`,10);
    I.fillField(`//input[@name="password"]`,'');
    I.pressKey('Enter');
    I.openNewTab();
    for(i=1;i<=10;i++){
    //I.amOnPage(`https://shopee.ph/search?filters=5%2C7&keyword=${randomWord}&noCorrection=true&page=0&ratingFilter=5&sortBy=relevancy`);
    //I.amOnPage(`https://shopee.ph/user/purchase/?is_from_login=true`);
    I.wait(3);
    I.amOnPage(`https://shopee.ph/search?filters=5%2C7&keyword=${randomWord}&page=0&sortBy=relevancy`);
    I.waitForElement(`div.dYFPlI:nth-child(4) div.Tbmzcs div.container.Fpp6ve div.sdzgsX div.shopee-search-item-result div.row.shopee-search-item-result__items div.col-xs-2-4.shopee-search-item-result__item:nth-child(${i}) a:nth-child(1) div.tWpFe2 > div.VTjd7p.whIxGK`,30);
    I.click(`div.dYFPlI:nth-child(4) div.Tbmzcs div.container.Fpp6ve div.sdzgsX div.shopee-search-item-result div.row.shopee-search-item-result__items div.col-xs-2-4.shopee-search-item-result__item:nth-child(${i}) a:nth-child(1) div.tWpFe2 > div.VTjd7p.whIxGK`);
    tryTo(()=>{
       I.waitForElement('#main > div > div:nth-child(3) > div.theme--ofs > div.ndOSOO > div > div > div.UwHWuz > div.page-product__content > div.page-product__content--left > div:nth-child(2) > div > div > div.product-rating-overview > div.product-rating-overview__filters > div:nth-child(7)',30) 
       I.scrollTo('#main > div > div:nth-child(3) > div.theme--ofs > div.ndOSOO > div > div > div.UwHWuz > div.page-product__content > div.page-product__content--left > div:nth-child(2) > div > div > div.product-rating-overview > div.product-rating-overview__filters > div:nth-child(7)')
    });

      
    const comments = await I.grabTextFrom('#main > div > div:nth-child(3) > div.theme--ofs > div.ndOSOO > div > div > div.UwHWuz > div.page-product__content > div.page-product__content--left > div:nth-child(2) > div > div > div.product-rating-overview > div.product-rating-overview__filters > div:nth-child(7)');
    const commentsCount = parseInt(comments.replace(/[^0-9]/g, ''));
    const hasK = comments.includes('K');

    if (commentsCount > 100 || hasK) {
      const url = await I.grabCurrentUrl();
      await I.say(`The URL is ${url}`);
      const dir = './Outputs/';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.appendFileSync(`${dir}/Compiled_URLs.txt`, `${url}\n`);
    }
  }
  I.closeCurrentTab();
});
}
 