const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(__dirname, '../public/images/filmo_liveAlone');
const outputFile = path.join(__dirname, '../src/data/imageMetadata.json');

const generateMetadata = () => {
  const metadata = {};

  fs.readdirSync(imageDirectory).forEach(folder => {
    const folderPath = path.join(imageDirectory, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      metadata[folder] = {};
      
      fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .forEach(file => {
          const normalizedKey = file.normalize('NFC');
          const fileStats = fs.statSync(path.join(folderPath, file));
          
          metadata[folder][normalizedKey] = {
            originalName: file,
            normalizedName: normalizedKey,
            size: fileStats.size,
            modifiedDate: fileStats.mtime,
            path: `images/live_alone/${folder}/${file}`
          };
        });
    }
  });

  return metadata;
};

const imageMetadata = generateMetadata();

fs.writeFileSync(outputFile, JSON.stringify(imageMetadata, null, 2));

console.log('Image metadata generated successfully.');