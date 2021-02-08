import * as PIXI from 'pixi.js';

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
PIXI.utils.sayHello(type);


window.onload = function() {
  /**
   * @param {PIXI.Application} app
   */
  function renderImage(app) {
    const loader = PIXI.Loader.shared;
    return new Promise((resolve, reject) => {
      loader
      .add('images/textures/texture.json')
      .load((t, resources) => {
        const sheet = resources['images/textures/texture.json'];
        const sprite = new PIXI.Sprite(sheet.textures['tree03.png']);
        sprite.vx = 1;
        sprite.vy = 1;
        app.stage.addChild(sprite);
        const slogan = new PIXI.Text('Hello world');
        app.stage.addChild(slogan);
        // app.ticker.add(delta => {
        //   sprite.x += 1;
        // });
        resolve();
        // app.stage.addChild(new PIXI.Sprite())
      })
    });
  }
  /**
   * 
   * @param {PIXI.Application} app
   */
  function renderMap(app) {
    const loader = PIXI.Loader.shared;
    return new Promise((resolve, reject) => {
      loader.add('images/textures/map-bg-05.jpg')
      .load((t, resources) => {
        let mapBg = new PIXI.Sprite(resources['images/textures/map-bg-05.jpg'].texture);
        app.stage.addChild(mapBg);
        resolve();
      });
    });
  }
  function doResize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  };

  const app = new PIXI.Application();

  app.renderer.backgroundColor = 0xcccccc;
  // app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  // app.renderer.autoResize = true;
  doResize();
  window.addEventListener('resize', doResize);

  document.body.appendChild(app.view);
  renderMap(app)
    .then(() => {
      return renderImage(app);
    })
    .catch(err => {
      console.error(err);
    })

}
