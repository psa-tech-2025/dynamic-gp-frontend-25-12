import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  success = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  async submit() {
    if (this.form.invalid) return;

    try {
      await this.auth.forgotPassword(this.form.value.email!);
      this.success = true;
      this.error = '';
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
