

import Cover from './cover';
import Rally from './rally';
import LanjaronCover from './lanjaron-cover';
import Video from './video';
import Map from './map';

export default class SectionDirectory {

  section: any = {
	'COVER': Cover,
	'RALLY': Rally,
	'LANJARONCOVER': LanjaronCover,
	'VIDEO': Video,
	'MAP': Map
  }

  constructor(config) {

  	return new this.section[config.name](config);
  }
}