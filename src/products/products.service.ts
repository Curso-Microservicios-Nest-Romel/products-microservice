import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Prisma Client connected');
  }
  create(createProductDto: CreateProductDto) {
    console.log({ createProductDto });
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.product.count({ where: { avaliable: true } });
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { avaliable: true },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      meta: {
        total: totalPages,
        lastPage: lastPage,
        // currentPage: page,
        page,
        limit,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id, avaliable: true },
    });

    if (!product) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `Product with id ${id} not found`,
      });
    }

    return product;
    // return `This action returns a #${id} product`;
  }

  // async update(id: number, updateProductDto: UpdateProductDto) {
  //   await this.findOne(id);

  //   return this.product.update({
  //     where: { id },
  //     data: updateProductDto,
  //   });
  // }
  // async update(id: number, updateProductDto: UpdateProductDto) {
  async update(updateProductDto: UpdateProductDto) {
    const { id, ...data } = updateProductDto;
    console.log(id);

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    // return this.product.delete({
    //   where: { id },
    // });
    return this.product.update({
      where: { id },
      data: {
        avaliable: false,
      },
    });
  }
}
