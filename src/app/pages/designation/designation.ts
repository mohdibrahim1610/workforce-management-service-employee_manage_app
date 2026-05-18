import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';

import { DepartmentModel } from '../../models/DepartmentModel';
import { DesignationModel } from '../../models/DesignationModel';

@Component({
  selector: 'app-designation',
  imports: [FormsModule],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation implements OnInit {

  designation: DesignationModel = this.getEmpty();
  isEditMode = false;
  editingId: number | null = null;

  masterService = inject(Master);

  depList = signal<DepartmentModel[]>([]);
  desgList = signal<DesignationModel[]>([]);

  ngOnInit() {
    this.getAllDepartments();
    this.getAllDesignations();
  }

  private getEmpty(): DesignationModel {
  return { designationId: 0, departmentId: 0, designationName: '', isActive: true };
}

  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe({
      next: (data: DepartmentModel[]) => this.depList.set(data),
      error: (err) => console.error('Error loading departments:', err)
    });
  }

  getAllDesignations() {
    this.masterService.getAllDesignations().subscribe({
      next: (data: DesignationModel[]) => this.desgList.set(data),
      error: (err) => console.error('Error loading designations:', err)
    });
  }

  save(): void {
    if (this.isEditMode && this.editingId !== null) {
      this.masterService.updateDesignation(this.editingId, this.designation).subscribe({
        next: () => { this.getAllDesignations(); this.reset(); },
        error: (err) => console.error('Error updating:', err)
      });
    } else {
      this.masterService.saveDesignation(this.designation).subscribe({
        next: () => { this.getAllDesignations(); this.reset(); },
        error: (err) => console.error('Error saving:', err)
      });
    }
  }

  edit(desg: DesignationModel): void {
    this.isEditMode = true;
    this.editingId = desg.designationId;
    this.designation = { ...desg };
  }

  remove(id: number): void {
    this.masterService.deleteDesignation(id).subscribe({
      next: () => this.getAllDesignations(),
      error: (err) => console.error('Error deleting:', err)
    });
  }

  reset(): void {
    this.designation = this.getEmpty();
    this.isEditMode = false;
    this.editingId = null;
  }
}