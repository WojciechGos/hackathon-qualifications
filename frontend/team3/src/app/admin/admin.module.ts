import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
 
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule
  ],
 
  declarations: [
      DialogComponent
 
  ]
})
export class AdminModule { }
