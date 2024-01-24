const fs = require('fs');
const path = require('path');

function copyDir() {
  const newDir = path.join(__dirname, 'files-copy');
  const sourceDir = path.join(__dirname, 'files');

  fs.access(newDir, fs.constants.F_OK, (newDirErr) => {
    if (!newDirErr) {
      deleteFilesInDir(newDir, () => {
        copyFiles(sourceDir, newDir);
      });
    } else {
      createAndCopy(sourceDir, newDir);
    }
  });
}

function deleteFilesInDir(directory, callback) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}: ${err}`);
      return;
    }

    let deletedCount = 0;

    if (files.length === 0) {
      callback();
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file ${filePath}: ${unlinkErr}`);
        } else {
          console.log(`Deleted file: ${file}`);
        }

        deletedCount++;

        if (deletedCount === files.length) {
          callback();
        }
      });
    });
  });
}

function createAndCopy(sourceDir, newDir) {
  fs.mkdir(newDir, { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      console.error(`Error creating directory ${newDir}: ${mkdirErr}`);
    } else {
      console.log('Folder has been created');
      copyFiles(sourceDir, newDir);
    }
  });
}

function copyFiles(sourceDir, newDir) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    let copiedCount = 0;

    if (files.length === 0) {
      console.log('No files to copy.');
    }

    files.forEach((file) => {
      const sourceFile = path.join(sourceDir, file);
      const newFile = path.join(newDir, file);

      fs.copyFile(sourceFile, newFile, (copyErr) => {
        if (copyErr) {
          console.error(`Error copying file ${file}: ${copyErr}`);
        } else {
          console.log(`Copied file: ${file}`);
        }

        copiedCount++;

        if (copiedCount === files.length) {
          console.log('All files have been copied.');
        }
      });
    });
  });
}

copyDir();
