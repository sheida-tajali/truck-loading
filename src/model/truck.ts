export class Truck {
  constructor(
    public truckID = -1.0, //(32 numeric)
    public name = '', //(20 alphanumeric)
    public number = -1, //(6 numeric)
    public status = 'O' // (char 1; "O" Open, "C" Closed)
  ) {}
}
