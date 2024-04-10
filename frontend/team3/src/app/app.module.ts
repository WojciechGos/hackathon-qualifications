import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { AdminModule } from './admin/admin.module';
const customNotifier: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
};


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    AdminModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifier),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
