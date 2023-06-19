import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { getCurrentDateTime } from 'src/getCurrentDateTime';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private readonly categoriesRepository:Repository<Category>
    ) {}

    async createCategory(createCategoryDto:CreateCategoryDto):Promise<Category> {
        const { name } = createCategoryDto;
        try {
            const category = await this.categoriesRepository.create({
                name,
                created_at:getCurrentDateTime(),
                updated_at:getCurrentDateTime()
            });
        
            await this.categoriesRepository.save(category);
            return category
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateCategory(id:number,updateCategoryDto:UpdateCategoryDto):Promise<UpdateResult> {
        const category = await this.getCategoryById(id);

        const result = await this.categoriesRepository.update(id,{...updateCategoryDto,updated_at:getCurrentDateTime()})
        if (result.affected === 0) {
            throw new NotFoundException();
        }

        return result
    }

    async getCategoryById(id:number):Promise<Category> {
        const category = await this.categoriesRepository.findOneBy({id});
        if (!category) {
            throw new NotFoundException('category doesn\'t exist');
        }

        return category
    }

    async getAllCategories():Promise<Category[]> {
        const categories = await this.categoriesRepository.find();
        if (!categories) {
            throw new NotFoundException('category doesn\'t exist');
        }
        return categories;
    }

    async deleteCategory(id:number):Promise<DeleteResult> {
        const category = await this.getCategoryById(id);
        
        const deleteResult = await this.categoriesRepository.delete(category);
        
        return deleteResult;
    }






}
