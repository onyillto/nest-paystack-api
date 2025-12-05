import { PaystackInitializeResponse, PaystackService, PaystackVerifyResponse } from './paystack.service';
import { InitializePaymentDto } from './initialize-payment.dto';
export declare class PaystackController {
    private readonly paystackService;
    constructor(paystackService: PaystackService);
    initializePayment(initializePaymentDto: InitializePaymentDto): Promise<PaystackInitializeResponse>;
    initializeDummyPayment(): Promise<PaystackInitializeResponse>;
    verifyPayment(reference: string): Promise<PaystackVerifyResponse>;
}
