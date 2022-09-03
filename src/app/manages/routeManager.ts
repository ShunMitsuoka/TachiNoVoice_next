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
                details: {
                    index: string,
                    members: string,
                    opinions: string,
                    phaseSetting: string,
                    coreMemberOpinion: string,
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
            resource: string,
            join: string,
            register: {
                validation: {
                    topic: string,
                    setting: string,
                }
            },
            my: {
                index: string,
                details: string,
            },
            phase: {
                start: string,
                next: string,
                setting: string,
            },
            members: {
                list: string
            },
            opinion: {
                index:string,
                coreMember: string,
            }
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
                    details: {
                        index: '/member/village/my/details/',
                        members: '/member/village/my/details/members/',
                        opinions: '/member/village/my/details/opinions/',
                        phaseSetting: '/member/village/my/details/phaseSetting/',
                        coreMemberOpinion: '/member/village/my/details/coreMemberOpinion/',
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
                resource: '/api/village',
                join: '/api/village/join',
                register: {
                    validation: {
                        topic: '/api/village/register/validation/topic',
                        setting: '/api/village/register/validation/setting',
                    }
                },
                my: {
                    index: '/api/my/village',
                    details: '/api/my/village/',
                },
                phase: {
                    start: '/api/my/village/:id/phase/start',
                    next: '/api/my/village/:id/phase/next',
                    setting: '/api/my/village/:id/phase/setting',
                },
                members: {
                    list: '/api/my/village/:id/members',
                },
                opinion: {
                    index: '/api/my/village/:id/opinions',
                    coreMember: '/api/my/village/:id/core_member/opinion',
                }
            },
        }
    }

    static getUrlWithParam(url: string, params?: any): string {
        if (params) {
            Object.keys(params).forEach(function (key) {
                url = url.replace(':' + key, params[key]);
            });
        }
        return url;
    }
}