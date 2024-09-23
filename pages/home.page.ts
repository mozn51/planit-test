import { $ } from '@wdio/globals'
import { BasePage } from './base.page';
import { urls } from '../constants/urls';

export class HomePage extends BasePage {
  // Page Navigation

  /**
   * Navigate to the Home page and verify if the page is loaded.
   */
  public async openUrl(): Promise<void> {
    await this.open(urls.home)
    await this.isPageValid(await this.homePageButton, 'Home');
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

  // /**
  //  * Click the Start Shopping button after verifying it's clickable.
  //  */
  // public async clickStartShopping(): Promise<void> {
  //   await this.verifyElementClickableAndClick(this.startShoppingButton);
  // }

  /**
   * Click the Shop button after verifying it's clickable.
   */
  public async clickShop(): Promise<void> {
    await this.verifyElementClickableAndClick(this.shopButton);
  }

  /**
   * Click the Cart button after verifying it's clickable.
   */
  public async clickCart(): Promise<void> {
    await this.verifyElementClickableAndClick(this.cartButton);
  }

   /**
   * Click the Contact button after verifying it's clickable.
   */
  public async clickContact(): Promise<void> {
    await this.verifyElementClickableAndClick(this.contactButton);
  }

  /**
   * Verifies if an element is clickable and clicks on it.
   * Logs added for debugging and tracking.
   * @param element - Web element to verify and click.
   */
  public async verifyElementClickableAndClick(element: any): Promise<void> {
    await element.waitForClickable();
    await element.click();
  }
}
