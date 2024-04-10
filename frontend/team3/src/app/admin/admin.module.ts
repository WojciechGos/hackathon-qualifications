import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],

  declarations: [DialogComponent, AdminComponent],
})
export class AdminModule {}
