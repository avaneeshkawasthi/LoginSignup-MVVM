import { getDatabase } from '../database/sqlite.connection.js';

export class SqliteContactRepository {
  constructor(database = getDatabase()) {
    this.db = database;
  }

  create({ name, email, topic, message }) {
    const result = this.db
      .prepare(
        `INSERT INTO contact_messages (name, email, topic, message)
         VALUES (@name, @email, @topic, @message)`
      )
      .run({ name, email, topic, message });

    return {
      id: Number(result.lastInsertRowid),
      name,
      email,
      topic,
      message
    };
  }
}
