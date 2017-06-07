import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

export interface StyleObj {
  [key: string]: string;
}

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnChanges {
  @Input() bgRef: string;

  src: string;

  bgList: StyleObj[] = [];

  constructor() { }

  replaceImage(newImg) {
    const style = { 'background-image': newImg };

    this.bgList.push(style);

    if (this.bgList.length > 1) {
      setTimeout(() => this.bgList.shift(), 1000);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const newImg = `url(http://openweathermap.org/img/w/${changes.bgRef.currentValue}.png)`;
    const dummy =  `url(http://openweathermap.org/img/w/01n.png)`;

    this.replaceImage(dummy);

    setTimeout(() => this.replaceImage(newImg), 2000);
  }

}
