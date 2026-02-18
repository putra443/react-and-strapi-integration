import { verifyToken } from "../api/auth/services/jwt";

export default async (ctx, next) => {
  const authHeader = ctx.request.headers.authorization;
  if (!authHeader) return ctx.unauthorized("Missing token");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    ctx.state.user = decoded;
    await next();
  } catch {
    return ctx.unauthorized("Invalid token");
  }
};
