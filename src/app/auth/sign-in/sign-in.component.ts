import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  isRegister = false;
  error = '';

  authForm = this.fb.group({
    name: [''],
    mobile: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  toggleMode() {
    this.isRegister = !this.isRegister;
    this.error = '';

    if (this.isRegister) {
      this.authForm.get('name')?.setValidators(Validators.required);
      this.authForm.get('mobile')?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]);
    } else {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('mobile')?.clearValidators();
    }

    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('mobile')?.updateValueAndValidity();
  }

  async onSubmit() {
    if (this.authForm.invalid) return;

    const { name, mobile, email, password } = this.authForm.value;

    try {
      if (this.isRegister) {
        await this.auth.register(name!, email!, mobile!, password!);
        this.router.navigate(['/verify-email']);
      } else {
        await this.auth.login(email!, password!);
        await this.auth.setSession();
        this.router.navigate(['/']);
      }
    } catch (err: any) {

  if (err.message === 'EMAIL_NOT_ALLOWED') {
    this.error = 'You are not authorized to login to this portal.';
  }
  else if (err.message === 'EMAIL_NOT_VERIFIED') {
    this.router.navigate(['/verify-email']);
  }
  else {
    this.error = err.message || 'Authentication failed';
  }

}

  }
}
