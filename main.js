const path = require('path');
const fs = require('fs');
const assert = require('assert');
const shell = require('shelljs');
var inFolder = path.join(__dirname,'inputFolder')
var outFolder= path.join(__dirname,'outputFolder')
fs.readdir(inFolder,(err,files)=>{
  var filenameTemplate = /Image\s(\d+)\.jpg/
  var rst = files.filter(e=>filenameTemplate.test(e)).map(e=>{
    return {fname:e,ind:Number.parseInt(filenameTemplate.exec(e)[1])}
  })
  assert(rst.length%2==0,"img numbers should be even")
  var firstHalf = rst.slice(0,rst.length/2)
  var laterHalf = rst.slice(rst.length/2).reverse()
  var combined = []
  firstHalf.forEach((e,i)=>{
    combined.push(e)
    combined.push(laterHalf[i])
  })
  shell.cd(outFolder)
  shell.rm('*.jpg')
  combined.forEach((e,i)=>{
    copyFile(path.join(inFolder,e.fname),path.join(outFolder,"resort"+("000"+i).slice(-3)+".jpg"))
  })
  function copyFile(src, dist) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dist));
  }
})
