import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  id: number;
  intra_id: string;
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  created_at: string;
  updated_at: string;
  img_url: string;
  achievements: Array<number>;
  group_member: Array<number>;
}
