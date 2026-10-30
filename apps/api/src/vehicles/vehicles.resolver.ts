import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Vehicle } from './models/vehicle.model';
import { VehiclesService } from './vehicles.service';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Mutation(() => Vehicle)
  createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput) {
    return this.vehiclesService.create(createVehicleInput);
  }

  @Query(() => [Vehicle], { name: 'vehicles' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Query(() => Vehicle, { name: 'vehicle', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Mutation(() => Vehicle)
  updateVehicle(@Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput) {
    return this.vehiclesService.update(updateVehicleInput.id, updateVehicleInput);
  }

  @Mutation(() => Vehicle)
  removeVehicle(@Args('id', { type: () => ID }) id: string) {
    return this.vehiclesService.remove(id);
  }
}
