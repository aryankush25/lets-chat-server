import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany } from 'typeorm';
import { v4 } from 'uuid';
import { Chat } from './Chat';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column()
  hashedPassword: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column('text', {
    unique: true,
    nullable: true,
  })
  socketId: string;

  @ManyToMany(() => Chat)
  chats: Chat[];

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: string;

  @BeforeInsert()
  addInitialFields() {
    this.id = v4();
    this.createdAt = new Date().toISOString();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date().toISOString();
  }
}
