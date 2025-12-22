import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GpContentService } from 'src/app/services/gp-content.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  isAdmin = false;
  rows: any[] = [];

  form: any = {
    id: null,
    title: '',
    description: '',
    link: ''
  };

  constructor(
    private auth: AuthService,
    private gp: GpContentService
  ) {}

  ngOnInit(): void {

    // 📖 Public read
    this.gp.getReports().subscribe(data => {
      this.rows = data;
    });

    // 🔐 Logged-in check only
    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

  // ➕ ADD / ✏️ UPDATE
  save() {
    if (!this.isAdmin) return;

    if (this.form.id) {
      this.gp.updateReport(this.form.id, {
        title: this.form.title,
        description: this.form.description,
        link: this.form.link
      });
    } else {
      this.gp.addReport({
        title: this.form.title,
        description: this.form.description,
        link: this.form.link
      });
    }

    this.reset();
  }

  // ✏️ EDIT
  edit(row: any) {
    this.form = { ...row };
  }

  // ❌ DELETE
  delete(id: string) {
    if (!this.isAdmin) return;

    if (confirm('Are you sure you want to delete this report?')) {
      this.gp.deleteReport(id);
    }
  }

  reset() {
    this.form = {
      id: null,
      title: '',
      description: '',
      link: ''
    };
  }
}
