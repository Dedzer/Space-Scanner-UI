export class Airport {

  private airportCode: string;
  private airportName: string;

  constructor(obj: any) {
    this.airportCode = obj.airportCode;
    this.airportName = obj.airportName;
  }
}
