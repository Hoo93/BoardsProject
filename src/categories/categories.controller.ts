import { Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { EXCEPTION_FILTERS_METADATA } from '@nestjs/common/constants';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
}

