import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User;

  @Column("timestamp with time zone")
  date: Date;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
export default Appointment;
