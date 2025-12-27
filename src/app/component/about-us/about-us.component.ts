import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GpContentService } from 'src/app/services/gp-content.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  isAdmin = false;

  about: any = {
    intro: '',
    historyDesc: '',
    objectivesList: [],
    servicesIntro: '',
    servicesList: [],
    contactAddress: '',
    contactPhone: '',
    contactEmail: ''
  };

  constructor(
    private auth: AuthService,
    private gp: GpContentService
  ) {}

  ngOnInit(): void {
    this.loadAbout();

    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

  loadAbout() {
    this.gp.getAbout().subscribe(data => {
      if (data) {
        this.about = data;
      }
    });
  }

  save() {
    if (!this.isAdmin) return;

    this.gp.updateAbout(this.about).then(() => {
      alert('About section updated');
      this.loadAbout();
    });
  }
}
