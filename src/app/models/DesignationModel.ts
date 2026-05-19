// export interface DesignationModel {
//   designationId: number;
//   departmentId: number;
//   designationName: string;
//     isActive: boolean;

// }
export interface DesignationModel {
  designationId: number;
  departmentId: number;
  designationName: string;
    departmentName: string;  // ← add this

}
export interface DesignationListModel {
  designationId: number;
  departmentId: number;
  designationName: string;
  departmentName: string;
}