export class Box {
  constructor(
    public boxID = 0, // (32 numeric)
    public plu = '', //(15 alphanumeric)
    public number = -1, //(6 numeric)
    public weight = 0.0, //(4.2 decimal) UOM is assumed kg
    public status = 'I', //(char 1; "I" Inventory, "S" Shipped on Truck)
    public truckID = 0
  ) {}
}
