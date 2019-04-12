
  import * as PIXI from 'pixi.js';

  import { Injectable } from '@angular/core';

  @Injectable()
  export class PixiTextureService {

    path: string = 'assets/';
    texture: any = {}; // TODO Use PIXI cache

    constructor() {}

    private _textureid(filename) {

      return filename.split('/').join('_')
                     .split('.').join('_')
                     .split(' ').join('_');
    }

    load(filename): Promise<any> {

      let textureid = this._textureid(filename);

      return new Promise((resolve) => { 

          if (this.texture[textureid]) {

            resolve();

          } else {

            let loader = new PIXI.loaders.Loader();
            loader.add(textureid, this.path + filename)
                  .load(
                    (loader, resources) => {

                      if(resources[textureid].texture) { // IMG

                        this.texture[textureid] = resources[textureid].texture;
                        resolve();

                      } else { // VIDEO

                        let video = resources[textureid].data;
                        this.texture[textureid] = PIXI.Texture.fromVideo(video);
                        video.loop = true;
                        video.pause();

                        resolve();
                      }
                      
                      loader.destroy();
                    }
                  );
          }
      });
    }

    get(filename) {

      let textureid = this._textureid(filename);

      if (this.texture[textureid]) {

        return this.texture[textureid];
      }

      console.log(`Error texture ${filename} not loaded`);

      return null;
    }
  }
