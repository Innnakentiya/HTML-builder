const fs = require('fs');
const path = require('path');

function copyDir() {
  const newDir = path.join(__dirname, 'files-copy');
  const sourceDir = path.join(__dirname, 'files');

  fs.access(newDir, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(newDir, { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
          console.error(mkdirErr);
        } else {
          console.log('Folder has been created');
          copyFiles(sourceDir, newDir);
        }
      });
    } else {
      console.log('Folder already exists');
      copyFiles(sourceDir, newDir);
    }
  });

  //Check for changes in source directory
  //   fs.watch(sourceDir, (event, file) => {
  //     if (event) {
  //       console.log(`in ${file} has occurred ${event}`);
  //       // if there are any changes rerun copy function
  //       copyFiles(sourceDir, newDir);
  //     } else {
  //       return;
  //     }
  //   });
}

function copyFiles(sourceDir, newDir) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    } else {
      files.forEach((file) => {
        const sourceFile = path.join(sourceDir, file);
        const newFile = path.join(newDir, file);

        fs.copyFile(sourceFile, newFile, (copyErr) => {
          if (copyErr) {
            console.error(
              `Error has occurred while copying ${file} : ${copyErr}`,
            );
          } else {
            // console.log(`${file} has been copied successfully`);
            return;
          }
        });
      });
    }
  });
}
copyDir();
