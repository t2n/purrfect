/* global _li */


var app = {
	purrfect: {
		items: {
			router: {},
			view: {
				items: {
					game: {

					},
					home: {

					},
					result: {

					}
				}
			},
			cache: {},
			communication: {
				items: {
					test: {}
				}
			}
		}
	}
},
	init = {
		event: 'purrfect'
	},
	baseURL = '/';

_li.core.init(app, init, baseURL);