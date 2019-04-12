
import { 
	EventEmitter,
	ElementRef
} from '@angular/core';

import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import SectionDirectory from './section/directory';

export default class Base {

	api: any;
	el: any;// canvas wrapper
	style: any; // Style store
 	interactor: any; // Interaction library
 	texture: any; // texture store

	app: any = new PIXI.Application();
	started: boolean = false;
	stage: any = {};

	sectionmatrix: any[]; // Bidimensional array of section names min 1 row & 1 col
	sectionmap: any = {}; // map x_y dimensions to section object
	actualsection: string = ''; // sectionmap id 

 	panemitter = new EventEmitter<any>();
	resizeemitter = new EventEmitter<any>();
	tickeremitter = new EventEmitter<any>();

	sound: any;	

	oscilatorvel: number = 0.01; // Oscilator - make service?
	oscilator: any = {
		index: 0,
		cx: 0,
		cy: 0
	};
	
	viewW: number = 0;// Screen & scene	
	viewH: number = 0;
	sceneW: number = 0;
	sceneH: number = 0;

	interaction: any = {
		interactor: null,
		x: 0, // Absolute position
		y: 0,
		delta:{
			x: 0, // increment
			y: 0
		},
		sectionpanspace: { 	// amplitude of each section
			x:0,				 			
			y:0,
			mult: 2				 		// Coeficient for expand section panning
		},
		maxpanscene: {
			x: 0, // bounds = sectionpanspace * sections count
			y: 0
		}
	};

	constructor(
		el, 
		api, 
		style,
		interactor,
		texture
	) {

		this.el = el;
		this.api = api;
		this.style = style;
		this.interactor = interactor;
		this.texture = texture;
	}

  /* PRIVATE */

  private _oscilate() {

    if(this.oscilator.index > 1) { this.oscilator.index = 0; }

    let rad = this.oscilator.index * 2 * Math.PI;
    this.oscilator.x = Math.sin(rad);
    this.oscilator.y = Math.cos(rad);

    this.oscilator.index += this.oscilatorvel;
  }

	/* -------------------------------------------------------
		 PUBLIC */	

	setupScene() {

		/* View scene  */

		this.el.appendChild(this.app.view);
		this.app.stage.alpha = 0;
		this.app.stage.name = 'MAIN STAGE';
		this.stage.sections = new PIXI.Container();
		this.stage.sections.name = 'SECTIONS';
		
		/* Animation clock */

		this.app.ticker.add(
			(delta) => { 

				this.tickeremitter.emit(delta); // animation ticler for components
				TWEEN.update(); // Tcker for easing tweens
				this._oscilate(); // Oscilation coordinates & effects
			}
		);

    /* Sections */

    let sectionconfig = {
      game: this,
      name: '',
      index: {}
    };

    this.sectionmatrix
    .forEach(
      (sectionrow, rowindex)=> {

      	sectionrow
      	.forEach(
      		(sectioncol, colindex) => {

      			sectionconfig.name = sectioncol;
      			sectionconfig.index = {
      				col: colindex,
      				row: rowindex
      			};
      			this.sectionmap[`${colindex}_${rowindex}`] = new SectionDirectory(sectionconfig);
      		}
      	)
      }
    );
	}

	/* PUBLIC */	

	changeSection(section) {

		if(this.actualsection) {

			this.sectionmap[this.actualsection].out();
		}

		this.actualsection = section;

		if(
			this.started &&
			this.sectionmap[this.actualsection]
		) {

			this.sectionmap[this.actualsection].in();
		}
	}

	// Command game

	start() {

		this.started = true;

		if(this.sectionmap[this.actualsection]) {

			this.sectionmap[this.actualsection].in();
		}

		if(this.interaction.interactor) {

			this.app.ticker.add(
				delta => {

					this.interaction.interactor.track(delta);
				}
			)
		}
	}

	play() {

		this.app.play();
	}

	stop() {

		this.app.stop();
	}

	// User interactions
	
	pan() {

		let panscene = {
			x: Math.min(Math.abs(Math.min(this.interaction.x, 0)), this.interaction.maxpanscene.x - this.interaction.sectionpanspace.x),
			y: Math.min(Math.abs(Math.min(this.interaction.y, 0)), this.interaction.maxpanscene.y - this.interaction.sectionpanspace.y)
		};
		let sectionid = Math.abs(Math.floor(panscene.x / this.interaction.sectionpanspace.x)) + 
										'_' + 
										Math.abs(Math.floor(panscene.y / this.interaction.sectionpanspace.y));

		if(this.actualsection != sectionid) { this.changeSection(sectionid); }

		this.panemitter.emit();
	}

	resize() {

		this.viewW = this.el.offsetWidth;
		this.viewH = this.el.offsetHeight;
		this.app.renderer.resize(this.viewW, this.viewH);

		this.sceneW = this.sceneH * this.viewW / this.viewH;
		this.app.stage.scale.x = 
		this.app.stage.scale.y = this.viewH / this.sceneH;

		this.interaction.sectionpanspace.x = this.sceneW * this.interaction.sectionpanspace.mult;
		this.interaction.sectionpanspace.y = this.sceneH * this.interaction.sectionpanspace.mult;
		this.interaction.maxpanscene.x = this.sectionmatrix[0].length * this.interaction.sectionpanspace.x;
		this.interaction.maxpanscene.y = this.sectionmatrix.length * this.interaction.sectionpanspace.y;

		this.pan();

		this.resizeemitter.emit();
	}
}