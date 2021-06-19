export class SearchFlightForm {

  departureTime: string;
  departureDate: string;
  returnDepartureTime: string;
  returnDepartureDate: string;
  arrivalAirportCode: string;
  departureAirportCode: string;

  constructor(obj: any) {
    this.departureTime = obj.departureTime;
    this.departureDate = obj.departureDate;
    this.returnDepartureDate = obj.returnDepartureDate;
    this.returnDepartureTime = obj.returnDepartureTime;
    this.arrivalAirportCode = obj.arrivalAirportCode;
    this.departureAirportCode = obj.departureAirportCode;
  }

}
