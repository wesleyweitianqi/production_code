const fs = require("fs");
const path = require("path");
const fileOps = require("./ncfile");

//joining path of directory 
const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
fs.readdir("../production_code/codes", function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        fileOps(file)
        
    });
});


