// `Define Database` models as entities.
// This will replace taskModel.js file.

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'list' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Will default to today's date if not provided
  date_input: Date;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ default: false })
  checked: boolean;
}
