import { $ } from '@wdio/globals';
import { BasePage } from './base.page';
import { urls } from '../constants/urls';
import { shopList, ProductName } from '../data/shopData';
import { customLogger, LogLevel } from '../utils/logger';

export class ShopPage extends BasePage {
  
  // Page Navigation

  /**
   * Navigate to the Shop page and verify if the page is loaded.
   * This method also logs an error if the page fails to load.
   */
  public async openUrl(): Promise<void> {
    try {
      await this.open(urls.shop);
      await this.isPageValid(await this.shopPageButton, 'Shop');
      customLogger('Navigated to Shop page successfully', LogLevel.INFO);
    } catch (error: any) {
      customLogger(`Error opening Shop page: ${error.message}`, LogLevel.ERROR);
      throw error;
    }
  }

  // Collecting the elements on the page
  get shopPageButton() {
    return $('li[class*="active"] a[href*="#/shop"]');
  }

  // Actions

  /**
   * Method to get the elements of a product by its name (from shopList).
   * Logs the retrieval process and throws an error if the product is not found.
   * Provides easy access to product details: name, price, and buy button.
   * @param productName - The name of the product (from shopList).
   */
  public getProductElements(productName: ProductName) {
    const product = shopList[productName];
    if (!product) {
      customLogger(`Product ${productName} not found in shopList`, LogLevel.ERROR);
      throw new Error(`Product ${productName} not found in shopList`);
    }
    customLogger(`Product elements found for ${product.name}`, LogLevel.INFO);
    return {
      productNameElement: $(`//h4[contains(text(), "${product.name}")]`),
      productPriceElement: $(`//h4[contains(text(), "${product.name}")]/following-sibling::p[@class="product-price"]`),
      buyButton: $(`//h4[contains(text(), "${product.name}")]/following-sibling::p//a[text()="Buy"]`)
    };
  }

  /**
   * Method to buy a product by its name.
   * Logs the action being performed and throws an error if it fails.
   * @param productName - The name of the product (from shopList).
   * @param quantity - The number of items to buy.
   */
  public async buyProduct(productName: ProductName, quantity: number): Promise<void> {
    try {
      const { buyButton } = this.getProductElements(productName);
      customLogger(`Buying ${quantity} of ${productName}`, LogLevel.INFO);

      for (let i = 0; i < quantity; i++) {
        // Ensure the product's Buy button is clickable before clicking it
        await buyButton.waitForClickable();
        customLogger(`Clicking buy button for product ${productName}, iteration ${i + 1}`, LogLevel.INFO);
        await buyButton.click();
      }
    } catch (error: any) {
      customLogger(`Error buying product ${productName}: ${error.message}`, LogLevel.ERROR);
      throw error;
    }
  }

  /**
   * Method to buy multiple products based on the provided product names and quantities.
   * @param productList - Array of products, each with a name and quantity.
   */
  public async buyMultipleProducts(productList: { name: ProductName, quantity: number }[]): Promise<void> {
    try {
      customLogger('Starting to buy multiple products...', LogLevel.INFO);
      for (const product of productList) {
        await this.buyProduct(product.name, product.quantity);
      }
      customLogger('Finished buying all products.', LogLevel.INFO);
    } catch (error: any) {
      customLogger(`Error buying multiple products: ${error.message}`, LogLevel.ERROR);
      throw error;
    }
  }
}

// Note: The following products are currently used in test cases:
// - Stuffed_Frog
// - Fluffy_Bunny
// - Valentine_Bear

// These are available for future tests:
// - Teddy_Bear
// - Handmade_Doll
// - Funny_Cow
// - Smiley_Face
// - Smiley_Bear
