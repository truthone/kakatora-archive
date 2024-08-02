const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(__dirname, '../public/images/tv-liveAlone');
const outputFile = path.join(__dirname, '../src/data/imageList.json');

const imageList = {};

fs.readdirSync(imageDirectory).forEach(folder => {
  const folderPath = path.join(imageDirectory, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    imageList[folder] = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  }
});

fs.writeFileSync(outputFile, JSON.stringify(imageList, null, 2));

console.log('Image list generated successfully.');