import { Column } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SubscribeDto {
  @Column()
  @IsNotEmpty()
  username: string;
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Column()
  @IsNotEmpty()
  password: string;
}
