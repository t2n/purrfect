/* global _li */


var app = {
        purrfect: {
            items: {
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
                                ledge: {

                                },
                                background: {

                                },
                                powerups: {

                                },
                                rainbow: {

                                }
                            }

                        },
                        home: {

                        },
                        result: {

                        }
                    }
                },
                generators: {
                    items: {
                        level: {

                        },
                        powerups: {

                        }

                    }
                },
                controllers: {
                    items: {
                        keyboard: {

                        }
                    }
                },
				fpsmeter: {
					items: {
						fpsmeter: {

						}
					}
				},
                cache: {}
            }
        }
    },
    init = {
        event: 'purrfect'
    },
    baseURL = '/';

_li.core.init(app, init, baseURL);