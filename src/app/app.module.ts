import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

// angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// modulos
import { AppRoutingModule } from './app-routing.module';

// ngrx
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { appReducers } from './app.reducer';

import { AuthModule } from './auth/auth/auth.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    IngresoEgresoModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
