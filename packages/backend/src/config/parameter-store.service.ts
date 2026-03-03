import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({ region: process.env.AWS_REGION || 'eu-west-2' });

export interface DatabaseCredentials {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  schema?: string;
  ssl?: boolean | { rejectUnauthorized: boolean };
}

async function getParameter(parameterName: string, withDecryption: boolean = true): Promise<string> {
  const command = new GetParameterCommand({
    Name: parameterName,
    WithDecryption: withDecryption,
  });

  const response = await ssmClient.send(command);
  
  if (!response.Parameter?.Value) {
    throw new Error(`Parameter ${parameterName} not found or has no value`);
  }

  return response.Parameter.Value;
}

export async function getDatabaseConnectionString(
  parameterName: string = '/lambda/skewb-cadent-ctrl-hub-forms-ingest/postgres-forms-ingest-connection-string'
): Promise<DatabaseCredentials> {
  try {
    const connectionStringJson = await getParameter(parameterName, true);
    const credentials = JSON.parse(connectionStringJson);

    return {
      host: credentials.host,
      port: credentials.port,
      database: credentials.database,
      user: credentials.user,
      password: credentials.password,
      schema: credentials.schema,
      ssl: credentials.ssl,
    };
  } catch (error) {
    console.error('Error retrieving database connection string:', error);
    throw error;
  }
}
