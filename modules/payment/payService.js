// payment/payS.js

class PaymentService {
    constructor() {
        console.log("PaymentService created");
    }

    addPaidTours(tours) {
        for (const tour of tours) {
            console.log("Tour ready:", tour.id);
            // Логіка для додавання оплаченого туру
        }
    }
}

module.exports = PaymentService;
