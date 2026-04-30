import { google } from "googleapis";

/**
 * Returns an OAuth2 client authenticated with the stored refresh token.
 * Credentials needed in .env.local:
 *   GOOGLE_CLIENT_ID      – OAuth 2.0 client ID
 *   GOOGLE_CLIENT_SECRET  – OAuth 2.0 client secret
 *   GOOGLE_REFRESH_TOKEN  – offline refresh token obtained once via consent flow
 */
export function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}
