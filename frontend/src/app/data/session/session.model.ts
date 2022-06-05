export interface Session {
    token: string;
    updateToken: string;
    expires: Date | string;
}