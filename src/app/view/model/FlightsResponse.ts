
export class FlightsResponse {

  availableFlights: Array<any>
  returnFlights: Array<any>

  constructor(obj: any) {
    this.availableFlights = obj.availableFlights;
    this.returnFlights = obj.returnFlights;
  }
}
