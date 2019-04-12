
	import { Injectable } from '@angular/core';

	@Injectable()
	export class ApiService {

	  constructor() { }

	  get data() {

	  	return {
	  		position: 220,
	  		trend: 1
	  	}
	  }

	  saveavatar(data) {

	  	console.log(data);
	  }
	}
