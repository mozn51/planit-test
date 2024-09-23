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
</details>
<details>
<summary><h2>Running the Tests</h2></summary>
You can execute the test suite by running the following command:
This will run all tests defined in the test/specs/ folder using the configuration provided in wdio.conf.ts.

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

### Debugging:
To debug the test cases, you can use the following steps:
```bash
npx wdio run wdio.conf.ts --debug
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
<details>
<summary><h2>Logging</h2></summary>

The project uses a logging utility in `utils/logger.ts`. Logs are primarily used for:

- Capturing the state of tests.
- Helping with debugging during Jenkins CI runs.
</details>