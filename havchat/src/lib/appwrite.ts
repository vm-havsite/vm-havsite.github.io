
import { Client, Storage } from 'appwrite';

// Initialize Appwrite SDK
const client = new Client();

// Replace these with your actual Appwrite configuration
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'; // Your Appwrite endpoint
const APPWRITE_PROJECT_ID = 'havsite-user-login-0';            // Your Appwrite project ID
const APPWRITE_BUCKET_ID = 'havsite-storage-1';             // Your Appwrite bucket ID

// Configure the client
client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// Initialize Storage
const storage = new Storage(client);

export { client, storage, APPWRITE_BUCKET_ID };
