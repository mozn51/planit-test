import { $ } from '@wdio/globals'
import { BasePage } from './base.page';
import { urls } from '../constants/urls';
import { logger } from '../utils/logger';

export class HomePage extends BasePage {
  // Page Navigation

  /**
   * Navigate to the Home page and verify if the page is loaded.
   * This method also logs an error if the page fails to load.
   */
  public async openUrl(): Promise<void> {
    try {
      await this.open(urls.home)
      await this.isPageValid(await this.homePageButton, 'Home');
    } catch (error: any) {
      console.log(`Error opening Home page: ${error.message}`);
      throw error;
    }
  }

  // Collecting the elements on the page
  get homePageButton () {
    return $('li[class*="active"] a[href*="#/home"]');
  }

  get startShoppingButton() {
    return $('//a[text()="Start Shopping »"]');
  }

  get shopButton() {
    return $('//a[text()="Shop"]');
  }

  get contactButton() {
    return $('//a[text()="Contact"]');
  }

  get cartButton() {
    return $('//a[@href="#/cart"]');
  }  

  //Actions

  /**
   * Click the Shop button after verifying it's clickable.
   */
  public async clickShop(): Promise<void> {
    const shopButton = await this.shopButton;
    await this.verifyElementClickableAndClick(shopButton);
  }

  /**
   * Click the Cart button after verifying it's clickable.
   */
  public async clickCart(): Promise<void> {
    const cartButton = await this.cartButton;
    await this.verifyElementClickableAndClick(cartButton);
  }

   /**
   * Click the Contact button after verifying it's clickable.
   */
  public async clickContact(): Promise<void> {
    const contactButton = await this.contactButton;
    await this.verifyElementClickableAndClick(contactButton);
  }

  /**
   * Verifies if an element is clickable and clicks on it.
   * Logs added for debugging and tracking.
   * @param element - Web element to verify and click.
   */
  public async verifyElementClickableAndClick(element: any): Promise<void> {
    try {
      await element.waitForClickable();
      logger(`Element ${element.selector} is clickable, proceeding to click.`);
      await element.click();
    }catch (error: any) {
      console.log(`Error clicking element ${element.selector}: ${error.message}`);
      throw error;
    }
  }
}
