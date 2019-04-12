
import { EventEmitter } from '@angular/core';

import * as PIXI from 'pixi.js/dist/pixi.js';
import * as PIXISound from 'pixi-sound';
import * as TWEEN from '@tweenjs/tween.js';
import * as  FontFaceObserver from 'fontfaceobserver';

import Base from './base';

import SceneDirectory from './scene/directory';

import LanjaronCover from './section/lanjaron-cover';

export default class Rally extends Base {
	
	sceneH: number = 1080;	
  margin: number = 60;
  roundframe: number = 20;

	sectionmatrix = [		
		[ 'MAP', 'VIDEO', 'RALLY', 'LANJARONCOVER' ]
	];

	sound: any;

	constructor(el, api, style, interactor, texture) {

		super(el, api, style, interactor, texture);

		// adjust interaction

		this.interaction.sectionpanspace.mult = 4;

		this._loadResources()
		.then(
			this.setupScene.bind(this),
			(error) => {

				console.log('Error loading resources');
				console.log(error);
			}
		);
	}

	/* -------------------------------------------------------
	PRIVATE */

	private _loadResources(): Promise<any> {

		return Promise.all([
			// FONTS > see pixistyle for fonts used
			new FontFaceObserver('campus').load(),
			new FontFaceObserver('ralewayblack').load()
		]);
	}

	/* -------------------------------------------------------
	PUBLIC */

	setupScene() {

		super.setupScene();

		/* SOUND

		this.sound = PIXISound.Sound.from({
    		url: 'assets/audio/ambient-a.mp3',
    		preload: true,
    		volume: 0,
    		loaded: (err, sound) => {

    			sound.loop = true;        		
        		sound.play();
        	}	
		}); */

		/* TEST 

		this.stage.scene = new SceneDirectory({ // TODO scene store
			game: this,
			type: 'TEST'
		});*/

		/* Complete scene with sections  */

		this.stage.scene = new SceneDirectory({ // TODO scene store
			game: this,
			type: 'PARALLAX',
			scenario: 'lanjaron'
		});

		/* Game interaction */

		this.interaction.interactor = this.interactor.get({
			game: this,
			type: 'paninertia'
		});

		/* Init dimensions */

		this.resize();	
		this.pan();

		/* Fade-in stage */

		new TWEEN.Tween(this.app.stage)
							.to({ alpha: 1 }, 1000)
							.easing(TWEEN.Easing.Quartic.In)
							.onComplete(this.start.bind(this))
							.start();
	}
}