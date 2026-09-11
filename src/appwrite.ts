// Appwrite client shared by the data services.
//
// None of these values are secrets — the web SDK is designed to run in the
// browser, and access is controlled by the table permissions in the Appwrite
// console (the tables below need `Read` granted to the `Any` role so visitors
// can load them without signing in).
import { Client, TablesDB } from 'appwrite';

/** Region-specific Appwrite Cloud endpoint, e.g. https://fra.cloud.appwrite.io/v1 */
const APPWRITE_ENDPOINT = 'https://<REGION>.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '<YOUR_PROJECT_ID>';

/** Database that holds the three content tables. */
export const APPWRITE_DATABASE_ID = '<YOUR_DATABASE_ID>';

/** Table IDs, as set in the Appwrite console. */
export const TABLES = {
  books: 'books',
  projects: 'projects',
  blogs: 'blogs',
} as const;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

export { client, tablesDB };
