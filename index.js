const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async() => {
  try {
    const data = await fsPromises.readFile("./test.txt", "utf8")
    const alllines = data.split(/\n/)
    for (let i in alllines) {
      if (alllines[i].includes("M03")) {
        if (alllines[i-1].includes("G70")) {
          let regx= /\.\d*/
          let match = alllines[i-1].match(regx)[0].substring(1)
          let newValue = (parseInt(match)-10).toString()
          alllines[i-1] = alllines[i-1].replace(/\.\d*/, newValue)
        }
      }
    }

   const newData= alllines.join("\n")
   fsPromises.writeFile("./test.txt", newData)
  }catch(error) {
    console.log(error)
  }
}

fileOps()