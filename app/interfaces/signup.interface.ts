export interface RegisterUserDto {
  first_name: string;
  last_name: string;
  hashed_password: string;
  email: string;
  role: string;
}
