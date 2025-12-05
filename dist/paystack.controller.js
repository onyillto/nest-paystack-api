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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackController = void 0;
const common_1 = require("@nestjs/common");
const paystack_service_1 = require("./paystack.service");
const initialize_payment_dto_1 = require("./initialize-payment.dto");
const swagger_1 = require("@nestjs/swagger");
let PaystackController = class PaystackController {
    paystackService;
    constructor(paystackService) {
        this.paystackService = paystackService;
    }
    initializePayment(initializePaymentDto) {
        return this.paystackService.initializePayment(initializePaymentDto);
    }
    initializeDummyPayment() {
        const dummyData = {
            email: 'customer@example.com',
            amount: 5000,
        };
        return this.paystackService.initializePayment(dummyData);
    }
    verifyPayment(reference) {
        return this.paystackService.verifyPayment(reference);
    }
};
exports.PaystackController = PaystackController;
__decorate([
    (0, common_1.Post)('initialize'),
    (0, swagger_1.ApiOperation)({ summary: 'Initialize a payment transaction' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Payment initialized successfully.',
    }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [initialize_payment_dto_1.InitializePaymentDto]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "initializePayment", null);
__decorate([
    (0, common_1.Post)('initialize/dummy'),
    (0, swagger_1.ApiOperation)({ summary: 'Initialize a payment with dummy data' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Dummy payment initialized successfully.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "initializeDummyPayment", null);
__decorate([
    (0, common_1.Get)('verify/:reference'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify a payment transaction' }),
    (0, swagger_1.ApiParam)({ name: 'reference', description: 'The transaction reference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment verification status.' }),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "verifyPayment", null);
exports.PaystackController = PaystackController = __decorate([
    (0, swagger_1.ApiTags)('Paystack'),
    (0, common_1.Controller)('paystack'),
    __metadata("design:paramtypes", [paystack_service_1.PaystackService])
], PaystackController);
//# sourceMappingURL=paystack.controller.js.map