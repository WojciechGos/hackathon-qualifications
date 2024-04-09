import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [ {
  path: RouterEnum.home,
  component: HomepageComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
