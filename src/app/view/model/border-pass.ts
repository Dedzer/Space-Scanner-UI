import {Tourist} from "./tourist";

export class BorderPass {

  flightId: any
  flightType: any
  arrivalTime: any
  arrivalDate: any
  departureTime: any
  departureDate: any
  departureAirport: any
  departurePlanet: any
  arrivalAirport: any
  arrivalPlanet: any
  distance: any
  price: any
  shuttleCode: any
  tourist: Tourist;

  constructor(any: any) {
    this.flightId = any.flightId;
    this.flightType = any.flightType;
    this.arrivalTime = any.arrivalTime;
    this.arrivalDate = any.arrivalDate;
    this.departureAirport = any.departureAirport;
    this.departurePlanet = any.departurePlanet;
    this.arrivalAirport = any.arrivalAirport;
    this.arrivalPlanet = any.arrivalPlanet;
    this.distance = any.distance;
    this.price = any.price;
    this.shuttleCode = any.shuttleCode;
    this.tourist = new Tourist(any.tourist);
  }
}
