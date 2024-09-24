# Project Overview
This project is an automated testing framework built with WebdriverIO, TypeScript, and Mocha.
It includes various test cases to validate functionalities such as adding products to a cart, validating cart totals, and submitting forms on a contact page.

The project integrates with Jenkins for continuous integration, ensuring the tests are run automatically after each code push.

<details>
<summary><h2>Project Structure</h2></summary>
The project follows a typical WebdriverIO structure with additional separation for page objects and data files.

```bash
├── constants/
│   └── urls.ts                 # URL Constants
├── data/
│   └── shopData.ts             # Contains product data for tests
├── logs/                       # Folder where log files will be stored
├── pages/
│   ├── base.page.ts            # Base page containing common functions
│   ├── cart.page.ts            # Page object for the Cart Page
│   ├── contact.page.ts         # Page object for the Contact Page
│   ├── home.page.ts            # Page object for the Home Page
│   ├── shop.page.ts            # Page object for the Shop Page
├── test/
│   └── specs/
│       ├── cart.spec.ts        # Test cases for the Cart
│       ├── contact.spec.ts     # Test cases for the Contact Page
├── utils/
│   └── logger.ts               # Utility for logging
|── .env                        # Environment variables for the project
├── wdio.conf.ts                # WebdriverIO configuration
├── .gitignore                  # Files to ignore in git
├── README.md                   # Project README file
└── tsconfig.json               # TypeScript configuration
```
</details>
<details>
<summary><h2>Setup Instructions</h2></summary>
To set up the project locally, follow these steps:

### Prerequisites
- **Node.js** (version 12.x or higher)
- **npm** (Node Package Manager)
- **WebdriverIO** (for running browser automation)
- **Java** (for Jenkins setup)

### Installation

### 1. Clone the repository:
```bash
git clone <repository-url>
cd planit-test
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Ensure that **Java** is installed on your system for Jenkins setup, which you can verify by running:
```bash
java -version
```

### 4. Configure Environment Variables:
Create a `.env` file in the root of your project directory. This file is used to set important configuration options, such as enabling/disabling Winston logging and setting the log level.

Example `.env` file:
```bash
USE_WINSTON=true
LOG_LEVEL=info
```
You can modify these values based on your logging preferences and requirements.

</details>
<details>
<summary><h2>Running the Tests</h2></summary>
You can execute the test suite by running the following command:
This will run all tests defined in the test/specs/ folder using the configuration provided in wdio.conf.ts.

The `.env` file controls the logging output during test execution.
Ensure that the `.env` file is correctly set up before running the tests to adjust the verbosity of logs and the logger backend (Winston or console).

```bash
npx wdio run wdio.conf.ts
```
or
```bash
npm test
```

## Running specific tests
If you want to run a specific test suite, you can modify the command like this:
You can replace cart.spec.ts with any test file you want to execute individually.
```bash
npx wdio run wdio.conf.ts --spec test/specs/cart.spec.ts
```
</details>
<details>
<summary><h2>Jenkins Integration</h2></summary>

### Set up **Jenkins** if necessary.

This project is ready for Jenkins integration. Follow the instructions below to set it up:

### 1. Install Jenkins (if not already installed)
If you don't have Jenkins installed on your local machine or server, you can follow the installation instructions [here](https://www.jenkins.io/doc/book/installing/).

### 2. Configure Jenkins Job
- Create a new Jenkins job.
- Under "Source Code Management," add your Git repository.
- Under "Build," add an "Execute Shell" or "Execute Batch Command" build step with the following command:
```bash
npm install
npx wdio run wdio.conf.ts
```

Ensure that the `.env` file is included or configured within Jenkins so that environment variables such as `USE_WINSTON` and `LOG_LEVEL` are correctly applied when running the tests. This will allow Jenkins to use the same logging configuration as your local environment.

</details>
<details>
<summary><h2>Troubleshooting</h2></summary>

### Common Issues:

 - **WebdriverIO not finding elements:**
   - Ensure that element selectors are correct and that the application is loading as expected.
   - Use browser debug tools (like Chrome DevTools) to verify element selectors.

 - **Test failures due to timeouts:**
   - You can increase the timeout durations in `wdio.conf.ts` under `waitforTimeout` and `connectionRetryTimeout`.

 - **Issues with Jenkins:**
   - Make sure Jenkins has access to all necessary environment variables and system paths.
   - Check Jenkins logs for any issues with plugin installations or builds.
 
 - **Issues with logs:**
    - If logs are not appearing as expected or the tests are failing unexpectedly, check the `.env` file to ensure the environment variables are correctly set.
    - For example, setting `LOG_LEVEL=debug` can provide more detailed logs for troubleshooting.

### Debugging:
To debug the test cases, you can use the following steps:
```bash
npx wdio run wdio.conf.ts --debug
```
</details>
<details>
<summary><h2>Logging</h2></summary>

The project uses a logging utility located in `utils/logger.ts`. This allows consistent logging across different environments with or without Winston.

#### Using Winston
By default, Winston is used to capture and format logs. If Winston is enabled via environment variables, logs will be structured with timestamps and log levels (e.g., INFO, ERROR). Logs can also be directed to different transports (e.g., files, console).

#### Environment Configuration
Environment Configuration

Logging behavior is controlled by environment variables defined in the `.env` file. Here's how to configure it:

```bash
USE_WINSTON=true  # Enable or disable Winston logging
LOG_LEVEL=info    # Set the log level (info, warn, error, debug)
```

If Winston is disabled, a simpler console logging system is used, which outputs logs directly to the console with timestamps in ISO format.

#### Log Levels
- **INFO**: General information about test steps.
- **WARN**: Warnings about potential issues.
- **ERROR**: Critical issues that cause test failures.
- **DEBUG**: Detailed debugging information, useful for development and troubleshooting.

#### Example Log Output:

Logs will include the following information:

 - Timestamp (in the format YYYY-MM-DD HH:mm:ss or ISO 8601 for fallback)
 - Log level (INFO, WARN, ERROR, DEBUG)
 - Message detailing the current test step or error


Example output with Winston or without Winston

```bash
2024-09-24 15:34:56 [INFO]: Navigated to Shop page successfully
2024-09-24 15:34:57 [ERROR]: Error adding product to cart: Product not found
```

#### How to use Logging:

To add custom log messages throughout the code, use the `customLogger` function:

```bash
customLogger('Navigated to Shop page successfully', LogLevel.INFO);
```
</details>
<details>
<summary><h2>Future Improvements</h2></summary>

1. **Add More Test Coverage**:
   - Expand the test coverage to include edge cases and negative test scenarios.

2. **Integration with Cloud Testing Platforms**:
   - Integrate with services like BrowserStack or Sauce Labs to execute tests on multiple browsers and devices.

3. **Improve Reporting**:
   - Implement enhanced test reporting, perhaps using Allure or a similar reporting tool.

4. **Parallel Test Execution**:
   - Configure WebdriverIO to run tests in parallel across different browser sessions to reduce execution time.

</details>