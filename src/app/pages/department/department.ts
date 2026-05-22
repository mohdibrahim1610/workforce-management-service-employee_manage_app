import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { DepartmentModel } from '../../models/DepartmentModel';

// export interface DepartmentModel {
//   id: number;
//   name: string;
//   isActive: boolean;
// }

@Component({
  selector: 'app-department',
  imports: [FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {

  department: DepartmentModel  = this.getEmpty();
  isEditMode = false;
  editingId: number | null = null;
  masterService= inject(Master);

  depList = signal<DepartmentModel[]>([]);

  ngOnInit() {
    this.getAllDepartments();
  }

  // departments: DepartmentModel [] = [
  //   { id: 1, name: 'Human Resources', isActive: true },
  //   { id: 2, name: 'Engineering', isActive: true },
  //   { id: 3, name: 'Finance & Accounts', isActive: false },
  // ];

  private getEmpty(): DepartmentModel  {
  return { departmentId: 0, departmentName: '', isActive: true };  // ← fix
  }

  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe((data: any) => {
      // this.departments = data;
      this.depList.set(data);
    });
  }
save(): void {
  if (this.isEditMode && this.editingId !== null) {
    // UPDATE
    this.masterService.updateDepartment(this.editingId, this.department).subscribe({
      next: () => {
        this.getAllDepartments();
        this.reset();
      },
      error: (err) => console.error('Error updating department:', err)
    });
  } else {
    // CREATE
    this.masterService.saveDepartment(this.department).subscribe({
      next: () => {
        this.getAllDepartments();
        this.reset();
      },
      error: (err) => console.error('Error saving department:', err)
    });
  }
}

// Only populate the form — NO API call here
edit(dept: DepartmentModel): void {
  this.isEditMode = true;
  this.editingId = dept.departmentId;  // ← fix
  this.department = { ...dept };  // spreads into form fields
}

 remove(departmentId: number): void {
  alert("are you sure to delete this record?");
  this.masterService.deleteDepartment(departmentId).subscribe({
    next: () => this.getAllDepartments(),
    error: (err) => console.error('Error deleting department:', err)
  });
}

  reset(): void {
    this.department = this.getEmpty();
    this.isEditMode = false;
    this.editingId = null;
  }
}