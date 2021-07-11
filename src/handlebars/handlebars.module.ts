import { Module } from '@nestjs/common';
import * as Handlebars from 'hbs';
import * as fs from 'fs';
import * as path from 'path';

const partialsDir = path.join(__dirname, '..','..','views','partials');
const filenames = fs.readdirSync(partialsDir);

@Module({})
export class HandlebarsModule {
    constructor(){
        Handlebars.registerHelper('uppercase', function(data: string){ return data.toUpperCase();});
        Handlebars.registerHelper('lowercase', function(data: string){ return data.toLowerCase();});
        Handlebars.registerHelper('if', function(conditional: boolean, options){ 
            if(conditional){
                return options.fn(this);
            } else return options.inverse(this);
        });
        
        Handlebars.registerHelper('increase', function(...args) {
            if(args.length < 2) throw new Error('you must input 2 arguments');

            return parseInt(args[0]) + parseInt(args[1]);
        });
        Handlebars.registerHelper('decrease', function(...args) {
            if(args.length < 2) throw new Error('you must input 2 arguments');
            return parseInt(args[0]) - parseInt(args[1]);
        });

        filenames.forEach(function (filename) {
            var matches = /^([^.]+).hbs$/.exec(filename);
            if (!matches) {
              return;
            }
            var name = matches[1];
            var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
            Handlebars.registerPartial(name, template);
          });

    }
}