import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

/* import { v4 as uuid } from "uuid"; */

@Entity()
class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
/*     if(!this.id) {
      this.id = uuid();
    } */
  }
}

export { User };
