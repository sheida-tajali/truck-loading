import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Box } from 'src/model/box';
import { Truck } from 'src/model/truck';

export class TruckData implements InMemoryDbService {
  createDb() {
    const trucks: Truck[] = [];
    for (let index = 0; index < 5; index++) {
      trucks.push({
        truckID: 1001 + index,
        name: `Truck T${index + 1}`,
        number: parseInt((Math.random() * 100).toFixed()),
        status: 'O',
      });
    }

    const boxes: Box[] = [];
    for (let index = 0; index < 10; index++) {
      boxes.push({
        boxID: 11 + index,
        plu: `Box B${index + 1}`,
        number: parseInt((Math.random() * 100).toFixed()),
        weight: parseFloat((Math.random() * 10000).toFixed(2)),
        status: 'I',
        truckID: 0,
      });
    }
    return { trucks, boxes };
  }

  genId(trucks: Truck[]): number {
    return trucks.length > 0
      ? Math.max(...trucks.map((truck) => truck.truckID)) + 1
      : 1001;
  }
}
