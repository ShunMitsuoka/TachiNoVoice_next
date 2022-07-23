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
        village: string,
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
            village: '/api/village',
        }
    }
}