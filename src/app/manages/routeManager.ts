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
            register: {
                index : string,
                setting : string,
            },
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
                    index : '/member/village/register',
                    setting : '/member/village/register/setting',
                },
            },

        }
    }

    static readonly apiRoute: apiRoute = {
        member: {
            village: '/api/village',
        }
    }
}