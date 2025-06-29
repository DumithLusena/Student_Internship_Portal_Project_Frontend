export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW'
}

export interface Application {
  id?: number;
  resumeLink: string;
  coverLetter: string;
  status?: ApplicationStatus;
  appliedAt?: string;
  studentId?: number;
  studentName?: string;
  studentEmail?: string;
  internshipPostId: number;
  internshipTitle?: string;
  companyName?: string;
}