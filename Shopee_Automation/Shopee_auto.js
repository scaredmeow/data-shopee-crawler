const fs = require('fs');
const randomWords = require('random-words');

Feature('WP Site Test');

const loopCount = 200;

for (let i = 0; i < loopCount; i++) {
  Scenario(`Shopee Navigation - Loop ${i}`, async ({ I }) => {
    I.amOnPage(`https://shopee.ph`);
    I.click('x');
    I.wait(3);
    I.click({css: 'input.shopee-searchbar-input__input'});

    const randomWord = randomWords();

    // Fill the input field with the random word
    I.fillField({css: 'input.shopee-searchbar-input__input'}, randomWord);

    I.click('button.btn-solid-primary.shopee-searchbar__search-button');
    I.waitForElement('div.VTjd7p.whIxGK');
    I.click('div.VTjd7p.whIxGK');
    I.wait(3);
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
  });
}
