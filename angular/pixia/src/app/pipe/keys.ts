
	import { Pipe, PipeTransform } from '@angular/core';

	/**
	* Convert Object to array of keys.
	*/

	@Pipe({
		name: 'keys'
	})
	export class KeysPipe implements PipeTransform {

		transform(value: {}): string[] {

			if (!value) {

				return [];
			}

			return Object.keys(value);
		}
	}