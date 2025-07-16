import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

//  load serviceAccountKey.json in ESM
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL('../serviceAccountKey.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

export const db = admin.firestore();

