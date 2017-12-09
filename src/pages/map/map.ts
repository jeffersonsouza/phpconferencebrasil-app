import { Component, ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: '-23.5408269';
  long: '-46.7641711';
  constructor() {
  }

  ionViewDidLoad() {
    // working in progress
  }

  addMap(){

  }

}
