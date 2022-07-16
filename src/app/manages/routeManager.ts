type route = {
    guest: {
        top: string,
        auth: {
            register: string,
            login: string,
        },
    },
    admin: {
        test: string,
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
        admin: {
            test: '/admin/test',
        }
    }

    static readonly apiRoute: apiRoute = {
        member: {
            village: '/api/village',
        }
    }
}