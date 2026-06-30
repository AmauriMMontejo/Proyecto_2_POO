export abstract class CallOrigin {
    abstract type: string;
    abstract disposition(): string[];
}

//Llamada de cliente
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

export class CallBuilder {
    private form = new CallForm();
    private originO!: CallOrigin;

    public setOrigin(origin: CallOrigin): this {
        this.originO = origin;
        this.form.origin = origin.type;
        return this;
    }

    public setrandomPhone(): this {
        this.form.phone = `55-${Math.floor(100 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
        return this;
    }

    public setBilling(code: string): this {
        const billing = code.trim();
        if (billing.length !== 4) {
            throw new Error('Billing debe tener exactamente 4 caracteres.');
        }
        this.form.billing = billing.toLowerCase();
        return this;
    }

    public setDisposition(disp: string): this {
        const disposition = disp.trim().toLowerCase();
        const options = this.originO?.disposition() ?? [];
        if (!options.includes(disposition)) {
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
