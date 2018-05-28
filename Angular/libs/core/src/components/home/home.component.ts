import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'core-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public media: ObservableMedia) { }

}
