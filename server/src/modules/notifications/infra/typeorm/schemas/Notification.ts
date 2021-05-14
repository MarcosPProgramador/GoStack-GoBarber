import {ObjectID, CreateDateColumn, UpdateDateColumn,Entity, Column, ObjectIdColumn} from 'typeorm'

@Entity('notifications')
export default class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column('uuid')
  recipient_id: string

  @Column({ default: false })
  read: boolean

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date

}


