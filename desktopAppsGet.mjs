import fs from 'fs';
import path from 'path';

import { desktopFileParse } from './desktopFileParse.mjs';

const USER = process.env.USER;

const desktopEntriesDirUSER = `/home/${USER}/.local/share/applications`;
const desktopEntriesDirSYS = '/usr/share/applications';

function desktopAppsGet () {
  
  const systemApps = main('system', desktopEntriesDirSYS);
  const userApps = main('user', desktopEntriesDirUSER);

  let allApps = [ 
    ...systemApps, 
    ...userApps 
  ];

  return allApps;
}

function main (wide, entriesDir) {

  const apps = [];

  try {

    const files = fs.readdirSync(entriesDir, 'utf8');;

    files.forEach(file => {

      if (path.extname(file) === '.view') {

        const filePath = path.join(entriesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const app = desktopFileParse(content);

        apps.push({ ...app, wide });
        
      }

    });

  } catch (err) {
    console.error(`Error reading ${wide}-specific applications:`, err);
  }

  return apps;
  
}

export default desktopAppsGet;


