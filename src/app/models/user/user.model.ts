export class User {
    public id: string;
    public username: string;
    public password: string;
    public email: string;
    public roles: [];
    public firstName: string;
    public lastName: string;
    public address: string;
    public biography: string;
    public orderList: [];
    public artworkList: [];
}

export class LoginRequest {
    public username: string;
    public password: string;
}

export class CreateUserDto {
    public username: string;
    public password: string;
    public email: string;
}

export class UpdateUserDto {
    public id: string;
    public username: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public address: string;
    public biography: string;
}

export class UpdateUserPasswordDto {
    public id: string;
    public previousPassword: string;
    public newPassword: string;
    public checkPassword: string;
}