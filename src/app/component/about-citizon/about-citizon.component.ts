import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GpContentService } from 'src/app/services/gp-content.service';

@Component({
  selector: 'app-about-citizon',
  templateUrl: './about-citizon.component.html',
  styleUrls: ['./about-citizon.component.css']
})
export class AboutCitizonComponent implements OnInit {

  isAdmin = false;

  data: any = {
    servicesIntro: '',
    applicationsIntro: '',
    complaintDescription: ''
  };

  constructor(
    private auth: AuthService,
    private gp: GpContentService
  ) {}

  ngOnInit(): void {

    // 📖 Public read
this.gp.getCitizenInfo().subscribe((res: any) => {
  this.data = res;
});

        // 🔐 Logged-in check only
    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

  save() {
    if (!this.isAdmin) return;
    this.gp.updateCitizenInfo(this.data);
  }
}
