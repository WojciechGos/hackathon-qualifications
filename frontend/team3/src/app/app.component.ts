import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.authService.getTokenfromLocalStorage();
    this.sub.add(this.authService.checkRole().subscribe({}));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  title = 'team3';
}
