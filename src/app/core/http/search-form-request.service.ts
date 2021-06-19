import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FlightsResponse} from "../../view/model/FlightsResponse";

@Injectable({
  providedIn: 'root'
})
export class SearchFormRequestService {

  constructor(private httpClient: HttpClient) {
  }

  findFlights(SearchForm: any) {
    const Headers = new HttpHeaders('Access-Control-Allow-Origin: *')
    return this.httpClient.post<FlightsResponse>("api/flights/get", SearchForm, {headers: Headers})
  }

  getPlanetsRequest() {
    const Headers = new HttpHeaders('Access-Control-Allow-Origin: *');
    return this.httpClient.get("/api/planets", {headers: Headers});
  }

  getAirports(departurePlanetCode: any) {
    const Headers = new HttpHeaders('Access-Control-Allow-Origin: *');
    const Params = new HttpParams().append("planetCode", departurePlanetCode);
    return this.httpClient.get("/api/airports", {params: Params, headers: Headers});
  }
}


