import { RouteManager } from "../manages/routeManager";
import { Session } from "next-auth";

export class AuthService {

    static getAccessToken(session: Session | null): string | null {
        if (session && session.accessToken) {
            return session.accessToken;
        }
        return null;
    }

    static check(session: Session | null): boolean {
        if (AuthService.getAccessToken(session)) {
            return true;
        }
        return false;
    }

    static authSucceeded() {
        return {
            redirect: {
                permanent: false,
                destination: RouteManager.webRoute.member.dashboard,
            }
        }
    }

    static authFailed() {
        return {
            redirect: {
                permanent: false,
                destination: RouteManager.webRoute.guest.auth.login,
            }
        }
    }
}