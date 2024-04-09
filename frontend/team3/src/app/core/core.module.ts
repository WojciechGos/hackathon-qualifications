import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
<<<<<<< HEAD
  imports: [SharedModule],


  
=======
  imports: [SharedModule, RouterModule]

>>>>>>> 0904Czech
})
export class CoreModule {}


