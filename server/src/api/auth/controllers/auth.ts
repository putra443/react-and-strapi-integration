import bcrypt from "bcrypt";
import userService from "../services/user";
import { signToken } from "../services/jwt";

export default {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;

    if (!identifier || !password) {
      return ctx.badRequest("Identifier & password required");
    }

    // 1. Cari user
    const user = await userService.findByIdentifier(identifier);
    if (!user) {
      return ctx.unauthorized("Invalid credentials");
    }

    // 2. Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return ctx.unauthorized("Invalid credentials");
    }

    // 3. Generate JWT
    const token = signToken({
      id: user.id,
      email: user.email,
    });

    // 4. Response
    ctx.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      },
    });
  },
};
