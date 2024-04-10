import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuryComponent } from './components/jury/jury.component';
import { RouterEnum } from 'src/enums/router.enum';

const routes: Routes = [
  {path:RouterEnum.jury,component:JuryComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuryRoutingModule { }
