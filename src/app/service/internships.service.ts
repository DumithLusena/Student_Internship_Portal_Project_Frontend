import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternshipPost, InternshipSearch } from '../model/internship';

@Injectable({
  providedIn: 'root'
})
export class InternshipsService {

  private apiUrl = 'http://localhost:8080/api/internships';

  constructor(private http: HttpClient) { }

  getAllInternships(): Observable<InternshipPost[]> {
    return this.http.get<InternshipPost[]>(this.apiUrl);
  }

  getInternshipById(id: number): Observable<InternshipPost> {
    return this.http.get<InternshipPost>(`${this.apiUrl}/${id}`);
  }

  searchInternships(search: InternshipSearch): Observable<InternshipPost[]> {
    let params = new HttpParams();
    if (search.title) params = params.set('title', search.title);
    if (search.location) params = params.set('location', search.location);
    
    return this.http.get<InternshipPost[]>(`${this.apiUrl}/search`, { params });
  }

  createInternship(internship: InternshipPost): Observable<InternshipPost> {
    return this.http.post<InternshipPost>(this.apiUrl, internship);
  }

  getInternshipsByCompany(companyId: number): Observable<InternshipPost[]> {
    return this.http.get<InternshipPost[]>(`${this.apiUrl}/company/${companyId}`);
  }

  updateInternship(id: number, internship: InternshipPost): Observable<InternshipPost> {
    return this.http.put<InternshipPost>(`${this.apiUrl}/${id}`, internship);
  }

  deleteInternship(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
