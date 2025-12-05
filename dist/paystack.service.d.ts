import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InitializePaymentDto } from './initialize-payment.dto';
export interface PaystackInitializeResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}
export interface PaystackVerifyResponse {
    status: boolean;
    message: string;
    data: any;
}
export declare class PaystackService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly paystackSecretKey;
    constructor(httpService: HttpService, configService: ConfigService);
    initializePayment(initializePaymentDto: InitializePaymentDto): Promise<PaystackInitializeResponse>;
    verifyPayment(reference: string): Promise<PaystackVerifyResponse>;
}
