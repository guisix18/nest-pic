const allUsers: User[] = [];

class User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  isActive?: boolean;
  cpf: string;

  private constructor({ name, lastName, email, password, cpf }: User) {
    return Object.assign(this, { name, lastName, email, password, cpf });
  }

  static create({ name, lastName, email, password, cpf }: User) {
    const newUser = new User({ name, lastName, email, password, cpf });
    newUser.isActive = true;
    allUsers.push(newUser);
    return newUser;
  }

  static list(): User[] {
    return allUsers;
  }

  static listById(id: string): User {
    const oneUser = allUsers.find((user) => user.id === id);
    return oneUser;
  }
}

export { User };
