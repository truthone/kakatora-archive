// Required libraries
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Load credentials from environment variables or credentials.json
const credentials = JSON.parse(fs.readFileSync(path.resolve('./credentials.json')));
const { client_id, client_secret, redirect_uris } = credentials.installed;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oauth2Client.setCredentials(JSON.parse(process.env.YOUTUBE_TOKEN));

const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

// Utility function to create a playlist
async function createPlaylist(title, description = 'Generated playlist') {
  const response = await youtube.playlists.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title,
        description,
      },
      status: {
        privacyStatus: 'unlisted',
      },
    },
  });
  return response.data;
}

// Utility function to append data to Google Sheets
async function appendToSheet(sheetId, data) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    requestBody: {
      values: data,
    },
  });
}

// Main function to create playlists from Google Sheets data
async function createPlaylistsFromSheet(sheetId) {
  const sheetData = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1!A2:D', // Adjust range based on your sheet structure
  });

  const rows = sheetData.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found in the sheet.');
    return;
  }

  const playlistData = [];
  for (const row of rows) {
    const [year, category, title] = row; // Assuming columns are in this order
    if (!year || !category || !title) continue; // Skip incomplete rows

    const playlistTitle = `${year}-${category}-${title}`;
    try {
      const playlist = await createPlaylist(playlistTitle);
      playlistData.push([playlistTitle, playlist.id, playlist.snippet.title, playlist.status.privacyStatus]);
      console.log(`Created playlist: ${playlistTitle} (ID: ${playlist.id})`);
    } catch (error) {
      console.error(`Failed to create playlist for ${playlistTitle}:`, error.message);
    }
  }

  if (playlistData.length > 0) {
    try {
      await appendToSheet(sheetId, playlistData);
      console.log('Playlist data appended to Google Sheets.');
    } catch (error) {
      console.error('Failed to append data to Google Sheets:', error.message);
    }
  }
}

// Execute the script
(async () => {
  const SHEET_ID = 'your-google-sheet-id'; // Replace with your Google Sheet ID

  try {
    await createPlaylistsFromSheet(SHEET_ID);
    console.log('Process completed.');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
