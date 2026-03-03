import { registerAs } from '@nestjs/config';
import { getDatabaseConnectionString } from './parameter-store.service';

export default registerAs('database', async () => {
  // Try to get credentials from AWS Parameter Store first
  if (process.env.USE_AWS_PARAMETER_STORE === 'true') {
    try {
      const parameterName = process.env.DB_PARAMETER_STORE_NAME || '/lambda/skewb-cadent-ctrl-hub-forms-ingest/postgres-forms-ingest-connection-string';
      const credentials = await getDatabaseConnectionString(parameterName);
      
      return {
        host: credentials.host,
        port: credentials.port,
        username: credentials.user,
        password: credentials.password,
        database: credentials.database,
        schema: credentials.schema,
        ssl: credentials.ssl,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV === 'development',
      };
    } catch (error) {
      console.error('Failed to load database credentials from Parameter Store, falling back to environment variables');
    }
  }

  // Fallback to environment variables
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'admin_dashboard',
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  };
});
