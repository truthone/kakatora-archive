const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(__dirname, '../public/images/tv-liveAlone');
const outputFile = path.join(__dirname, '../data/imageList.json');

const imageList = {};

fs.readdirSync(imageDirectory).forEach(folder => {
  const folderPath = path.join(imageDirectory, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    imageList[folder] = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map((file, index) => {
        const title = path.parse(file).name; // 파일 확장자를 제외한 이름
        const newFilename = `${folder}-${index + 1}.png`;
        
        // 파일 이름 변경
        fs.renameSync(
          path.join(folderPath, file),
          path.join(folderPath, newFilename)
        );

        return {
          title: title,
          filename: newFilename
        };
      });
  }
});

fs.writeFileSync(outputFile, JSON.stringify(imageList, null, 2));

console.log('Image list generated and files renamed successfully.');