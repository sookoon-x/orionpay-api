import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    sendPayment(req: any, sendPaymentDto: {
        fromWalletId: string;
        toAddress: string;
        amount: number;
        currency: string;
    }): Promise<import("./entities/transaction.entity").Transaction>;
    getMyTransactions(req: any): Promise<import("./entities/transaction.entity").Transaction[]>;
    getTransactionDetails(req: any, id: string): Promise<import("./entities/transaction.entity").Transaction | null>;
}
