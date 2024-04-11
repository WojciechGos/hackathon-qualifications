import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddTeamFormComponent } from './components/add-team-form/add-team-form.component';
import { UserRoutingModule } from './user-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../core/interceptors/header.interceptor';
import { MyEntriesComponent } from './components/my-entries/my-entries.component';

@NgModule({
  declarations: [AddTeamFormComponent, MyEntriesComponent],
  imports: [SharedModule, UserRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
})
export class UserModule {}
