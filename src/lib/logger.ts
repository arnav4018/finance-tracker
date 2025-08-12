// Production-ready logging utility

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
  }

  private log(level: LogLevel, message: string, data?: any) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString();
      const levelName = LogLevel[level];
      
      const logEntry = {
        timestamp,
        level: levelName,
        message,
        ...(data && { data }),
      };

      if (process.env.NODE_ENV === 'production') {
        // In production, you might want to send logs to a service like DataDog, LogRocket, etc.
        console.log(JSON.stringify(logEntry));
      } else {
        // Development logging
        console.log(`[${timestamp}] ${levelName}: ${message}`, data || '');
      }
    }
  }

  error(message: string, data?: any) {
    this.log(LogLevel.ERROR, message, data);
  }

  warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }

  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  debug(message: string, data?: any) {
    this.log(LogLevel.DEBUG, message, data);
  }
}

export const logger = new Logger();