const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async(file) => {
  try {
    
    const data = await fsPromises.readFile(`../production_code/codes/${file}`, "utf8")
    const alllines = data.split(/\r\n/)
    const len= alllines.length;
    const arr = alllines.slice(1, len-2);
    for (let i in arr) {
      if (arr[i].includes("M03")) {
        if (arr[i-1].includes("G70")) {
          let regx= /X\d*\.\d*/
          let match = arr[i-1].match(regx)[0].substring(1)
          
          if(parseFloat(match) >= 50.6) {
              let newValue = 50.5
              arr[i-1] = arr[i-1].replace(regx, ` X${newValue}`) + "---------changed here---------------"
              console.log(`file ${file} changed at line`, i-1, i)
              console.log(alllines[i-1])

          }else {
            console.log("no match")
          }
        } 
      }
    }
   Array.isArray(arr) && arr.unshift("%")
   arr.push("%")
   const newData= arr.join("\n")
   fsPromises.writeFile(`./${file}`, newData)
  }catch(error) {
    console.log(error)
  }
}

module.exports = fileOps