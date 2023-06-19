import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoryProviders } from './categories.providers';
import { DatabaseModule } from 'src/config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';

@Module({
    imports:[
        DatabaseModule,
        TypeOrmModule.forFeature([Category])
    ],
    controllers: [CategoriesController],
    providers: [
        CategoriesService,
        ...categoryProviders
    ]
})
export class CategoriesModule {}
