import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SCHEMESComponent implements OnInit {

  schemes: any[] = [];

  isAdmin = false;

  form = {
    id: null as string | null,
    name: '',
    desc: '',
    link: ''
  };

  constructor(
    private gp: GpContentService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // 🔓 Public read
this.gp.getSchemes().subscribe((data: any[]) => {
  this.schemes = data.map((s: any) => ({
    ...s,
    id: s._id   // 👈 map Mongo _id → id
  }));
});



    // 🔐 Role check
   this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

save() {
  if (!this.isAdmin) return;

  const payload = {
    name: this.form.name,
    desc: this.form.desc,
    link: this.form.link
  };

  if (this.form.id) {
    this.gp.updateScheme(this.form.id, payload)
      .then(() => this.reload());
  } else {
    this.gp.addScheme(payload)
      .then(() => this.reload());
  }

  this.reset();
}


  edit(scheme: any) {
    this.form = { ...scheme };
  }

delete(id: string) {
  if (!this.isAdmin) return;

  if (confirm('Delete this scheme?')) {
    this.gp.deleteScheme(id)
      .then(() => this.reload());
  }
}


  reset() {
    this.form = { id: null, name: '', desc: '', link: '' };
  }
  reload() {
  this.gp.getSchemes().subscribe((data: any[]) => {
    this.schemes = data.map((s: any) => ({
      ...s,
      id: s._id
    }));
  });
}

}
