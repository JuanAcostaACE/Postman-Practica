import { Controller, Get, Param, Post, Body, Delete} from '@nestjs/common';

interface User {
    id: string;
    name: string;
    email: string;
}

@Controller('users')
export class UserController {
    private users: User[] = [
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com"
        }, 
        {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com"
        }, 
        {
            id: "3",
            name: "Alice Johnson",
            email: "alice.johnson@example.com"
        },
        {
            id: "4",
            name: "Bob",
            email: "bob@example.com"
        },
        {
            id: "5",
            name: "Adolfito",
            email: "adolfitohitler@example.com"
        }
    ]

    @Get()
    getUsers() {
        return this.users;
    }

    @Get('name/:name')
    getUserByName(@Param('name') name: string) {
        console.log('Buscando usuario con nombre: ' + name);
        const search = name.trim().toLowerCase();
        const data = this.users.find(user => user.name.toLowerCase() === search);
        if (!data) {
            console.log('Usuario no encontrado');
            return { message: 'Usuario no encontrado' };
        }
        console.log('Usuario encontrado: ', data);
        return data?.email;
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        console.log('Buscando usuario con id: ' + id);
        const data = this.users.find(user => user.id === id);
        if (!data) {
            console.log('Usuario no encontrado');
            return { message: 'Usuario no encontrado' };
        }
        console.log('Usuario encontrado: ', data);
        return data;
    }

    @Post()
    createUser(@Body() user: User) {
        console.log('Creando usuario: ', user);
        return { message: 'Usuario creado', data: user };
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            console.log('Usuario no encontrado');
            return { message: 'Usuario no encontrado' };
        }
        const [deleted] = this.users.splice(index, 1);
        console.log('Usuario eliminado: ', deleted);
        return { message: 'Usuario eliminado', data: deleted };
    }
}