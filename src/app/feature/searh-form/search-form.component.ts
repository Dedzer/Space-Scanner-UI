import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchFormRequestService} from "../../core/http/search-form-request.service";
import {Observable} from "rxjs";
import {MatButtonToggleGroup} from "@angular/material/button-toggle";
import {SearchFlightsDataService} from "../../core/transfer/search-flights-data.service";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {


  SearchForm = {
    departureDate: null,
    returnDepartureDate: null,
    arrivalAirportCode: null,
    departureAirportCode: null,
    arrivalPlanetCode: null,
    departurePlanetCode: null
  };


  availablePlanets$: Observable<any> | null = null;
  arrivalAirports$: Observable<any> | null = null;
  departureAirports$: Observable<any> | null = null;
  isOneWay$ = false;

  constructor(private SearchFormRequest: SearchFormRequestService,
              private cdr: ChangeDetectorRef,
              private data: SearchFlightsDataService) {
  }

  ngOnInit(): void {
    this.availablePlanets$ = this.SearchFormRequest.getPlanetsRequest();
    this.cdr.detectChanges()
  }

  toggle(group: MatButtonToggleGroup) {
    this.isOneWay$ = group.value == "true";
  }

  findAvailableFlights() {
    this.data.SearchForm = this.SearchForm;
    this.data.isOneWay = this.isOneWay$
  }

  getDepartureAirports() {
    this.departureAirports$ = this.SearchFormRequest.getAirports(this.SearchForm.departurePlanetCode);
  }

  getArrivalAirports() {
    this.arrivalAirports$ = this.SearchFormRequest.getAirports(this.SearchForm.arrivalPlanetCode);
  }
}
