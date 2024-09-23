import { HomePage } from '../../pages/home.page';
import { ContactPage } from '../../pages/contact.page';
import { BasePage } from '../../pages/base.page';

describe('Test Case 1: Verify Error Messages on Contact Page', () => {
    const homePage = new HomePage();
    const contactPage = new ContactPage();
    
    it('should verify error messages on the contact page for madatory fields', async () => {
        // 1. From the home page, go to contact page
        await homePage.openUrl();
        await homePage.clickContact();

        // 2. Click submit button without filling any fields
        await contactPage.submitForm();

        // 3. Verify error messages are displayed
        const errors = await contactPage.checkAllErrors();
        expect(errors.forenameError).toBe('Forename is required');
        expect(errors.emailError).toBe('Email is required');
        expect(errors.messageError).toBe('Message is required');

        // 4. Populate mandatory fields (forename, email, message)
        await contactPage.fillForm('John', '', 'john@example.com', '', 'Test message');

        // 5. Validate errors are gone
        await contactPage.checkAllErrorsAreGone();
    });
});

describe('Test Case 2: Validate Successful Submission on Contact Page, running the test 5 times', () => {
    const homePage = new HomePage();
    const contactPage = new ContactPage();
    const basePage = new BasePage();

    // Run this test 5 times to ensure 100% pass rate
    for (let i = 0; i < 5; i++) {
        it(`Test # ${i + 1}: Validate Successful Feedback`, async () => {
            // 1. From the home page, go to contact page
            console.log(`Test # ${i + 1}`);
            await homePage.openUrl();
            await homePage.clickContact();

            // 2. Populate mandatory fields (forename, email, message)
            await contactPage.fillForm('Jane', '', `jane${i}@example.com`, '', `Another test message ${i}`);

            // 3. Click submit button
            await contactPage.submitForm();

            // 4. Validate successful submission message is displayed
            const successMessage = await contactPage.validateSubmittedMessage();
            expect(successMessage).toBe('Thanks Jane');

            // 5. Click Back Button to return to Contact Page
            await contactPage.clickBackButton();

            // 6. Validate if the Contact page is displayed after clicking the Back Button
            const contactPageIsValid = await basePage.isPageValid(await contactPage.contactPageButton, 'Contact');
            expect(contactPageIsValid).toBe(true);
        });
    }
});


