import { Component } from '@angular/core';
import { Box } from 'src/model/box';
import { Truck } from 'src/model/truck';
import { TruckService } from 'src/service/truckService';

@Component({
  selector: 'app-truck-dashboard',
  templateUrl: './truck-dashboard.component.html',
  styleUrls: ['./truck-dashboard.component.css'],
})
export class TruckDashboardComponent {
  trucks: Truck[] | undefined;
  boxes: Box[] | undefined;

  selectedTruckId: number = 0;
  selectedTruck: Truck | undefined;
  canClose: boolean = false;
  constructor(private truckService: TruckService) {}

  ngOnInit(): void {
    this.getTrucks();
    this.getBoxes();
  }

  private getTrucks() {
    this.truckService.getTrucks().subscribe((trucks) => {
      console.log(trucks);
      this.trucks = trucks;
    });
  }

  private getBoxes() {
    this.truckService.getBoxes().subscribe((boxes) => {
      console.log(boxes);
      this.boxes = boxes;
    });
  }

  selectTruck(truckId: number) {
    this.selectedTruckId = truckId;
    this.selectedTruck = this.trucks?.find((t) => t.truckID == truckId);
    this.canClose = this.boxes?.find((b) => b.truckID === truckId)
      ? true
      : false;
  }

  assignBox(boxID: number) {
    let box = this.boxes?.find((b) => b.boxID == boxID);
    if (box) {
      box.truckID = this.selectedTruckId;
      box.status = 'S';
      this.truckService.editBox(box).subscribe((boxes) => {
        console.log(boxes);
        this.boxes = boxes;
      });
    }
    this.canClose = true;
  }

  removeBox(boxID: number) {
    let box = this.boxes?.find((b) => b.boxID == boxID);
    if (box) {
      box.truckID = 0;
      box.status = 'I';
      this.truckService.editBox(box).subscribe((boxes) => {
        console.log(boxes);
        this.boxes = boxes;
      });
    }
    this.canClose = this.boxes?.find((b) => b.truckID === this.selectedTruckId)
      ? true
      : false;
  }

  openTruck(truckID: number) {
    let truck = this.trucks?.find((t) => t.truckID == truckID);
    if (truck) {
      truck.status = 'O';

      this.truckService.editTruck(truck).subscribe((trucks) => {
        console.log(trucks);
        this.trucks = trucks;
      });
    }
  }

  closeTruck(truckID: number) {
    let truck = this.trucks?.find((t) => t.truckID == truckID);
    if (truck) {
      truck.status = 'C';

      this.truckService.editTruck(truck).subscribe((trucks) => {
        console.log(trucks);
        this.trucks = trucks;
      });
    }
  }
}
