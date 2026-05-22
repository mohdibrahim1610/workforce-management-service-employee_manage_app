import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DepartmentModel } from '../models/DepartmentModel';
import { DesignationModel } from '../models/DesignationModel';

@Injectable({
  providedIn: 'root',
})
export class Master {
  
  apiUrl: string = "http://localhost:5108/api/";
  http = inject(HttpClient);

    getAllDepartments() {
    return this.http.get<DepartmentModel[]>(this.apiUrl + 'DepartmentMaster/GetAllDepartments');
  }
  saveDepartment(department: DepartmentModel) {
    return this.http.post<DepartmentModel[]>(this.apiUrl + 'DepartmentMaster/AddDepartment', department);
  }
  deleteDepartment(id: number) {
    return this.http.delete(this.apiUrl + 'DepartmentMaster/DeleteDepartment/' + id);
  }
  updateDepartment(id: number, department: DepartmentModel) {
    return this.http.put(this.apiUrl + 'DepartmentMaster/UpdateDepartment/' + id, department);
  }


  /// Designation APIs

getAllDesignations() { return this.http.get<DesignationModel[]>(this.apiUrl + 'DesignationMaster'); }
saveDesignation(data: DesignationModel) { 
  return this.http.post(this.apiUrl + 'DesignationMaster/CreateDesignation', data); 
}
updateDesignation(id: number, data: DesignationModel) { return this.http.put(this.apiUrl + 'DesignationMaster/' + id, data); }
deleteDesignation(id: number) { return this.http.delete(this.apiUrl + 'DesignationMaster/' + id); }
}
