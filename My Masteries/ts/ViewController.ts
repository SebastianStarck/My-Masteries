import { TemplateData, MasteriesData } from "./Interfaces";
const pug = require('pug');

export function compileTemplate(view: string, data?: TemplateData | MasteriesData): string {
    return pug.renderFile(`templates/${view}.pug`, data || {
        title: 'My Masteries'
    });
}