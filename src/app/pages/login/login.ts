import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

loginObj:any = {
  email: '',
  password: ''
};

http= inject(HttpClient);
    router = inject(Router);

onLogin(){
  console.log(this.loginObj);
  this.http.post('https://localhost:7069/api/EmployeeMaster/login', this.loginObj).subscribe((res:any)=>{
    debugger;
    console.log(res);
    if(res.message === 'Login successful'){
      alert('Login successful!' + res.data.name);
      this.router.navigateByUrl("dashboard");
      localStorage.setItem('loggedUser', JSON.stringify(res.data));
      localStorage.setItem('token', res.token);
    } else {
      alert('Login failed: ' + res.message);
    }
  }, err => {
    console.error(err);
      if (err.status === 401) {
            alert('Invalid email or password.');
          } else if (err.status === 400) {
            alert('Validation error: ' + JSON.stringify(err.error.errors));
          } else {
            alert('Server error. Please try again.');
          }
  });

}
}
