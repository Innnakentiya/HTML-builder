const fs = require('fs').promises;
const path = require('path');

const sourceFolderPath = path.join(__dirname, 'styles');
const targetFolderPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function readStyles() {
  try {
    const files = await fs.readdir(sourceFolderPath, { withFileTypes: true });

    const cssFiles = files
      .filter((file) => file.isFile() && path.extname(file.name) === '.css')
      .map(async (file) => {
        const filePath = path.join(sourceFolderPath, file.name);
        return await fs.readFile(filePath, 'utf8');
      });

    const stylesArray = await Promise.all(cssFiles);

    await fs.writeFile(targetFolderPath, stylesArray.join('\n'), 'utf8');
    console.log('CSS bundle has been done');
  } catch (error) {
    console.error('Error:', error);
  }
}

readStyles();

///////////////////////////////////////////////////////

// const fs = require('fs').promises;
// const path = require('path');

// const sourceFolderPath = path.join(__dirname, 'styles');
// const targetFolderPath = path.join(__dirname, 'project-dist', 'bundle.css');
// const stylesArr = [];

// async function readStyles() {
//   try {
//     const files = await fs.readdir(sourceFolderPath, { withFileTypes: true });

//     for (const file of files) {
//       const filePath = path.join(sourceFolderPath, file.name);
//       const fileExt = path.parse(filePath).ext.slice(1);

//       if (file.isFile() && fileExt === 'css') {
//         const styleEl = await fs.readFile(filePath, 'utf8');
//         stylesArr.push(styleEl);
//       }
//     }

//     await fs.writeFile(targeFilePath, stylesArr.join('\n'), 'utf8');
//     console.log('CSS bundle has been done');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// readStyles();
