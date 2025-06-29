import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../model/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:8080/api/applications'

  constructor(private http: HttpClient) { }

  applyForInternship(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  getApplicationsByStudent(studentId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getApplicationsByInternship(internshipId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/internship/${internshipId}`);
  }

  getApplicationsByCompany(companyId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/company/${companyId}`);
  }

  updateApplicationStatus(applicationId: number, status: string): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${applicationId}/status/${status}`, {});
  }

  hasAlreadyApplied(studentId: number, internshipId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check/${studentId}/${internshipId}`);
  }
}
