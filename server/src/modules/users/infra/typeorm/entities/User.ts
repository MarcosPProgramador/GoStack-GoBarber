import { Exclude, Expose } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar ? `${process.env.APP_API_URL}/static/${this.avatar}` : null
  }
}
export default User
