import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
//Esta parte de aqui arriba si la tuve que investigar
//con chat y entender como funcionaba porque no sabia 
//como pedir cosas al cliente y fue la manera que encontre de hacerlo

import { CallFactory, CallBuilder } from './Calls.ts';

async function main() {
    const rl = readline.createInterface({ input, output });
    
    console.log("=== CCP SYSTEM INICIADO ===");

    while (true) {
        try {
            const origin = CallFactory.ran();
            
            // Generamos el teléfono antes de pedir la información
            const builder = new CallBuilder();
            builder.setOrigin(origin).setrandomPhone();
            
            console.log(`\n--- New call: ${origin.type} ---`);
            console.log(`Phone Number: ${builder['form'].phone}`);
            console.log(`Disposition: ${origin.disposition().join(', ')}`);

            const disp = await rl.question("> Disposition: ");
            const billing = await rl.question("> Billing (4 chars): ");

            const form = builder
                .setDisposition(disp)
                .setBilling(billing)
                .build();

            console.log("\nPhone Call Registered:");
            console.log(form);
            
            //Lanzamos el error de si no se hizo bien el registro de la llamada pero aun asi continua el codigo
        } catch (e: any) {
            console.log(`Error: ${e.message}`);
        }
    }
}

main();