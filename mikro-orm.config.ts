import type { Options } from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TSMigrationGenerator } from '@mikro-orm/migrations'

const options: Options<PostgreSqlDriver> = {
  entities: ['./dist/src/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'og_nest',
  user: 'og_nest',
  password: '123',
  host: 'localhost',
  port: 5432,
  type: 'postgresql' as const,
  migrations: {
    path: './db/migrations',
    // pathTs: undefined,
    tableName: 'mikro_orm_migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: 'ts' as const,
    generator: TSMigrationGenerator,
  },
  seeder: {
    path: './db/seeders',
    // pathTs: undefined,
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts' as const,
    fileName: (className: string) => className,
  },
}

export default options
