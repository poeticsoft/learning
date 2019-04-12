import { 
	Component,
	HostBinding,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'block-avatar',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlockAvatarComponent {

	@HostBinding('class.editing') private editing: boolean = false; 

	@ViewChild('avatar') svgavatar;

	nodes: any;
	sections: any[] = [];
	menuvisible: boolean = false;

	// Default parts TODO load with svg

	defaultelement: any = {
		dress: 'dress-a',
		hair: 'hair-a',
		glass: 'glass-a',
		laze: 'laze-a',
		bear: 'bear-a'
	};

	constructor() { }

	ngAfterContentInit() {

		this.nodes = this.svgavatar.nativeElement.querySelectorAll('svg > g');

	  this.nodes
	  .forEach(
	  	rootnode => {

	  		let sectionid = rootnode.id;
	  		let elements = rootnode.querySelectorAll('#' + sectionid + ' > g');

	  		if(elements.length > 0) {

	  			this.sections.push({
	  				id: sectionid,
	  				elements: elements,
	  				actualelement: this.defaultelement[sectionid]
	  			});
	  		}
	  	}
	  );

	  this._updateElements();
	}

	/* PRIVATE */

	private _toggleMenu() {

		this.editing = !this.editing;
	}

	private _updateElements() {

		this.nodes.forEach(
			node => {

				node.querySelectorAll('#' + node.id + ' > g')
				.forEach(
					element => {

						element.classList.remove('actual');
					}
				);
			}
		);

		this.sections.forEach(
			section => {

				this.svgavatar.nativeElement.querySelector('g#' + section.id + ' g#' + section.actualelement)
				.classList.add('actual');
			}
		)
	}

	private _selectElement(sectionid, elementid) {

		this.sections.find(
			section => {

				return section.id == sectionid;
			}
		).actualelement = elementid;

		this._updateElements();
	}

	private _saveavatar() {

		console.log(this.sections);
		this._toggleMenu();
	}
}

