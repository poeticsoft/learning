

import Test from './test';
import Parallax from './parallax';

export default class SceneDirectory {

  scene: any = {
		'TEST': Test,
		'PARALLAX': Parallax
  }

  constructor(config) {

  	return new this.scene[config.type](config);
  }
}