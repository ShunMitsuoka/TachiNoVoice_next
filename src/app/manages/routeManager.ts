type route = {
    guest: {
        top: string,
        auth: {
            preRegisterComp: string;
            RegisterComp: string;
            register: string,
            login: string,
            verifyEmail: string,
        },
        password: {
            forgot : string
        }
    },
    member: {
        dashboard: string,
        village: {
            search: {
                index: string,
                details: string,
            },
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
                    riseMemberOpinion: {
                        index: string,
                    },
                    category: {
                        make: string,
                        categorize: string,
                    },
                    evaluation: string,
                    policy: {
                        index: string
                    }
                    satisfaction: {
                        index: string,
                        result: string,
                    }
                }
            },
        },
        setting: {
            index: string,
            userinfomation: string,
        },
        news: {
            index: string,
        },
    }
}

type apiRoute = {
    guest: {
        auth: {
            register: string,
            mainRegister: string,
            resendVerifiedEmail: string,
        },
        password: {
            forgot : string
            reset : string
        }
    },
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
                index: string,
                coreMember: string,
                riseMember: string,
                setCategory: string,
            },
            evaluation: string,
            category: string,
            policy: string,
            satisfaction: string,
        },
        index: string,
    }
}

export class RouteManager {

    static readonly webRoute: route = {
        guest: {
            top: '/',
            auth: {
                preRegisterComp: '/guest/auth/preRegisterComp',
                RegisterComp: '/guest/auth/RegisterComp',
                register: '/guest/auth/register',
                login: '/guest/auth/login',
                verifyEmail: '/guest/auth/verifyEmail',
            },
            password: {
                forgot : '/guest/password/forgotPassword',
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
                    details: '/member/village/search/details/',
                },
                my: {
                    index: '/member/village/my',
                    details: {
                        index: '/member/village/my/details/',
                        members: '/member/village/my/details/members/',
                        opinions: '/member/village/my/details/opinions/',
                        phaseSetting: '/member/village/my/details/phaseSetting/',
                        coreMemberOpinion: '/member/village/my/details/coreMemberOpinion/',
                        riseMemberOpinion: {
                            index: '/member/village/my/details/riseMemberOpinion/',
                        },
                        category: {
                            make: '/member/village/my/details/category/make/',
                            categorize: '/member/village/my/details/category/categorize/',
                        },
                        evaluation: '/member/village/my/details/evaluation/',
                        policy: {
                            index: '/member/village/my/details/policy/'
                        },
                        satisfaction: {
                            index: '/member/village/my/details/satisfaction/',
                            result: '/member/village/my/details/satisfaction/result/',
                        }
                    }
                },

            },
            setting: {
                index: '/member/setting',
                userinfomation: '/member/setting/userinfomation',
            },
            news: {
                index: '/member/news',
            },

        }
    }

    static readonly apiRoute: apiRoute = {
        guest: {
            auth: {
                register: '/api/auth/register',
                mainRegister: '/api/auth/mainRegister',
                resendVerifiedEmail: '/api/email/verification-notification',
            },
            password: {
                forgot : '/api/password/forgot',
                reset : '/api/password/reset'
            }
        },
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
                    riseMember: '/api/my/village/:id/rise_member/opinion',
                    setCategory: '/api/my/village/:id/opinion/set_category',
                },
                evaluation: '/api/my/village/:id/evaluation',
                category: '/api/my/village/:id/category',
                policy: '/api/my/village/:id/policy',
                satisfaction: '/api/my/village/:id/satisfaction',
            },
            index: '/api/user/',
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