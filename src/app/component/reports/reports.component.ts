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

  /* 🔄 LOAD DATA */
  loadReports() {
    this.gp.getReports().subscribe(data => {
      this.rows = data;
    });
  }

  ngOnInit(): void {
    // 📖 Public read
    this.loadReports();

    // 🔐 Logged-in check
    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

  /* ➕ ADD / ✏️ UPDATE */
  save() {
    if (!this.isAdmin) return;

    const payload = {
      title: this.form.title,
      description: this.form.description,
      link: this.form.link
    };

    if (this.form.id) {
      // UPDATE
      this.gp.updateReport(this.form.id, payload).subscribe(() => {
        this.loadReports();
        this.reset();
      });
    } else {
      // ADD
      this.gp.addReport(payload).subscribe(() => {
        this.loadReports();
        this.reset();
      });
    }
  }

  /* ✏️ EDIT */
  edit(row: any) {
    this.form = { ...row, id: row._id };
  }

  /* ❌ DELETE */
  delete(id: string) {
    if (!this.isAdmin) return;

    if (confirm('Are you sure you want to delete this report?')) {
      this.gp.deleteReport(id).subscribe(() => {
        this.loadReports();
      });
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
