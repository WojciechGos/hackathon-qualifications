import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { AdminComponent } from './components/admin/admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../core/interceptors/header.interceptor';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],

  declarations: [DialogComponent, AdminComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
})
export class AdminModule {}
