const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { withRetry } = require('./retry-utils.js');

const AUTH_DIR = './auth';
const TOKEN_PATH = path.join(AUTH_DIR, 'token.json');
const CREDENTIALS_PATH = path.join(AUTH_DIR, 'credentials.json');

const sendToBot = async (message) => {
  console.log(message);
};

class GoogleAPI {
  constructor(auth) {
    this.auth = auth;
    this.sheets = google.sheets({ version: 'v4', auth });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async createSpreadsheet(title) {
    return await withRetry(async () => {
      const response = await this.sheets.spreadsheets.create({
        requestBody: { properties: { title } },
      });
      return response.data.spreadsheetId;
    });
  }

  async getSpreadsheet(spreadsheetId) {
    return await withRetry(async () => {
      return await this.sheets.spreadsheets.get({ spreadsheetId });
    });
  }

  async getValues(spreadsheetId, range = 'A:Z') {
    return await withRetry(async () => {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return response.data.values || [];
    });
  }

  async batchUpdate(spreadsheetId, requests) {
    return await withRetry(async () => {
      return await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests },
      });
    });
  }

  async createPermission(fileId, role = 'reader', type = 'anyone') {
    return await withRetry(async () => {
      return await this.drive.permissions.create({
        fileId,
        requestBody: { role, type },
      });
    });
  }
}

class GoogleAuth {
  static async refreshToken(auth) {
    const currentToken = JSON.parse(fs.readFileSync(TOKEN_PATH));
    const { credentials: newCredentials } = await auth.refreshAccessToken();

    const tokenToSave = {
      access_token: newCredentials.access_token,
      refresh_token: newCredentials.refresh_token || currentToken.refresh_token,
    };

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenToSave, null, 2));
    auth.setCredentials(newCredentials);

    return tokenToSave;
  }

  static async initializeAuth() {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      throw new Error('CREDENTIALS_PATH_NOT_FOUND');
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id } = credentials.installed;
    const auth = new google.auth.OAuth2(client_id, client_secret);

    if (!fs.existsSync(TOKEN_PATH)) {
      throw new Error('TOKEN_PATH_NOT_FOUND');
    }

    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    auth.setCredentials(token);

    const refreshedToken = await GoogleAuth.refreshToken(auth);
    if (!refreshedToken) {
      throw new Error('REFRESH_TOKEN_ERROR');
    }

    return auth;
  }
}

module.exports = {
  GoogleAPI,
  GoogleAuth,
};
