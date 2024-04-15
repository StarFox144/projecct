// payment/payCtrl.js

const PaymentService = require('./payService'); // Переконайтеся, що правильно вказали шлях до PayS.js

class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
    }

    // Метод для додавання оплачених турів
    addPaidTours(tours) {
        this.paymentService.addPaidTours(tours);
    }
}

module.exports = PaymentController;
