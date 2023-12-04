# EMI Calculator

Design an Equated Monthly Installment (emi) calculator for home, car and personal
loan.

## Environment 

- Angular CLI Version: 15.2.8
- Angular Core Version: 15.2.8
- Node Version: v14
- Default Port: 8000

### Instalation guide
- Download and install Node js 14.x
- Install Angular: 
```bash
npm -g i @angular/cli@15.2.8
```

## Functionality Requirements

The component must have the following functionalities:

1. Create a form that can take four inputs

- Loan value
- Yearly Interest rate
- Loan Term in years
- Email address of the user

2. Validate these Inputs

- Loan Value -> Must be a positive number.
- Yearly Interest rate -> Must be a positive number between zero and hundred.
- Loan Term -> Positive Number between zero and thirty
- Email

3. Send input to the backend and show information

- Display the emi amount and appropriate error messages when applicable
- Add unit and integration tests where necessary


## API to hit

It will cal Spring boot API to get the calculated emi amount with following url
`http://localhost:8080/api/loan`

## Expected Outputs when result found

We should get the emi based on the form inputs

## Testing

Added following test cases to validate all the inputs and functionality

 EmiCalculator
 ```diff

 + should create App
 + should initialize form properly in ngOnInit
 + should validate email format
 + should ensure interestRate is between 1 and 100
 + should ensure loanValue is greater than 0
 + should verify loanTypes array initialized properly
 + should ensure loan term is between 1 and 30
 + should mark form fields as touched when form is invalid on form submission
 + should call ApiService and set apiResponse on form submission

```
**Commands**
- install: 
```bash
npm install
```
- run: 
```bash
npm start
```
- test: 
```bash
npm test
```

## Sample Test output:

- Home page
<img width="463" alt="Home page" src="https://github.com/kartee161990/EMICalculator-Angular/assets/38460245/a61f01d8-5198-4f37-8391-8a9791b104d6">

- Home page with input values
<img width="482" alt="Home page with input values" src="https://github.com/kartee161990/EMICalculator-Angular/assets/38460245/22a7bc5e-ce04-4f71-8d66-5320a5a26278">

- Home page with validation error
<img width="502" alt="Home page with validation error" src="https://github.com/kartee161990/EMICalculator-Angular/assets/38460245/24db4e93-b4a1-4606-83a7-36038d9b41e9">

- Calculated EMI amount from Backend API
<img width="493" alt="EMI amount from spring boot api" src="https://github.com/kartee161990/EMICalculator-Angular/assets/38460245/0240bcce-6053-4618-a8b3-c0f6134658c6">


