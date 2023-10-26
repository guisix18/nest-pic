export interface UserPayload {
  id: string;
  sub: string;
  email: string;
  name: string;
  isActive: boolean;
  iat?: number;
  exp?: number;
}
