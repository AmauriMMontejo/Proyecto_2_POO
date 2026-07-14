import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CallFactory } from './Calls.ts'; // Mantienes las clases base
import { CallFacade, CallManager } from './CallsFachada.ts'; // Importas las fachada desde el nuevo archivo

async function main() {
    const rl = readline.createInterface({ input, output });
    const facade = new CallFacade(); 
    
    console.log("=== CCP SYSTEM INICIADO ===");

    while (true) {
        try {
            const origin = CallFactory.ran();
            const builder = facade.prepareCall(origin);
            
            console.log(`\n--- Nueva llamada: ${origin.type} ---`);
            console.log(`Phone number: ${builder.getPhone()}`);
            console.log(`Dispositions posibles: ${origin.disposition().join(', ')}`);

            const disp = await rl.question("> Disposition: ");
            const billing = await rl.question("> Billing (4 chars): ");

            const form = facade.completeRegistration(builder, disp, billing);

            console.log("\nPhone Call Registered:");
            console.log(form);

            const manager = CallManager.getInstance();
            const total = manager.getCalls().length;

            if(total % 5 === 0) {
                console.log(`\n Reporte: Se han registrado ${total} llamadas`);
                console.table(manager.getLastCalls(5));
            }
            
        } catch (e: any) {
            console.log(`Error: ${e.message}`);
        }
    }
}

main();