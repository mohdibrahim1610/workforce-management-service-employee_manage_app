import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeModel } from '../models/Employee.Model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

http  = inject(HttpClient);
  apiUrl: string = "http://localhost:5108/api/";

saveEmployee(obj: EmployeeModel) {
  console.log('Saving employee data:', obj);
  // Here you can implement the logic to save the employee data, e.g., make an HTTP POST request to your backend API.
  // Example:
  // return this.http.post('/api/employees', employeeData); 
  return this.http.post(this.apiUrl + 'EmployeeMaster/CreateEmployee', obj); // Using the configured API URL
}

}
