import { browser } from '@wdio/globals';
import { customLogger, LogLevel } from '../utils/logger';

export class BasePage {
  /**
   * Navigates to a specific URL.
   * @param url - The URL to navigate to.
   */
  public async open(url: string): Promise<void> {
    try {
      await browser.url(url);
      customLogger(`Navigated to ${url}`, LogLevel.INFO);
    } catch (error: any) {
      customLogger(`Error navigating to ${url}: ${error.message}`, LogLevel.ERROR);
    }
  }

  /**
   * Validates that the correct page is loaded by checking the active page button.
   * This method also logs an error if the page fails to load.
   * @param pageButtonSelector - The element representing the page button.
   * @param pageName - The name of the page being validated (for logging/debugging purposes).
   */
  public async isPageValid(pageButton: WebdriverIO.Element, pageName: string): Promise<boolean> {
    try {
      const isPageLoaded = await pageButton.isDisplayed();
        if (isPageLoaded) {
            customLogger(`${pageName} page is loaded successfully.`, LogLevel.INFO);
        } else {
          customLogger(`${pageName} page is NOT loaded.`, LogLevel.ERROR);
        }
      return isPageLoaded;
    } catch (error: any) {
      customLogger(`Error validating if ${pageName} page is loaded: ${error.message}`, LogLevel.ERROR);
        return false;
    }
  }
}
