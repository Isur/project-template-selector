#! /usr/bin/env node

import { Menu } from "./menu";
import { templates } from "./templates";

const menu = new Menu(templates);
menu.displayTemplates();
menu.selectTemplate();
