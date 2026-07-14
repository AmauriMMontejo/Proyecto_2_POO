import { CallForm, CallOrigin, CallBuilder } from './Calls.ts';

//Patron singleton para que se haga la parte de la base de datos rudimentaria 
export class CallManager {
    private static instance: CallManager;
    private registry: CallForm[] = [];

    private constructor() { }

    public static getInstance(): CallManager {
        if (!CallManager.instance) {
            CallManager.instance = new CallManager();
        }
        return CallManager.instance;
    }

    public saveCall(call: CallForm): void {
        this.registry.push(call);
        console.log(`[Singleton] Llamada guardada. Total registradas: ${this.registry.length}`);
    }

    public getCalls(): CallForm[] {
        return this.registry;
    }

    public getLastCalls(count: number = 5): CallForm[] {
        return this.registry.slice(-count);
    }
}

//Patron Fachada/Facade oara ocultar y no instanciar todo y que solo se instancie a este y ya
export class CallFacade {
    public prepareCall(origin: CallOrigin): CallBuilder {
        const builder = new CallBuilder();
        builder.setOrigin(origin).setrandomPhone();
        return builder;
    }

    public completeRegistration(builder: CallBuilder, disp: string, billing: string): CallForm {
        const form = builder
            .setDisposition(disp)
            .setBilling(billing)
            .build();

        CallManager.getInstance().saveCall(form);
        return form;
    }
}