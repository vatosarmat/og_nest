import { execSync } from 'node:child_process'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors()
  }
  if (process.env.GLOBAL_PREFIX) {
    app.setGlobalPrefix(process.env.GLOBAL_PREFIX)
  }
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000)
}

if (process.argv.length > 2) {
  const subcommand = process.argv[2]
  switch (subcommand) {
    case 'db:reset':
      import('../mikro-orm.config').then(dbConfig => {
        const { dbName, user, password } = dbConfig.default
        const sql = `\
DROP DATABASE IF EXISTS ${dbName};\
DROP USER IF EXISTS ${user};\
CREATE USER ${user} WITH ENCRYPTED PASSWORD '${password}';\
CREATE DATABASE ${dbName} WITH OWNER ${user};
`
        const result = execSync(`psql -d postgres -f -`, {
          input: sql,
        })
        console.log(result.toString())
      })

      break
    default:
      console.log('Unknwon subcommand!')
  }
} else {
  bootstrap()
}
