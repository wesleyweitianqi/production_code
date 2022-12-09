const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async(file) => {
  try {
    
    const data = await fsPromises.readFile(`../production_code/codes/${file}`, "utf8")
    const alllines = data.split(/\n/)
    for (let i in alllines) {
      if (alllines[i].includes("M03")) {
        if (alllines[i-1].includes("G70")) {
          console.log(alllines[i-1], "\n", alllines[i])
          let regx= /\.\d*/
          let match = alllines[i-1].match(regx)[0].substring(1)
          let newValue = (parseInt(match)-10).toString()
          alllines[i-1] = alllines[i-1].replace(regx, newValue)+ "-----------------------"
          console.log("file changed")
          console.log(file, i-1, i)
        } else {
          console.log("no similar code")
        }
      }
    }

   const newData= alllines.join("\n")
   fsPromises.writeFile("./test.txt", newData)
  }catch(error) {
    console.log(error)
  }
}




module.exports = fileOps;