
export class Planet {

  private planetCode: string;
  private planetName: string;

  constructor(obj: any) {
    this.planetCode = obj.planetCode;
    this.planetName = obj.planetName;
  }
}
