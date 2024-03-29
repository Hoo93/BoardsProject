import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig:TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'postgres',
    database:'nest-board',
    entities:[
        __dirname + '/../*.entity.{js,ts}'
    ],
    synchronize:true,
    autoLoadEntities:true
};