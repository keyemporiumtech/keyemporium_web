export const shopPaymentList = {
	balance: {
		unique: 'balance/get',
		paginate: 'balance/table',
		save: 'balance/save',
		edit: 'balance/edit',
		delete: 'balance/delete',
		addPayment: 'balance/addPayment',
		payments: 'balance/payments',
	},
	paymentmethod: {
		unique: 'paymentmethod/get',
		paginate: 'paymentmethod/table',
		save: 'paymentmethod/save',
		edit: 'paymentmethod/edit',
		delete: 'paymentmethod/delete',
		tppaymentmethod: 'paymentmethod/tppaymentmethod',
		tpwebpayment: 'paymentmethod/tpwebpayment',
	},
	payment: {
		unique: 'payment/get',
		paginate: 'payment/table',
		save: 'payment/save',
		edit: 'payment/edit',
		delete: 'payment/delete',
		tppayment: 'payment/tppayment',
		addPrice: 'payment/addPrice',
		editPrice: 'payment/editPrice',
	},
	balancepayment: {
		unique: 'balancepayment/get',
		paginate: 'balancepayment/table',
		save: 'balancepayment/save',
		edit: 'balancepayment/edit',
		delete: 'balancepayment/delete',
	},
	basket: {
		unique: 'basket/get',
		paginate: 'basket/table',
		save: 'basket/save',
		edit: 'basket/edit',
		delete: 'basket/delete',
		saveBasket: 'basket/saveBasket',
		editBasket: 'basket/editBasket',
	},
	basketproduct: {
		unique: 'basketproduct/get',
		paginate: 'basketproduct/table',
		save: 'basketproduct/save',
		edit: 'basketproduct/edit',
		delete: 'basketproduct/delete',
	},
	basketservice: {
		unique: 'basketservice/get',
		paginate: 'basketservice/table',
		save: 'basketservice/save',
		edit: 'basketservice/edit',
		delete: 'basketservice/delete',
	},
	basketticket: {
		unique: 'basketticket/get',
		paginate: 'basketticket/table',
		save: 'basketticket/save',
		edit: 'basketticket/edit',
		delete: 'basketticket/delete',
	},
	basketpocket: {
		unique: 'basketpocket/get',
		paginate: 'basketpocket/table',
		save: 'basketpocket/save',
		edit: 'basketpocket/edit',
		delete: 'basketpocket/delete',
	},
};
