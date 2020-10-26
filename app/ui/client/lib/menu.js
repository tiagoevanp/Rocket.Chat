import _ from 'underscore';
import Emitter from '@rocket.chat/emitter';

import { menu } from '../../../ui-utils';

const emitter = new Emitter();

window.addEventListener('resize', _.debounce((() => {
	let lastState = window.matchMedia('(min-width: 780px)').matches ? 'mini' : 'large';
	emitter.emit('grid', lastState);
	return () => {
		const futureState = window.matchMedia('(min-width: 780px)').matches ? 'mini' : 'large';
		if (lastState !== futureState) {
			lastState = futureState;
			emitter.emit('grid', lastState);
		}
	};
})(), 100));

emitter.on('grid', () => {
	menu.close();
});
