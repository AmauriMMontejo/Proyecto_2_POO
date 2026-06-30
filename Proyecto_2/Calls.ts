export abstract class CallOrigin {
    abstract type: string;
    abstract disposition(): string[];
}

//Llamada de cliente en esta parte se hace el uso de el patron abstract factory porque tenemos la parte de 2 tipos de llamada que implemetan el CallOrigin... En un futuro lo pienso ampliar
export class CustomerCall extends CallOrigin{
    type = 'Client';
    disposition(): string[] {//Sus dispositions que ocupan cada uno
        return ['fuel', 'jumpstart', 'lockout', 'exchange', 'towing', 'recovery', 'ldr'];
    }
}

//Llamada de Provedor
export class ProviderCall extends CallOrigin{
    type = 'Provider';
    disposition(): string[] {
        return ['eta', 'status', 'goa', 'cancel', 'modification'];
    }
}

export class CallFactory {
    public static ran(): CallOrigin {
        return Math.random() > 0.5 ? new CustomerCall() : new ProviderCall();
    }
}

export class CallForm {
    public origin!: string;
    public phone!: string;
    public billing!: string;
    public disposition!: string;
}

//El call builder es el patron builder fluent que ocupamos para hacer la parte de ir creando la llamda que tenemos poco a poco
export class CallBuilder {
    private form = new CallForm();
    private originO!: CallOrigin;

    public setOrigin(origin: CallOrigin): this {
        this.originO = origin;
        this.form.origin = origin.type;
        return this;
    }

    public setrandomPhone(): this {
        //se hace una formula de la parte de el numero para que sea random y pueda quedar completo el numero
        this.form.phone = `55-${Math.floor(100 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
        return this;
    }

    public setBilling(code: string): this {
        const billing = code.trim();
        if (billing.length !== 4) {
            //se verifica que sea correcto el billing con que sea 4 y en minuscula
            throw new Error('Billing debe tener exactamente 4 caracteres.');
        }
        this.form.billing = billing.toLowerCase();
        return this;
    }

    public setDisposition(disp: string): this {
        const disposition = disp.trim().toLowerCase();
        const options = this.originO?.disposition() ?? [];
        if (!options.includes(disposition)) {
            //Se hace la validacion del disposition en donde en efetco sea algo que si este guardado en la lista de disposition si no ni entra
            throw new Error(`Disposition inválido para origen ${this.originO?.type ?? 'desconocido'}: ${disp}`);
        }
        this.form.disposition = disposition;
        return this;
    }

    public build(): CallForm {
        const form = this.form;
        this.form = new CallForm();
        return form;
    }
}
