import * as winston from 'winston';

// Define log levels as an enum
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

// Check if Winston is enabled
const isWinstonEnabled = process.env.USE_WINSTON === 'true';

let logger: winston.Logger | null = null;

if (isWinstonEnabled) {
  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || LogLevel.INFO,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',  // Custom format for the timestamp
      }),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(), // Log to console
    ],
  });
}

// Function to ensure valid log levels are passed
export const customLogger = (message: string, level: LogLevel) => {
  if (isWinstonEnabled && logger) {
    logger.log({ level, message });
  } else {
    // Default to console logging with log level
    const timestamp = new Date().toISOString();  // Add a simple ISO timestamp for fallback
    console.log(`${timestamp} [${level.toUpperCase()}]: ${message}`);
  }
};
