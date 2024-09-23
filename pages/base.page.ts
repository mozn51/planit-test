import { browser } from '@wdio/globals';

export class BasePage {
  /**
   * Navigates to a specific URL.
   * @param url - The URL to navigate to.
   */
  public async open(url: string): Promise<void> {
    await browser.url(url);
  }

  /**
   * Validates that the correct page is loaded by checking the active page button.
   * @param pageButtonSelector - The element representing the page button.
   * @param pageName - The name of the page being validated (for logging/debugging purposes).
   */
  public async isPageValid(pageButton: WebdriverIO.Element, pageName: string): Promise<boolean> {
    try {
      const isPageLoaded = await pageButton.isDisplayed();
      if (!isPageLoaded) {
        console.log(`${pageName} page is NOT loaded.`);
      }
      return isPageLoaded;
    } catch (error: any) {
      console.error(`Error validating if ${pageName} page is loaded: ${error.message}`);
        return false;
    }
  }
}
