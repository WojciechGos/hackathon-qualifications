import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuryRoutingModule } from './jury-routing.module';
import { JuryComponent } from './components/jury/jury.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    JuryComponent,
  ],
  imports: [
    CommonModule,
    JuryRoutingModule,
    SharedModule
  ]
})
export class JuryModule { }
