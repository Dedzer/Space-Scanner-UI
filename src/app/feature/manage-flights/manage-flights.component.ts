import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {SearchFormRequestService} from "../../core/http/search-form-request.service";
import {ManageFlightsRequest} from "../../core/http/manage-flights-request";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css']
})
export class ManageFlightsComponent implements OnInit {

  flightDirectionFormGroup: FormGroup;
  flightDatesFormGroup: FormGroup;
  flightShuttleGroup: FormGroup;
  flightPriceGroup: FormGroup;
  availablePlanets$: Observable<any> | null = null;
  arrivalAirports$: Observable<any> | null = null;
  departureAirports$: Observable<any> | null = null;
  shuttles$: Observable<any> | null = null;

  charterForm = {
    departure: null,
    arrival: null,
    departureDate: null,
    departureTime: null,
    arrivalDate: null,
    arrivalTime: null,
    spaceShuttleCode: null,
    price: null
  }

  constructor(private cdr: ChangeDetectorRef,
              private _formBuilder: FormBuilder,
              private searchFormRequest: SearchFormRequestService,
              private manageFlightsRequest: ManageFlightsRequest,
              private _snackBar: MatSnackBar) {
    this.flightDirectionFormGroup = this._formBuilder.group({
      departurePlanetCode: ['', Validators.required],
      arrivalPlanetCode: ['', Validators.required],
      departureAirportCode: ['', Validators.required],
      arrivalAirportCode: ['', Validators.required]
    });
    this.flightDatesFormGroup = this._formBuilder.group({
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required]
    });
    this.flightShuttleGroup = this._formBuilder.group({
      shuttleCode: ['', Validators.required]
    });
    this.flightPriceGroup = this._formBuilder.group({
      flightPrice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.availablePlanets$ = this.searchFormRequest.getPlanetsRequest();
    this.shuttles$ = this.manageFlightsRequest.findShuttles();
    this.cdr.detectChanges();
  }

  getDepartureAirports() {
    this.departureAirports$ = this.searchFormRequest.getAirports(this.flightDirectionFormGroup.controls['departurePlanetCode'].value);
  }

  getArrivalAirports() {
    this.arrivalAirports$ = this.searchFormRequest.getAirports(this.flightDirectionFormGroup.controls['arrivalPlanetCode'].value);
  }


  createFlight() {
    this.charterForm.departure = this.flightDirectionFormGroup.controls['departureAirportCode'].value;
    this.charterForm.arrival = this.flightDirectionFormGroup.controls['arrivalAirportCode'].value;
    this.charterForm.departureDate = this.flightDatesFormGroup.controls['departureDate'].value;
    this.charterForm.arrivalDate = this.flightDatesFormGroup.controls['arrivalDate'].value;
    this.charterForm.arrivalTime = this.flightDatesFormGroup.controls['arrivalTime'].value
      .replace(' ', '')
      .replace('AM', 'a')
      .replace('PM', 'p');
    this.charterForm.departureTime = this.flightDatesFormGroup.controls['departureTime'].value
      .replace(' ', '')
      .replace('AM', 'a')
      .replace('PM', 'p');
    this.charterForm.spaceShuttleCode = this.flightShuttleGroup.controls['shuttleCode'].value;
    this.charterForm.price = this.flightPriceGroup.controls['flightPrice'].value;
    this.manageFlightsRequest.createCharterFlight(this.charterForm).subscribe();
    this.openSnackBar("Flight created successfully!", "Close")
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['red-snackbar'],
    });
  }
}
