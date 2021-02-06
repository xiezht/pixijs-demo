const PIXI = require('pixi.js');

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
PIXI.utils.sayHello(type);

console.log('测试app.js文件改变3');
