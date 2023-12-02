import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
	/*
		GET /users
		GET /users/:id
		POST /users
		PATCH /users/:id
		DELETE /users:/id
	 */
	
	constructor(private readonly _usersService: UsersService){}
	
	@Get()
	findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
    return this._usersService.findAll(role);
	}

	// @Get('interns')
	// findAllInterns(){
	// 	return []
	// }

	@Get(':id')
	findOne(@Param('id', ParseIntPipe)  id: number){
		return this._usersService.findOne(id)
	}

	@Post()
	// create(@Body() user: {
	// 	name: string,
	// 	email: string,
	// 	role: 'INTERN' | 'ENGINEER' | 'ADMIN'
	// }){
	// 	return this._usersService.create(user)
	// }
	create(@Body(ValidationPipe) createUserDto: CreateUserDto){
		return this._usersService.create(createUserDto)
	}

	@Patch(':id')
	// update(@Param('id', ParseIntPipe) id: number, @Body() updUser: {
	// 	name?: string,
	// 	email?: string,
	// 	role?: 'INTERN' | 'ENGINEER' | 'ADMIN'
	// }){
	// 	return this._usersService.update(id, updUser)
	// }
	update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updUserDto: UpdateUserDto){
		return this._usersService.update(id, updUserDto)
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number){
		return this._usersService.delete(id)
	}
}
