import { Component, inject, OnInit } from '@angular/core';
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
  depList : DepartmentModel [] = [];

  ngOnInit() {
    this.getAllDepartments();
  }

  departments: DepartmentModel [] = [
    { id: 1, name: 'Human Resources', isActive: true },
    { id: 2, name: 'Engineering', isActive: true },
    { id: 3, name: 'Finance & Accounts', isActive: false },
  ];

  private getEmpty(): DepartmentModel  {
    return { id: 0, name: '', isActive: true };
  }

  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe((data: any) => {
      this.departments = data;
      this.depList = data;
    });
  }
  save(): void {
    const name = this.department.name.trim();
    if (!name) return;

    if (this.isEditMode && this.editingId !== null) {
      const index = this.departments.findIndex(d => d.id === this.editingId);
      if (index !== -1) {
        this.departments[index] = {
          id: this.editingId,
          name: name,
          isActive: this.department.isActive,
        };
      }
    } else {
      const newId = this.departments.length
        ? Math.max(...this.departments.map(d => d.id)) + 1
        : 1;
      this.departments.push({ id: newId, name: name, isActive: this.department.isActive });
    }

    this.reset();
  }

  edit(dept: DepartmentModel ): void {
    this.isEditMode = true;
    this.editingId = dept.id;
    this.department = { ...dept };
  }

  remove(departmentId: number): void {
    this.departments = this.departments.filter(d => d.id !== departmentId);
    if (this.editingId === departmentId) this.reset();
  }

  reset(): void {
    this.department = this.getEmpty();
    this.isEditMode = false;
    this.editingId = null;
  }
}