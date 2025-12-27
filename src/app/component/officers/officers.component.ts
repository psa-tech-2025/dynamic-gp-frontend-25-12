import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OFFICERSComponent implements OnInit {

  officers: any[] = [];

  // 🔐 login-only controls
  isAdmin = false;

  // form model
  form = {
    id: null as string | null,
    name: '',
    post: '',
    phone: ''
  };

  constructor(
    private gp: GpContentService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {

    // 📖 Public read
    this.gp.getOfficers().subscribe(data => {
this.officers = data.map((o: any, i: number) => ({
  ...o,
  id: o._id,          // 👈 map Mongo _id to id
  idDisplay: i + 1
}));

    });

    // 🔐 Logged-in check only
    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

 save() {
  if (!this.isAdmin) {
    alert('Unauthorized');
    return;
  }

  const payload = {
    name: this.form.name,
    post: this.form.post,
    phone: this.form.phone
  };

  if (this.form.id) {
    this.gp.updateOfficer(this.form.id, payload)
      .then(() => this.reload());
  } else {
    this.gp.addOfficer(payload)
      .then(() => this.reload());
  }

  this.reset();
}


  edit(officer: any) {
    if (!this.isAdmin) return;

    this.form = {
      id: officer.id,
      name: officer.name,
      post: officer.post,
      phone: officer.phone
    };
  }

delete(id: string) {
  if (!this.isAdmin) {
    alert('Unauthorized');
    return;
  }

  if (confirm('Delete this officer?')) {
    this.gp.deleteOfficer(id)
      .then(() => this.reload());
  }
}

  reset() {
    this.form = { id: null, name: '', post: '', phone: '' };
  }
  reload() {
  this.gp.getOfficers().subscribe(data => {
    this.officers = data.map((o: any, i: number) => ({
      ...o,
      id: o._id,
      idDisplay: i + 1
    }));
  });
}

}
