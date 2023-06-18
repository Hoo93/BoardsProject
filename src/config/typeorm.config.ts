import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nest-board',
    entities: [__dirname + '/../entity/*.entity.{js,ts}'],
    synchronize: true,
    autoLoadEntities:true
};
  