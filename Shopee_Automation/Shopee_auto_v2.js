const fs = require('fs');
const randomWords = require('random-words');

Feature('Shopee Product URl Retrieval');

const loopCount = 1000;

for (let i = 0; i < loopCount; i++) {
  Scenario(`Shopee Navigation - Loop ${i}`, async ({ I }) => {

    const randomWord = randomWords();
    for(i=1;i<=5;i++){
    I.amOnPage(`https://shopee.ph/search?filters=5%2C7&keyword=${randomWord}&noCorrection=true&page=0&ratingFilter=5&sortBy=relevancy`);
    I.wait(5);
    I.waitForElement(`div.dYFPlI:nth-child(4) div.Tbmzcs div.container.Fpp6ve div.sdzgsX div.shopee-search-item-result div.row.shopee-search-item-result__items div.col-xs-2-4.shopee-search-item-result__item:nth-child(${i}) a:nth-child(1) div.tWpFe2 > div.VTjd7p.whIxGK`);
    I.click(`div.dYFPlI:nth-child(4) div.Tbmzcs div.container.Fpp6ve div.sdzgsX div.shopee-search-item-result div.row.shopee-search-item-result__items div.col-xs-2-4.shopee-search-item-result__item:nth-child(${i}) a:nth-child(1) div.tWpFe2 > div.VTjd7p.whIxGK`);
    I.wait(5);
    I.waitForElement('.product-rating-overview__filter--with-comment');  
    const comments = await I.grabTextFrom('.product-rating-overview__filter--with-comment');
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
});
}
