const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

require("chromedriver");

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Sandbox", () => {
  let browser;

  before(async function fn() {
    this.timeout(20000);
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://e2e-boilerplates.github.io/sandbox/");
  });

  after(() => {
    browser.quit();
  });

  it("Should be on Sandbox", async () => {
    const title = await browser.getTitle();
    const header = await browser.findElement(By.css("h1"));

    expect(title).to.equal("Sandbox");
    header.getText().then(text => {
      expect(text).to.equal("Sandbox");
    });
  });
});
