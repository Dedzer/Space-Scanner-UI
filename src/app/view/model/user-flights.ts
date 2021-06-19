import {Flight} from "./Flight";

export class UserFlights {

  flights: Array<Flight>

  constructor(any: any) {
    this.flights = any.flights;
  }
}
