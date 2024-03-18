import { v4 as uuidv4 } from "uuid";

export const GenerateRandomId = (): string => {
  return uuidv4();
};
