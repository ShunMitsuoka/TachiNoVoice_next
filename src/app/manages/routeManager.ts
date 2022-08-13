type route = {
    guest: {
        top: string,
        auth: {
            register: string,
            login: string,
        },
    },
    member: {
        dashboard: string,
        village: {
            search: any
            register: {
                index: string,
                setting: string,
            },
            my: {
                index: string,
                details : {
                    index : string,
                    members : string,
                }
            },
        },
        setting: {
            index: string,
        },
        news: {
            index: string,
        },
    }
}

type apiRoute = {
    member: {
        village: {
            resource : string,
            join : string,
            register : {
                validation : {
                    topic : string,
                    setting : string,
                }
            },
            my: {
                index: string,
                details: string,
            },
            phase: {
                start: string,
                next: string,
            },
            members : {
                list : string
            },
        },
    }
}

export class RouteManager {

    static readonly webRoute: route = {
        guest: {
            top: '/',
            auth: {
                register: '/guest/auth/register',
                login: '/guest/auth/login',
            }
        },
        member: {
            dashboard: '/member/dashboard',
            village: {
                register: {
                    index: '/member/village/register',
                    setting: '/member/village/register/setting',
                },
                search: {
                    index: '/member/village/search',
                    setting: '/member/village/search/setting',
                },
                my: {
                    index: '/member/village/my',
                    details : {
                        index : '/member/village/my/details/',
                        members : '/member/village/my/details/members/',

                    }
                },
            },
            setting: {
                index: '/member/setting',
            },
            news: {
                index: '/member/news',
            },

        }
    }

    static readonly apiRoute: apiRoute = {
        member: {
            village: {
                resource : '/api/village',
                join : '/api/village/join',
                register : {
                    validation : {
                        topic : '/api/village/register/validation/topic',
                        setting : '/api/village/register/validation/setting',
                    }
                },
                my: {
                    index: '/api/my/village',
                    details: '/api/my/village/',
                },
                phase: {
                    start: '/api/my/village/:id/phase/start',
                    next: '/api/my/village/:id/phase/next',
                },
                members : {
                    list : '/api/my/village/:id/members',
                },
            },
        }
    }

    static getUrlWithParam(url: string, params?:any) : string {
        if(params){
            Object.keys(params).forEach(function (key) {
                url = url.replace(':'+key, params[key]);
            });
        }
        return url;
    }
}