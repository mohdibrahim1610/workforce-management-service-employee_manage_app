import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Master } from '../../services/master';
import { DepartmentModel } from '../../models/DepartmentModel';
import { DesignationModel } from '../../models/DesignationModel';

@Component({
  selector: 'app-designation',
  imports: [ReactiveFormsModule],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation implements OnInit {

  designationForm!: FormGroup;
  isEditMode = false;
  editingId: number | null = null;

  fb = inject(FormBuilder);
  masterService = inject(Master);

  depList = signal<DepartmentModel[]>([]);
  desgList = signal<DesignationModel[]>([]);

  ngOnInit() {
    this.createForm();
    this.loadDepartments();
    this.loadDesignations();
  }

  createForm() {
    this.designationForm = this.fb.group({
      designationId: [0],
      departmentId: [0, Validators.required],
      designationName: ['', Validators.required]
    });
  }

  loadDepartments() {
    this.masterService.getAllDepartments().subscribe({
      next: (res: DepartmentModel[]) => this.depList.set(res),
      error: (err) => console.error('Error loading departments:', err)
    });
  }

  loadDesignations() {
    this.masterService.getAllDesignations().subscribe({
      next: (res: DesignationModel[]) => this.desgList.set(res),
      error: (err) => console.error('Error loading designations:', err)
    });
  }

  save(): void {
    if (this.designationForm.invalid) return;

    const formValue: DesignationModel = { ...this.designationForm.value, departmentId: Number(this.designationForm.value.departmentId) };

    if (this.isEditMode && this.editingId !== null) {
      this.masterService.updateDesignation(this.editingId, formValue).subscribe({
        next: () => { this.loadDesignations(); this.reset(); },
        error: (err) => console.error('Error updating:', err)
      });
    } else {
      this.masterService.saveDesignation(formValue).subscribe({
        next: () => { this.loadDesignations(); this.reset(); },
        error: (err) => console.error('Error saving:', err)
      });
    }
  }

  edit(desg: DesignationModel): void {
    this.isEditMode = true;
    this.editingId = desg.designationId;
    this.designationForm.patchValue({
      designationId: desg.designationId,
      departmentId: desg.departmentId,
      designationName: desg.designationName
    });
  }

  remove(id: number): void {
    this.masterService.deleteDesignation(id).subscribe({
      next: () => this.loadDesignations(),
      error: (err) => console.error('Error deleting:', err)
    });
  }

  reset(): void {
    this.designationForm.reset({ designationId: 0, departmentId: 0, designationName: '' });
    this.isEditMode = false;
    this.editingId = null;
  }
}