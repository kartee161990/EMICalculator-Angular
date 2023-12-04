import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';
import { EmiCalculator } from './emi-calculator.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api/emi-calculator.service';

describe('EmiCalculator', () => {
  let component: EmiCalculator;
  let fixture: ComponentFixture<EmiCalculator>;
  let apiService: ApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmiCalculator],
      providers: [FormBuilder, ApiService],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiCalculator);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form properly in ngOnInit', () => {
    expect(component.myForm).toBeDefined();
  });

  it('should call ApiService and set apiResponse on form submission', () => {
    const mockFormValue = {
      loanType: 'Personal',
      loanValue: 12000,
      interestRate: 11,
      loanTerm: 3,
      email: 'test@abc.com'
    };
    const mockApiResponse = { 
      loanType: 'Personal',
      loanValue: 12000,
      interestRate: 11,
      loanTerm: 3,
      email: 'test@abc.com',
      emi: 393
     };
    spyOn(apiService, 'sendDataToApi').and.returnValue(of(mockApiResponse));

    component.myForm.setValue(mockFormValue);
    component.onSubmit();

    fixture.detectChanges();

    expect(apiService.sendDataToApi).toHaveBeenCalledWith(mockFormValue);
    expect(component.apiResponse).toEqual(mockApiResponse);
  });

  it('should mark form fields as touched when form is invalid on form submission', () => {
    const mockFormValue = {
      loanType: 'Personal',
      loanValue: -100, // Invalid loan value
      interestRate: 5,
      loanTerm: 10,
      email: 'test@abc.com'
    };
    spyOn(apiService, 'sendDataToApi'); // Spy on sendDataToApi, it should not be called as form is invalid
  
    component.myForm.setValue(mockFormValue);
    component.onSubmit();
  
    fixture.detectChanges();
  
    expect(component.myForm.invalid).toBeTrue();
    expect(component.myForm.get('loanValue').touched).toBeTrue();
    expect(apiService.sendDataToApi).not.toHaveBeenCalled();
  });
  
  it('should verify loanTypes array initialized properly', () => {
    expect(component.loanTypes).toEqual(['Personal', 'Home', 'Car']);
  });

  it('should validate email format', () => {
    const invalidEmail = 'invalid-email'; // Invalid email format
    const validEmail = 'test@abc.com'; // Valid email format
  
    component.myForm.get('email').setValue(invalidEmail);
    expect(component.myForm.get('email').valid).toBeFalse();
  
    component.myForm.get('email').setValue(validEmail);
    expect(component.myForm.get('email').valid).toBeTrue();
  });
  
  it('should ensure loanValue is greater than 0', () => {
    const invalidLoanValue = -10; // Invalid loan value
    const validLoanValue = 100000; // Valid loan value
  
    component.myForm.get('loanValue').setValue(invalidLoanValue);
    expect(component.myForm.get('loanValue').valid).toBeFalse();
  
    component.myForm.get('loanValue').setValue(validLoanValue);
    expect(component.myForm.get('loanValue').valid).toBeTrue();
  });
  
  it('should ensure interestRate is between 1 and 100', () => {
    const invalidInterestRate = 150; // Invalid interest rate
    const validInterestRate = 5; // Valid interest rate
  
    component.myForm.get('interestRate').setValue(invalidInterestRate);
    expect(component.myForm.get('interestRate').valid).toBeFalse();
  
    component.myForm.get('interestRate').setValue(validInterestRate);
    expect(component.myForm.get('interestRate').valid).toBeTrue();
  });

  it('should ensure loan term is between 1 and 30', () => {
    const invalidLoanTerm = 100; // Invalid loan term
    const validLoanTerm = 5; // Valid loan term
  
    component.myForm.get('loanTerm').setValue(invalidLoanTerm);
    expect(component.myForm.get('loanTerm').valid).toBeFalse();
  
    component.myForm.get('loanTerm').setValue(invalidLoanTerm);
    expect(component.myForm.get('loanTerm').valid).toBeTrue();
  });

});
