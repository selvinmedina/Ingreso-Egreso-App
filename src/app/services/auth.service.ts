import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { map } from 'rxjs/operators';

import { AppState } from '../app.reducer';
import * as auth from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubs: Subscription;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthService() {
    this.auth.authState.subscribe((fUser) => {
      console.log(fUser);

      if (fUser) {
        this.userSubs = this.firestore
          .doc(`${fUser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(auth.setUser({ user }));
          });
        //.unsubscribe();
      } else {
        if (this.userSubs) {
          this.userSubs.unsubscribe();
        }
        this.store.dispatch(auth.unSetUser());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user: { uid, email } }) => {
        const user: Usuario = new Usuario(uid, nombre, email);
        this.firestore.doc(`${uid}/usuario`).set({ ...user });
      });
  }

  login(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser !== null));
  }
}
