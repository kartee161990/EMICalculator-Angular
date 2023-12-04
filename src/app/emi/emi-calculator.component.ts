import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/emi-calculator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './model/ApiResponse';

@Component({
  selector: 'emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.scss']
})
export class EmiCalculator {
  myForm: FormGroup;
  apiResponse: ApiResponse;
  loanTypes = ['Personal', 'Home', 'Car'];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      // Assumed the max loan value is 1 billion (can be changed accordingly)
      loanType: ['', Validators.required],
      loanValue: ['', [Validators.required, Validators.min(1), Validators.max(1000000000)]],
      interestRate: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      loanTerm: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value); 

      this.apiService.sendDataToApi(this.myForm.value).subscribe({
        next: (response) => {
          console.log('Form data sent successfully', response);
          this.apiResponse = response;
        },
        error: (error) => {
          console.error('Error sending form data', error);
        }
      });
    } else {
      this.validateAllFormFields(this.myForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }s
}
