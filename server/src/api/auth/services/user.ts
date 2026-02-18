export default {
  async findByIdentifier(identifier: string) {
    const result = await strapi.db.connection.raw(
      `
      SELECT id, email, password, full_name
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [identifier]
    );

    return result[0][0] || null;
  },
};
