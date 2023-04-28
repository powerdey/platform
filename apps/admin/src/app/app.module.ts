import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { LayoutComponent } from './layout/layout.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseModules, materialModules } from './bootstrap';
import { PowerdeyAdminStoreModule } from './store/powerdey-admin-store.module';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    ...materialModules,
    ...firebaseModules,
    PowerdeyAdminStoreModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
