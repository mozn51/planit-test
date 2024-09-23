import { $ } from '@wdio/globals';
import { BasePage } from './base.page';
import { urls } from '../constants/urls';
import { logger } from '../utils/logger';

interface ErrorMessages {
    forenameError: string;
    emailError: string;
    messageError: string;
  }

export class ContactPage extends BasePage {

  // Page Navigation

  /**
   * Navigate to the Contact page and verify if the page is loaded.
   */
  public async openUrl(): Promise<void> {
    await this.open(urls.contact)
    await this.isPageValid(await this.contactPageButton, 'Contact');
  }

  // Collecting the elements on the page
  get contactPageButton () {
    return $('li[class*="active"] a[href*="#/contact"]');
  }

  get forenameField() {
    return $('#forename');
  }

  get surnameField() {
    return $('#surname');
  }

  get emailField() {
    return $('#email');
  }

  get telephoneField() {
    return $('#telephone');
  }

  get messageField() {
    return $('#message');
  }

  get submitButton() {
    return $('//a[text()="Submit"]');
  }

  get forenameError() {
    return $('#forename-err');
  }

  get emailError() {
    return $('#email-err');
  }

  get messageError() {
    return $('#message-err');
  }

  get submittedMessage() {
    return $('div.alert.alert-success strong.ng-binding');
  }

  get backButton() {
    return $('//a[text()="« Back"]');
  }

  // Actions

  /**
   * Submit the contact form by clicking the submit button.
   */
  public async submitForm(): Promise<void> {
    console.log('Submitting the feedback form...');
    await this.submitButton.waitForClickable();
    await this.submitButton.click();
  }

  /**
   * Fill the contact form with both mandatory and optional fields.
   * Provides logs for each field.
   * @param forename - Mandatory forename field.
   * @param surname - Optional surname field.
   * @param email - Mandatory email field.
   * @param telephone - Optional telephone field.
   * @param message - Mandatory message field.
   */
  public async fillForm(forename: string, surname: string, email: string, telephone: string, message: string): Promise<void> {
    if (forename) {
      logger(`Setting forename: ${forename}`);
      await this.forenameField.setValue(forename);
    }

    if (surname) {
      logger(`Setting surname: ${surname}`);
      await this.surnameField.setValue(surname);
    }

    if (email) {
      logger(`Setting email: ${email}`);
      await this.emailField.setValue(email);
    }

    if (telephone) {
      logger(`Setting telephone: ${telephone}`);
      await this.telephoneField.setValue(telephone);
    }

    if (message) {
      logger(`Setting message: ${message}`);
      await this.messageField.setValue(message);
    }
  }

  public async clickBackButton(): Promise<void> {
    await this.backButton.waitForClickable();
    await this.backButton.click();

  }

  //Errors Validations
  
  /**
   * Check and log the error message for the forename field.
   * @returns {Promise<string>} - Error message for forename.
   */
  public async checkForenameError(): Promise<string> {
    const errorText = await this.forenameError.getText();
    logger(`Forename error: ${errorText}`);
    return errorText;
  }

   /**
   * Check and log the error message for the email field.
   * @returns {Promise<string>} - Error message for email.
   */
  public async checkEmailError(): Promise<string> {
    const errorText = await this.emailError.getText();
    logger(`Email error: ${errorText}`);
    return errorText;
  }

  /**
   * Check and log the error message for the message field.
   * @returns {Promise<string>} - Error message for message.
   */
  public async checkMessageError(): Promise<string> {
    const errorText = await this.messageError.getText();
    logger(`Message error: ${errorText}`);
    return errorText;
  }
 
  /**
   * Check all error messages at once.
   * Logs each error and returns them in an object.
   * @returns {Promise<ErrorMessages>} - Object containing all error messages.
   */
  public async checkAllErrors(): Promise<ErrorMessages> {
    console.log('Validating errors messages for empty mandatory fields.');
    await this.forenameError.waitForDisplayed({ timeout: 5000 });
    const forenameError = await this.forenameError.getText();

    await this.emailError.waitForDisplayed({ timeout: 5000 });
    const emailError = await this.emailError.getText();
    
    await this.messageError.waitForDisplayed({ timeout: 5000 });
    const messageError = await this.messageError.getText();

    logger(`Forename error: ${forenameError}`);
    logger(`Email error: ${emailError}`);
    logger(`Message error: ${messageError}`);

    return { forenameError, emailError, messageError };
  }


  public async checkAllErrorsAreGone(): Promise<void> {
    // Wait until error messages are no longer displayed
    console.log('No errors messages after completing mandatory fields.');
    await this.forenameError.waitForDisplayed({ reverse: true, timeout: 5000 });
    await this.emailError.waitForDisplayed({ reverse: true, timeout: 5000 });
    await this.messageError.waitForDisplayed({ reverse: true, timeout: 5000 });
}


  public async validateSubmittedMessage(): Promise<string> {
    logger("Waiting for the pop up message to disapper...");
    const feedbackModal = $('.popup.modal');
    await feedbackModal.waitForDisplayed({ reverse: true, timeout: 20000 });
        
    logger("Waiting for the success message to be displayed...");
    await (await this.submittedMessage).waitForDisplayed();

    const messageText = await this.submittedMessage.getText();
    logger(`Success message text: ${messageText}`);

    expect(messageText).toContain('Thanks');
    console.log(`Submitted success message validated: ${messageText}`);

    // Check if the "Back" button is visible
    const backButtonVisible = await this.backButton.isDisplayed();
    expect(backButtonVisible).toBe(true);
    
    return messageText;
}
}