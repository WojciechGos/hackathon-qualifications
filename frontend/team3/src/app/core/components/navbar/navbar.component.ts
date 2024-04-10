import { Component } from '@angular/core';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
RouterEnum = RouterEnum;
}
