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

}
