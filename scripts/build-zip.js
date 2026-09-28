import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const rootDir = process.cwd();
const outputFile = path.join(rootDir, 'ConnectPurpose-MVP.zip');

const zip = new JSZip();

function addFilesRecursively(dir, zipFolder) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (
      item === 'node_modules' ||
      item === '.git' ||
      item === 'dist' ||
      item === 'ConnectPurpose-MVP.zip' ||
      item === '.DS_Store'
    ) {
      continue;
    }
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subFolder = zipFolder.folder(item);
      addFilesRecursively(fullPath, subFolder);
    } else {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(item, content);
    }
  }
}

console.log('Archiving ConnectPurpose codebase into ZIP file...');
addFilesRecursively(rootDir, zip);

zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
  .pipe(fs.createWriteStream(outputFile))
  .on('finish', () => {
    console.log(`Successfully created ${outputFile} (${fs.statSync(outputFile).size} bytes)`);
  });
