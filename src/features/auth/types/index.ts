export interface RegistrationRequest {
  email: string;
  password: string;
  name: string;
  isTeamLead: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  token?: string;
}
