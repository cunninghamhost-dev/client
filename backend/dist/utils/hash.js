// src/utils/hash.ts
import bcrypt from "bcrypt";
// Named export for hashing
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
// Named export for comparison
export async function comparePassword(password, hashed) {
    return bcrypt.compare(password, hashed);
}
//# sourceMappingURL=hash.js.map