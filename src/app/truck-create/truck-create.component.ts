import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TruckService } from 'src/service/truckService';

@Component({
  selector: 'app-truck-create',
  templateUrl: './truck-create.component.html',
  styleUrls: ['./truck-create.component.css'],
})
export class TruckCreateComponent {
  form!: FormGroup;
  truckId?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private truckService: TruckService
  ) {}

  ngOnInit() {
    this.truckId = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      truckId: this.truckId,
      name: ['', Validators.required],
      number: ['', Validators.required],
    });

    this.title = 'Add Truck';
    if (this.truckId) {
      // edit mode
      this.title = 'Edit Truck';
      this.loading = true;
      this.truckService.getTruck(parseInt(this.truckId)).subscribe((x) => {
        this.form.patchValue(x);
        this.loading = false;
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveTruck().subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        this.submitting = false;
      },
    });
  }

  private saveTruck() {
    // create or update truck based on id param
    return this.truckId
      ? this.truckService.editTruck(this.form.value)
      : this.truckService.createTruck({ ...this.form.value, status: 'O' });
  }
}
