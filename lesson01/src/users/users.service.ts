import { Injectable, NotFoundException,  } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
	private users = [
		{
				"id": 1,
				"name": "Leanne Graham",
				"email": "Sincere@april.biz",
				"role": "INTERN",
		},
		{
				"id": 2,
				"name": "Ervin Howell",
				"email": "Shanna@melissa.tv",
				"role": "INTERN",
		},
		{
				"id": 3,
				"name": "Clementine Bauch",
				"email": "Nathan@yesenia.net",
				"role": "ENGINEER",
		},
		{
				"id": 4,
				"name": "Patricia Lebsack",
				"email": "Julianne.OConner@kory.org",
				"role": "ENGINEER",
		},
		{
				"id": 5,
				"name": "Chelsey Dietrich",
				"email": "Lucio_Hettinger@annie.ca",
				"role": "ADMIN",
		}
	]

	findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
		if(role){
			const roles = this.users.filter(user => user.role === role) 
			if(roles.length === 0)
				throw new NotFoundException("Role not found")
			
			return roles
		}

		return this.users
	}

	findOne(id: number){
		const user = this.users.find(u => u.id === id)

		if(!user)
			throw new NotFoundException('User not found')

		return user
	}
	

	// create(user: {
	// 	name: string,
	// 	email: string,
	// 	role: 'INTERN' | 'ENGINEER' | 'ADMIN'
	// })
	create(userDto: CreateUserDto) {
		const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)

		const newUser = {
			id: usersByHighestId[0].id + 1,
			...userDto
		}
		
		this.users.push(newUser)
	}

	// update(id: number, updUser: {
	// 	name?: string,
	// 	email?: string,
	// 	role?:  'INTERN' | 'ENGINEER' | 'ADMIN'
	// })
	update(id: number, userDto: UpdateUserDto) {
		this.users = this.users.map(u => {
			if(u.id === id){
				return {
					...u,
					...userDto
				}
			}

			return u
		})

		return this.findOne(id)
	}

	delete(id: number){
		const removedUser = this.findOne(id)

		this.users = this.users.filter(u => u.id !== id)

		return removedUser
	}
}
