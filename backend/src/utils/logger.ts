import winston from 'winston'

// Create a logger instance with Winston
export const logger = winston.createLogger({
  // Define the format of the logs as JSON
  format: winston.format.combine(
    // Add colorization to the logs
    winston.format.colorize(),
    // Add timestamp to the logs
    winston.format.timestamp(),
    // Define the format of the logs as JSON
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`
    })
  ),
  // Define the transports (where the logs will be output)
  transports: [
    // Output logs to the console
    new winston.transports.Console({}),
    // Output 'info' level logs to a file
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    // Output 'error' level logs to a file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Output all logs to a combined file
    new winston.transports.File({ filename: `logs/combined.log` }),
  ],
})

// Define the log levels that can be used
type LogLevel = 'info' | 'warn' | 'error' | 'debug'

/**
 * Logs a message with context information.
 *
 * @param level - The level/severity of the log (e.g., 'info', 'warn', 'error', 'debug').
 * @param serviceName - The name of the service or component generating the log.
 * @param message - The log message.
 * @param meta - Additional metadata to include in the log (default is an empty object).
 */
export const logWithContext = (
  level: LogLevel,
  serviceName: string,
  message: string,
  meta: Record<string, unknown> = {}
) => {
  // Log the message with the specified level and additional context
  logger.log(level, { service: serviceName, message, ...meta })
}
