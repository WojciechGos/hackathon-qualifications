import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuryComponent } from './components/jury/jury.component';
import { RouterEnum } from 'src/enums/router.enum';
import { JuryGuard } from '../core/guards/jury.guard';
import { JuryDetailsComponent } from './components/jury-details/jury-details.component';

const routes: Routes = [
  { path: RouterEnum.jury, component: JuryComponent, 
  //  canActivate: [JuryGuard] ,
  },
  {
    path: `${RouterEnum.jurydetails}/:id`, component: JuryDetailsComponent, 
    // canActivate: [JuryGuard] ,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuryRoutingModule {}
