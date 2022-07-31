import { Migration } from '@mikro-orm/migrations';

export class Migration20220731071225 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "project" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null);');

    this.addSql('create table "todo" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "text" varchar(255) not null, "is_completed" boolean not null default false, "project_id" int not null);');

    this.addSql('alter table "todo" add constraint "todo_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_project_id_foreign";');

    this.addSql('drop table if exists "project" cascade;');

    this.addSql('drop table if exists "todo" cascade;');
  }

}
