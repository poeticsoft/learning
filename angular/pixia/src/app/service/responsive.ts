
	/* --------------------------------------------

		RESPONSIVE SERVICE

		Provide actual named slot based on window width

		------------------------
		Alberto Moral 2018/03/06
	*/

	import { 
		Injectable,
		EventEmitter
	} from "@angular/core";
	import { EventManager } from '@angular/platform-browser';

	class MediaQuery {
	    ID: string;
		Min: number;
		Max: number;
	}

	@Injectable()
	export class ResponsiveService {

		resize: EventEmitter<any> = new EventEmitter();

		private MediaQuery: Array<MediaQuery>;
		Slot: string;
		viewportWidth: number = 0;

		constructor(private EventManager: EventManager) {

			this.Slot = '';
			this.MediaQuery = [
				{
					ID: 'P',
					Min: 0,
					Max: 480
	            },
				{
	                ID: 'M',
	                Min: 480,
	                Max: 640
	            },
				{
	                ID: 'ML',
	                Min: 640,
	                Max: 992
	            },
				{
	                ID: 'L',
	                Min: 992,
	                Max: 1200
	            },
				{
	                ID: 'LX',
	                Min: 1200,
	                Max: Infinity
	            }
			];

			this.EventManager
			.addGlobalEventListener(
				'window',
				'resize',
				this._quantize.bind(this)
			);

			this.EventManager
			.addGlobalEventListener(
				'window',
				'deviceOrientation',
				this._quantize.bind(this)
			);

			this._quantize();
		}

		private _quantize() {

			this.viewportWidth = window.innerWidth;

			this.resize.emit({
				w: this.viewportWidth,
				h: window.innerHeight
			});

			let MediaQuerySlot = this.MediaQuery.find(MQ => {

				return this.viewportWidth >= MQ.Min &&
					   this.viewportWidth <= MQ.Max;
			});

			if(
				MediaQuerySlot &&
				this.Slot != MediaQuerySlot.ID
			) {
				this.Slot = MediaQuerySlot.ID;
			}
		}

		if(Slots: string): boolean {

			return Slots.split(' ').indexOf(this.Slot) != -1 ||
				   Slots == 'ALL';
		}

		refresh() {

			this._quantize();
		}	
	}
