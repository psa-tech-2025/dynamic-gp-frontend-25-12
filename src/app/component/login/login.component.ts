import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

//   loginFailed = false;

//   loginForm = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });

//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService,
//     private router: Router
//   ) {}

//   async onSubmit() {
//     if (this.loginForm.invalid) return;

//     try {
//       const { email, password } = this.loginForm.value;
//       await this.auth.login(email!, password!);
//       this.router.navigate(['/dashboard']);
//     } catch {
//       this.loginFailed = true;
//     }
//   }
// }
}
