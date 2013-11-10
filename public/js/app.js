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

                                },
                                ledge: {

                                },
                                background: {

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
                        all: {

                        }
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