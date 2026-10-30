import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateVehicleInput) {
    return this.prisma.vehicle.create({ data });
  }

  findAll() {
    return this.prisma.vehicle.findMany();
  }

  findOne(id: string) {
    return this.prisma.vehicle.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateVehicleInput) {
    const { id: _id, ...updateData } = data;
    return this.prisma.vehicle.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: string) {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
