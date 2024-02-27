import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "Map Div not found";
    if ( !this.lngLat ) throw "LngLat can't be null";

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    this.createMarker();

  }

  createMarker(): void {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    const marker = new Marker({
      color: color
    })
      .setLngLat( lngLat )
      .addTo( this.map )
  }

}
