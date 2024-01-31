export interface UserPayload {
  id: string;
  sub: string;
  email: string;
  name: string;
  isActive: boolean;
  shopman: boolean;
  iat?: number;
  exp?: number;
}
