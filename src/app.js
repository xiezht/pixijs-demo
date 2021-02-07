import * as PIXI from 'pixi.js';

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
PIXI.utils.sayHello(type);


window.onload = function() {

  const app = new PIXI.Application({
  });
  app.renderer.backgroundColor = 0xcccccc;
  // app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  // app.renderer.autoResize = true;
  doResize();
  window.addEventListener('resize', doResize);

  document.body.appendChild(app.view);
  renderImage(app);

  function doResize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  };

  /**
   * @param {PIXI.Application} app
   */
  function renderImage(app) {
    const loader = PIXI.Loader.shared;
    loader.add('images/akali.jpg').load(
      (tLoader, resources) => {
        Object.keys(resources).forEach(item => {
          const sprite = new PIXI.Sprite(loader.resources[item].texture);
          app.stage.addChild(sprite);
          sprite.width = 900;
          sprite.height = 450;
        });
      }
    );
  }
}
