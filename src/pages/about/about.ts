import { Component } from '@angular/core';
import {SponsorsProvider} from "../../providers/sponsors/sponsors";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [SponsorsProvider]
})
export class AboutPage {
  sponsorsGroups: any;

  constructor(public SponsorsProvider: SponsorsProvider) {
  }

  ionViewDidLoad() {
    this.SponsorsProvider.list().subscribe(
      data => {
        this.sponsorsGroups = data;
      }
    );
  }

}
