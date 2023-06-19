import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { EXCEPTION_FILTERS_METADATA } from '@nestjs/common/constants';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    createCategory(@Body(ValidationPipe) createCategoryDto:CreateCategoryDto) {
        return this.categoriesService.createCategory(createCategoryDto);
    }

    @Patch('/:id')
    updateCategory(@Param('id') id:number,@Body(ValidationPipe) updateCategoryDto:UpdateCategoryDto) {
        return this.categoriesService.updateCategory(id,updateCategoryDto);
    }
    
    @Get()
    getAllCategories() {
        return this.categoriesService.getAllCategories();
    }
    
    @Get('/:id')
    getCategoryById(@Param('id') id:number) {
        return this.categoriesService.getCategoryById(id);
    }
    
    @Delete('/:id')
    deleteCategory(@Param('id') id:number) {
        return this.categoriesService.deleteCategory(id);
    }

}

