export default interface EnvironmentVariables {
  APP_NAME: string;
  APP_TIMEZONE: string;
  PORT: number;
  JWT_EXPIRES_IN_SECONDS: number;
  JWT_SECRET_KEY: string;

  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_LOGGING: string;

  AWS_SES_MAIL_FROM_ADDRESS: string;
  AWS_SES_MAIL_FROM_NAME: string;
}
