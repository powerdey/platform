import { Component } from '@angular/core';
import { Auth, signInWithPopup } from '@angular/fire/auth';
import { GoogleAuthProvider, UserInfo } from '@angular/fire/auth';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { setAuthUser } from '../../store/auth/auth.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pw-admin-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(
    private auth: Auth,
    private store: Store,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  signIn() {
    from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .pipe(
        map((credential) => credential.user.toJSON() as UserInfo),
        tap((user) => this.store.dispatch(setAuthUser({ user }))),
        switchMap(() => this.router.navigate(['/'])),
        catchError((err) => {
          this.snackbar.open(`Unable to sign you in: ${err?.message ?? err}`);
          return of(null);
        })
      )
      .subscribe();
  }
}
