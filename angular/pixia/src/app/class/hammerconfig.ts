import { HammerGestureConfig } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig  {
	
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}