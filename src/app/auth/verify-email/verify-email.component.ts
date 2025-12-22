import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {

  emailSent = false;
  verified = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getCurrentUser().subscribe(user => {
      if (user?.emailVerified) {
        this.verified = true;
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      }
    });
  }

  async sendVerification() {
    await this.auth.sendEmailVerification();
    this.emailSent = true;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
