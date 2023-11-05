import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';

    if (!token) {
      throw new Error("Token not found in cookies");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (!decodedToken || typeof decodedToken.id !== 'string') {
      throw new Error("Invalid or missing 'id' in the token payload");
    }

    return decodedToken.id;
  } catch (error) {
    // Handle different error scenarios
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token: " + error.message);
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired: " + error.message);
    } else {
      throw new Error("Token decoding failed: " + error.message);
    }
  }
};
