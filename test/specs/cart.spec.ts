import { HomePage } from '../../pages/home.page';
import { ShopPage } from '../../pages/shop.page';
import { CartPage } from '../../pages/cart.page';
import { shopList, ProductName } from '../../data/shopData';

describe('Test Case 3: Validate Cart and Subtotal Calculation', () => {
    const homePage = new HomePage();
    const shopPage = new ShopPage();
    const cartPage = new CartPage();
    
    it('should validate cart subtotals and total', async () => {
        // 1. From the home page, go to shop page
        await homePage.openUrl();
        await homePage.clickShop();

        // 2. Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
        const productList = [
            { name: 'Stuffed_Frog' as ProductName, quantity: 2 }, // Stuffed Frog from shopList
            { name: 'Fluffy_Bunny' as ProductName, quantity: 5 }, // Fluffy Bunny from shopList
            { name: 'Valentine_Bear' as ProductName, quantity: 3 }  // Valentine Bear from shopList
        ];
        await shopPage.buyMultipleProducts(productList);

        // 3. Go to the cart page
        await homePage.clickCart();

        // 4. Verify the subtotal for each product is correct
        const expectedItems = [
            { name: shopList.Stuffed_Frog.name, price: shopList.Stuffed_Frog.price, quantity: 2, subtotal: '$21.98' },
            { name: shopList.Fluffy_Bunny.name, price: shopList.Fluffy_Bunny.price, quantity: 5, subtotal: '$49.95' },
            { name: shopList.Valentine_Bear.name, price: shopList.Valentine_Bear.price, quantity: 3, subtotal: '$44.97' }
        ];
        await cartPage.validateCartItems(expectedItems);

        // 5. Verify the total price = sum of subtotals
        const expectedTotal = 'Total: 116.9'; // Sum of $21.98 + $49.95 + $44.97
        await cartPage.validateTotalPrice(expectedTotal);
    });
});
