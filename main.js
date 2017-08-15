const path = require('path');
const fs = require('fs');
const assert = require('assert');
fs.readdir(path.join(__dirname,'inputFolder'),(err,files)=>{
  var filenameTemplate = /Image\s(\d+)\.jpg/
  var rst = files.filter(e=>filenameTemplate.test(e)).map(e=>{
    return {fname:e,ind:Number.parseInt(filenameTemplate.exec(e)[1])}
  })
  console.log(rst);
  assert(rst.length%2==0,"img numbers should be even")
  var firstHalf = rst.slice(0,rst.length/2)
  var laterHalf = rst.slice(rst.length/2).reverse()
  var combined = []
  firstHalf.forEach((e,i)=>{
    combined.push(e)
    combined.push(laterHalf[i])
  })

  // combined.forEach((e,i)=>{
  //   copyFile(path.join(__dirname,e.fname),path.join(__dirname,'bck',e.fname))
  //   fs.rename(path.join(__dirname,e.fname),path.join(__dirname,"resort"+("000"+i).slice(-3)+".jpg"),(err,msg)=>{
  //     if(err)console.error(err);
  //   })
  // })
  function copyFile(src, dist) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dist));
  }
})
