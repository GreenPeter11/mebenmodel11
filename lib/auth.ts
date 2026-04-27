// lib/auth.ts — JWT sign and verify helpers for admin authentication.

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export type AdminPayload = {
    adminId: number;
    email: string;
};

// Signs a JWT token with 8-hour expiry
export function signToken(payload: AdminPayload): string {
    return jwt.sign(payload, SECRET, { expiresIn: "8h" });
}

// Verifies a JWT token and returns the payload, or null if invalid/expired
export function verifyToken(token: string): AdminPayload | null {
    try {
        return jwt.verify(token, SECRET) as AdminPayload;
    } catch {
        return null;
    }
}
