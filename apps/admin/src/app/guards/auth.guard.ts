import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { clearAuthUser, setAuthUser } from '../store/auth/auth.actions';
import { UserInfo } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private store: Store,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return authState(this.auth).pipe(
      map((user) => {
        if (!user) {
          this.store.dispatch(clearAuthUser());
          return this.router.createUrlTree(['/login']);
        }

        this.store.dispatch(
          setAuthUser({
            user: user.toJSON() as UserInfo,
          })
        );

        return true;
      })
    );
  }
}
