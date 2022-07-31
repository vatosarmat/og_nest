import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module, NotFoundException } from '@nestjs/common'
import { ProjectsModule } from './projects/projects.module'

import dbConfig from '../mikro-orm.config'

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...dbConfig,
      findOneOrFailHandler: entityName => {
        return new NotFoundException(`${entityName} not found!`)
      },
    }),
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
