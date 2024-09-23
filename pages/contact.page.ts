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
   * This method also logs an error if the page fails to load.
   */
  public async openUrl(): Promise<void> {
    try {
      await this.open(urls.contact)
    await this.isPageValid(await this.contactPageButton, 'Contact');
    } catch (error: any) {
      console.log(`Error opening Contact page: ${error.message}`);
      throw error;
    }
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
   * Logs an error if the form submission fails.
   */
  public async submitForm(): Promise<void> {
    try {
      console.log('Submitting the feedback form...');
      await this.submitButton.waitForClickable();
      await this.submitButton.click();
    } catch (error: any) {
      console.log(`Error submitting the feedback form: ${error.message}`);
      throw error;
    }
  }

  /**
   * Fill the contact form with both mandatory and optional fields.
   * Logs an error if the form submission fails.
   * @param forename - Mandatory forename field.
   * @param surname - Optional surname field.
   * @param email - Mandatory email field.
   * @param telephone - Optional telephone field.
   * @param message - Mandatory message field.
   */
  public async fillForm(forename: string, surname: string, email: string, telephone: string, message: string): Promise<void> {
    try {
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
    } catch (error: any) {
      console.log(`Error filling up the the form: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click Back Button after the message was submitted.
   * Logs an error if clicking the button fails.
   */
  public async clickBackButton(): Promise<void> {
    try {
      await this.backButton.waitForClickable();
      await this.backButton.click();
    } catch (error: any) {
      console.log(`Error to click Back Button: ${error.message}`);
      throw error;
    }
  }

  //Errors Validations
  
  /**
   * Check and log the error message for the forename field.
   * Logs an error if the message cannot be retrieved.
   * @returns {Promise<string>} - Error message for forename field.
   */
  public async checkForenameError(): Promise<string> {
    try {
      const errorText = await this.forenameError.getText();
      logger(`Forename error: ${errorText}`);
      return errorText;
    } catch (error: any) {
      console.log(`Error retrieving forename error: ${error.message}`);
      throw error;
    }
  }

   /**
   * Check and log the error message for the email field.
   * Logs an error if the message cannot be retrieved.
   * @returns {Promise<string>} - Error message for email field.
   */
  public async checkEmailError(): Promise<string> {
    try {
      const errorText = await this.emailError.getText();
      logger(`Email error: ${errorText}`);
      return errorText;
    } catch (error: any) {
      console.log(`Error retrieving email error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check and log the error message for the message field.
   * Logs an error if the message cannot be retrieved.
   * @returns {Promise<string>} - Error message for message field.
   */
  public async checkMessageError(): Promise<string> {
    try {
      const errorText = await this.messageError.getText();
      logger(`Message error: ${errorText}`);
      return errorText;
    } catch (error: any) {
      console.log(`Error retrieving message error: ${error.message}`);
      throw error;
    }
  }
 
  /**
   * Check all error messages at once.
   * Returns an object containing all error messages.
   * Logs an error if any issue occurs while retrieving messages.
   * @returns {Promise<ErrorMessages>} - Object containing all error messages.
   */
  public async checkAllErrors(): Promise<ErrorMessages> {
    try {
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
    } catch (error: any) {
      console.log(`Error checking all Errors on mandatory fields: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if the error messages are gone after completing mandatory fields.
   * Logs an error if messages are still displayed or if there is an issue checking.
   */
  public async checkAllErrorsAreGone(): Promise<void> {
    try {
      // Wait until error messages are no longer displayed
      console.log('Checking if error messages are gone after completing mandatory fields.');
      await this.forenameError.waitForDisplayed({ reverse: true, timeout: 5000 });
      await this.emailError.waitForDisplayed({ reverse: true, timeout: 5000 });
      await this.messageError.waitForDisplayed({ reverse: true, timeout: 5000 });
    } catch (error: any) {
      console.log(`Error checking for the absence of errors after completing mandatory fields: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validate if the feedback message was sucessfuly completed.
   * Returns the submitted message text.
   */
  public async validateSubmittedMessage(): Promise<string> {
    try {
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
    } catch (error: any) {
      console.log(`Error validating submitted message: ${error.message}`);
      throw error;
    }
  }
}