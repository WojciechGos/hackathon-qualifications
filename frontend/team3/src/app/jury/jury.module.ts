import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuryRoutingModule } from './jury-routing.module';
import { JuryComponent } from './components/jury/jury.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../core/interceptors/header.interceptor';

@NgModule({
  declarations: [JuryComponent],
  imports: [CommonModule, JuryRoutingModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
})
export class JuryModule {}
