import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightsDataService {

  SearchForm:any;
  isOneWay:boolean = false;
  Flight:any;

  constructor() { }
}
