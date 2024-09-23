import { $ } from '@wdio/globals';
import { BasePage } from './base.page';
import { urls } from '../constants/urls';
import { logger } from '../utils/logger';


export class CartPage extends BasePage {

  // Page Navigation
  /**
   * Navigate to the Cart page and verify if the page is loaded.
   */
  public async openUrl(): Promise<void> {
    await this.open(urls.cart)
    await this.isPageValid(await this.cartPageButton, 'Cart');
  }

  // Collecting the elements on the page
  get cartPageButton () {
    return $('li[class*="active"] a[href*="#/cart"]');
  }

  get emptyCartMessage() {
    return $('div.alert strong');
  }
  
  get totalPrice() {
    return $('tfoot strong.total');
  }

  // Verifications
  
  /**
   * Validate an individual cart item based on its name, price, quantity, and subtotal.
   * Provides detailed logs for each check.
   * @param itemName - Name of the item.
   * @param expectedPrice - Price of the item.
   * @param expectedQuantity - Quantity selected.
   * @param expectedSubtotal - Subtotal.
   */
  public async validateItemInCart(itemName: string, expectedPrice: string, expectedQuantity: number, expectedSubtotal: string): Promise<void> {
    try {
      const item = await $(`//tr[contains(., "${itemName}")]`);
      await item.waitForDisplayed();
      
      if (!item) {
        console.log(`Item ${itemName} not found in the cart.`);
      }
     
      // Collecting values.
      const itemPrice = await item.$('td:nth-child(2).ng-binding');
      await itemPrice.waitForDisplayed();
      const price = await itemPrice.getText();
      
      const itemQuantity = await item.$('td:nth-child(3) input[type="number"]');
      await itemQuantity.waitForDisplayed();
      const quantity = await itemQuantity.getValue();
      
      const itemSubtotal = await item.$('td:nth-child(4).ng-binding');
      await itemSubtotal.waitForDisplayed();
      const subtotal = await itemSubtotal.getText();

      // Logs for debugging
      logger(`Validating cart item: ${itemName}`);
      logger(`Expected price: ${expectedPrice}, Actual price: ${price}`);
      logger(`Expected quantity: ${expectedQuantity}, Actual quantity: ${quantity}`);
      logger(`Expected subtotal: ${expectedSubtotal}, Actual subtotal: ${subtotal}`);
      
      // Perform assertions
      expect(price).toBe(expectedPrice);
      expect(quantity).toBe(expectedQuantity.toString());
      expect(subtotal).toBe(expectedSubtotal);
    } catch (error: any) {
      logger(`Error validating cart item ${itemName}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validate the total price of the cart.
   * @param expectedTotal - Total price expected.
   */
  public async validateTotalPrice(expectedTotal: string): Promise<void> {
    const total = await this.totalPrice.getText();
    expect(total).toBe(expectedTotal);
  }
  
  /**
   * Determine if the cart is empty.
   * If it's empty, return true. If it's not empty, return false.
   */
  public async isCartEmpty(): Promise<boolean> {
    const emptyMessageDisplayed = await this.emptyCartMessage.isDisplayed();
    return emptyMessageDisplayed;
  }

  /**
   * Validate if the cart has specific items.
   * If the cart is empty, throw an error or handle it accordingly.
   * @param expectedItems - array of the items on the cart.
   * @param name - item name.
   * @param price - item price.
   * @param quantity - quantity.
   * @param subtotal - subtotal.
   */
  public async validateCartItems(expectedItems: Array<{ name: string, price: string, quantity: number, subtotal: string }>): Promise<void> {
    const isEmpty = await this.isCartEmpty();

    if (isEmpty) {
        console.log('Cart is empty. No items to validate.');
        throw new Error('Cannot validate items: the cart is empty.');
    } else {
        for (let value of expectedItems) {
          const { name, price, quantity, subtotal } = value;
          await this.validateItemInCart(name, price, quantity, subtotal);
        }
    }
  }
}