export interface User {
  id: number;
  email: string;
  name: string;
  photoPath?: string;
  teamLead: boolean;
  emailVerified?: boolean;
}
