import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SessionService} from './data/session/session.service';

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private sessionService: SessionService,
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (await this.sessionService.valid()) {
            if ('login' in route.url) {
                return this.router.parseUrl('/');
            }
            return true;
        } else {
            return this.router.parseUrl('login');
        }
    }
}
-