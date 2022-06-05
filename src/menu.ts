import readline from "readline";
import path from "path";
import fs from "fs";
import { Template } from "./templates";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class Menu {
  private readonly templates: Template[];
  constructor(templates: Template[]) {
    this.templates = templates;
  }

  displayTemplates() {
    for (const template of this.templates) {
      console.log(`${template.id}. ${template.name}`);
    }
  }

  selectTemplate() {
    rl.question("Select index of template you want to use: ", (answer) => {
      const template = this.getTemplate(answer);
      if (template) {
        console.log(`Selected: ${template.name}`);
        rl.question("Where to create project?", (answer) => {
          const selectedPath = path.resolve(answer);
          this.useTemplate(selectedPath, template);
          rl.close();
        });
      } else {
        console.error("Wrong input!");
        rl.close();
      }
    });
  }

  private useTemplate(dest: string, template: Template) {
    const folderExists = fs.existsSync(dest);
    if (!folderExists) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const isEmpty = isEmptyDir(dest);
    if (!isEmpty) {
      throw Error("Directory is not empty!");
    }

    copyFiles(template.path, dest);
    console.log(`Template ${template.name} prepared at ${dest}.`);
  }

  private getTemplate(id: string): Template {
    try {
      const parsed = parseInt(id);
      const optionExists = this.templates.find(
        (template) => template.id === parsed
      );
      return optionExists;
    } catch {
      return null;
    }
  }
}

function isEmptyDir(selectedPath: string): boolean {
  const files = fs.readdirSync(selectedPath);
  return files.length === 0;
}

function copyFiles(from: string, to: string) {
  fs.mkdirSync(to, { recursive: true });
  const files = fs.readdirSync(from, { withFileTypes: true });
  for (const file of files) {
    const source = path.join(from, file.name);
    if (file.name === "gitignore") {
      file.name = ".gitignore";
    }
    const dest = path.join(to, file.name);
    if (file.isDirectory()) {
      copyFiles(source, dest);
    } else {
      fs.copyFileSync(source, dest);
    }
  }
}
