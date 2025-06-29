export interface InternshipPost {
  id?: number;
  title: string;
  description: string;
  location: string;
  duration: string;
  requirements: string;
  salary?: string;
  applicationDeadline: string;
  createdAt?: string;
  createdById?: number;
  createdByName?: string;
  companyName?: string;
}

export interface InternshipSearch {
  title?: string;
  location?: string;
}