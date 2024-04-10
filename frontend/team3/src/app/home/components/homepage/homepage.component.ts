import { Component } from '@angular/core';
import { RouterEnum } from 'src/enums/router.enum';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  RouterEnum = RouterEnum;
}
