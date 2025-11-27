const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config = {
  cosmos: {
    connectionString: getEnvVar("COSMOS_CONNECTION_STRING"),
    databaseName: getEnvVar("COSMOS_DATABASE_NAME"),
    containerName: getEnvVar("COSMOS_CONTAINER_NAME"),
    rsvpsContainerName: getEnvVar("COSMOS_RSVPS_CONTAINER_NAME"),
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
} as const;

// Type for the config object
export type Config = typeof config;
