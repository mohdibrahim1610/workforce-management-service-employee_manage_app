import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DepartmentModel } from '../models/DepartmentModel';

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

}
