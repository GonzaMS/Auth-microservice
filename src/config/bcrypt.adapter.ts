import bcrypt, { genSaltSync, hashSync } from "bcrypt";

export const bcryptAdapter = {
  hash: async (password: string): Promise<string> => {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },

  compare: async (password: string, hashed: string): Promise<boolean> => {
    return bcrypt.compareSync(password, hashed);
  },
};
