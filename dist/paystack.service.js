"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaystackService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
let PaystackService = PaystackService_1 = class PaystackService {
    httpService;
    configService;
    logger = new common_1.Logger(PaystackService_1.name);
    paystackSecretKey;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        const secretKey = this.configService.get('PAYSTACK_SECRET_KEY');
        if (!secretKey) {
            throw new common_1.InternalServerErrorException('PAYSTACK_SECRET_KEY not found in environment variables.');
        }
        this.paystackSecretKey = secretKey;
    }
    async initializePayment(initializePaymentDto) {
        const { email, amount } = initializePaymentDto;
        const url = 'https://api.paystack.co/transaction/initialize';
        const amountInKobo = amount * 100;
        const callback_url = 'http://localhost:3000/paystack/callback';
        const headers = {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json',
        };
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, { email, amount: amountInKobo, callback_url }, { headers }));
            return data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError && error.response) {
                this.logger.error(`Error initializing payment: ${JSON.stringify(error.response.data)}`);
            }
            else if (error instanceof Error) {
                this.logger.error('An unexpected error occurred during payment initialization', error.stack);
            }
            throw new common_1.InternalServerErrorException('Could not initialize payment.');
        }
    }
    async verifyPayment(reference) {
        const url = `https://api.paystack.co/transaction/verify/${reference}`;
        const headers = {
            Authorization: `Bearer ${this.paystackSecretKey}`,
        };
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { headers }));
            return data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError && error.response) {
                this.logger.error(`Error verifying payment: ${JSON.stringify(error.response.data)}`);
            }
            else if (error instanceof Error) {
                this.logger.error('An unexpected error occurred during payment verification', error.stack);
            }
            throw new common_1.InternalServerErrorException('Could not verify payment.');
        }
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = PaystackService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], PaystackService);
//# sourceMappingURL=paystack.service.js.map