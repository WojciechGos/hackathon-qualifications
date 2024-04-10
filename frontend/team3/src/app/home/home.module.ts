import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule,HomeRoutingModule,RouterModule],
  exports: [HomepageComponent],
})
export class HomeModule { }
