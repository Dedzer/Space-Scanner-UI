import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchFormRequestService} from "../../core/http/search-form-request.service";
import {SearchFlightsDataService} from "../../core/transfer/search-flights-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef,
              private request: SearchFormRequestService,
              private data: SearchFlightsDataService,
              private router: Router) {
  }

  SearchForm: any;
  availableFlights: Array<any> | null = null
  returnFlights: Array<any> | null = null
  isOneWay: boolean = false

  ngOnInit(): void {
    this.cdr.detectChanges()
    this.SearchForm = this.data.SearchForm;
    this.isOneWay = this.data.isOneWay;
    this.request.findFlights(this.SearchForm).subscribe(data => {
      this.availableFlights = data.availableFlights
      this.returnFlights = data.returnFlights
    })
  }

  reserveFlight(Flight: any) {
    this.data.Flight = Flight;
    let url = '/reserve-flight/' + Flight.flightId;
    this.router.navigate([url]);
  }
}
