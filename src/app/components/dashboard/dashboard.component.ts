import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application, ApplicationStatus } from '../../model/application';
import { InternshipPost } from '../../model/internship';
import { User, UserRole } from '../../model/user';
import { AdminService } from '../../service/admin.service';
import { ApplicationService } from '../../service/application.service';
import { AuthService } from '../../service/auth.service';
import { InternshipsService } from '../../service/internships.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  UserRole = UserRole;

  // Admin Dashboard Data
  totalUsers = 0;
  totalInternships = 0;
  recentUsers: User[] = [];

  // Company Dashboard Data
  companyInternships: InternshipPost[] = [];
  companyApplications: Application[] = [];
  pendingApplications = 0;

  // Student Dashboard Data
  studentApplications: Application[] = [];
  availableInternships: InternshipPost[] = [];

  loading = true;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private internshipsService: InternshipsService,
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData();
      }
    });
  }

  loadDashboardData(): void {
    if (!this.currentUser) return;

    switch (this.currentUser.role) {
      case UserRole.ADMIN:
        this.loadAdminDashboard();
        break;
      case UserRole.COMPANY:
        this.loadCompanyDashboard();
        break;
      case UserRole.STUDENT:
        this.loadStudentDashboard();
        break;
    }
  }

  loadAdminDashboard(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.totalUsers = users.length;
        this.recentUsers = users.slice(-5);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading admin data:', error);
        this.loading = false;
      },
    });

    this.internshipsService.getAllInternships().subscribe({
      next: (internships) => {
        this.totalInternships = internships.length;
      },
      error: (error) => console.error('Error loading internships:', error),
    });
  }

  loadCompanyDashboard(): void {
    if (!this.currentUser?.id) return;

    this.internshipsService
      .getInternshipsByCompany(this.currentUser.id)
      .subscribe({
        next: (internships) => {
          this.companyInternships = internships;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading company internships:', error);
          this.loading = false;
        },
      });

    this.applicationService
      .getApplicationsByCompany(this.currentUser.id)
      .subscribe({
        next: (applications) => {
          this.companyApplications = applications;
          this.pendingApplications = applications.filter(
            (app) =>
              app.status === ApplicationStatus.PENDING ||
              app.status === ApplicationStatus.UNDER_REVIEW
          ).length;
        },
        error: (error) =>
          console.error('Error loading company applications:', error),
      });
  }

  loadStudentDashboard(): void {
    if (!this.currentUser?.id) return;

    this.applicationService
      .getApplicationsByStudent(this.currentUser.id)
      .subscribe({
        next: (applications) => {
          this.studentApplications = applications;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading student applications:', error);
          this.loading = false;
        },
      });

    this.internshipsService.getAllInternships().subscribe({
      next: (internships) => {
        this.availableInternships = internships.slice(0, 6);
      },
      error: (error) =>
        console.error('Error loading available internships:', error),
    });
  }
  navigateToInternships(): void {
    this.router.navigate(['/internships']);
  }

  navigateToApplications(): void {
    this.router.navigate(['/applications']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/admin/users']);
  }

  navigateToCreateInternship(): void {
    this.router.navigate(['/internships/create']);
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
