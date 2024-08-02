const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { path: imagePath } = req.query;
  const fullPath = path.join(process.cwd(), 'public', decodeURIComponent(imagePath));

  if (fs.existsSync(fullPath)) {
    const image = fs.readFileSync(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 
                        ext === '.gif' ? 'image/gif' : 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.send(image);
  } else {
    res.status(404).send('Image not found');
  }
};