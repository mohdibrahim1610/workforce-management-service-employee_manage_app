import { Component, inject } from '@angular/core';
import { EmployeeModel } from '../../models/Employee.Model';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Master } from '../../services/master';
import { Observable } from 'rxjs';
import { Designation } from '../designation/designation';
import { DesignationListModel } from '../../models/DesignationModel';
import { AsyncPipe } from '@angular/common';
import { DepartmentModel } from '../../models/DepartmentModel';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {

    newEmployeeobj: EmployeeModel = new EmployeeModel();
  employeeService = inject(EmployeeService);
  masterService = inject(Master);
  

 $designationList: Observable<DesignationListModel[]> = new Observable();
  departmentList$: Observable<DepartmentModel[]> = new Observable(); 
    selectedDepartmentId: number = 0; // ← local only, not saved to employee

 constructor() {
    this.$designationList = this.masterService.getAllDesignations();
    this.departmentList$ = this.masterService.getAllDepartments();  // ← assign this
  }


onSaveEmployee() {
  this.newEmployeeobj.designationId = Number(this.newEmployeeobj.designationId);
  
  console.log('Saving:', this.newEmployeeobj);
  this.employeeService.saveEmployee(this.newEmployeeobj).subscribe({
    next: (res) => {
      console.log('Saved successfully:', res);
      this.newEmployeeobj = new EmployeeModel();
    },
    error: (err) => console.error('Error saving employee:', err)
  });
}
}
