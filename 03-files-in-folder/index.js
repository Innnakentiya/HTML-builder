const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Information about current directory : ');
    files.forEach((file) => {
      //   console.log(file);
      const filePath = path.join(folderPath, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
        } else {
          if (file.isFile()) {
            const fileName = path.parse(file.name).name;
            const fileExtension = path.extname(file.name).slice(1);
            const fileSize = stats.size;

            console.log(`${fileName} - ${fileExtension} - ${fileSize}b`);
          } else {
            // console.log(`${file.name} is not a file`);
            return;
          }
        }
      });
    });
  }
});

// const fs = require('fs').promises;
// const path = require('path');

// async function displayFileInfo() {
//   const folderPath = path.join(__dirname, 'secret-folder');

//   try {
//     const files = await fs.readdir(folderPath, { withFileTypes: true });

//     console.log('Information about files in the current directory:');
//     for (const file of files) {
//       const filePath = path.join(folderPath, file.name);

//       try {
//         if (file.isFile()) {
//           const fileName = file.name;
//           const fileExtension = path.extname(fileName).slice(1);
//           const fileContent = await fs.readFile(filePath, 'utf8');
//           const fileSizeKB = Buffer.from(fileContent).length / 1024;

//           console.log(
//             `${fileName}-${fileExtension}-${fileSizeKB.toFixed(2)} KB`,
//           );
//         } else {
//           console.log(`${file.name} is a directory`);
//         }
//       } catch (error) {
//         console.error(`Error reading file ${file.name}: ${error.message}`);
//       }
//     }
//   } catch (error) {
//     console.error(`Error reading directory: ${error.message}`);
//   }
// }

// displayFileInfo();
