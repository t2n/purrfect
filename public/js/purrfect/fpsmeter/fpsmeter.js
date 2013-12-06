/*global _li */

(function (module) {
	'use strict';

	var moduleName = module.get('name'),
		init;

	init = function () {
		window.meter = new FPSMeter({
			interval:  100,     // Update interval in milliseconds.
			smoothing: 10,      // Spike smoothing strength. 1 means no smoothing.
			show:      'fps',   // Whether to show 'fpsmeter', or 'ms' = frame duration in milliseconds.
			toggleOn:  'click', // Toggle between show 'fpsmeter' and 'ms' on this event.
			decimals:  1,       // Number of decimals in FPS number. 1 = 59.9, 2 = 59.94, ...
			maxFps:    60,      // Max expected FPS value.
			threshold: 100,     // Minimal tick reporting interval in milliseconds.

			// Meter position
			position: 'absolute', // Meter position.
			zIndex:   10,         // Meter Z index.
			left:     '5px',      // Meter left offset.
			top:      '5px',      // Meter top offset.
			right:    'auto',     // Meter right offset.
			bottom:   'auto',     // Meter bottom offset.
			margin:   '0 0 0 0',  // Meter margin. Helps with centering the counter when left: 50%;

			// Theme
			theme: 'colorful', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
			heat:  1,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

			// Graph
			graph:   1, // Whether to show history graph.
			history: 20 // How many history states to show in a graph.
		});
	};

	module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.fpsmeter.fpsmeter')));