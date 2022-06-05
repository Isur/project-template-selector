import path from "path";

export interface Template {
  id: number;
  path: string;
  name: string;
}

export const templates: Template[] = [
  {
    id: 1,
    path: path.resolve(__dirname, "templates/typescript-app"),
    name: "Simple Typescript App with jest, husky, linter, prettier.",
  },
];
