export class User {
  constructor({ id, username, email, fullName, passwordHash, createdAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
  }

  toPublic() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
      createdAt: this.createdAt
    };
  }
}
