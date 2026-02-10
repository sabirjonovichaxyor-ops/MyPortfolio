export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  url: string;
  color: 'blue' | 'green' | 'purple';
}
