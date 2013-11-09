/* global _li */


var app = {
	purrfect: {
		items: {
			router: {},
			view: {
				items: {
					game: {
                        items: {
                            render: {

                            },
                            loop: {

                            },
                            assets: {

                            },
                            player: {

                            },
                            tower: {

                            }
                        }

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
					handleRooms: {}
				}
			},
            physics: {

            }

		}
	}
},
	init = {
		event: 'purrfect'
	},
	baseURL = '/';

_li.core.init(app, init, baseURL);