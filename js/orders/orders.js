import Store from "./Store.js";
import View from "./View.js";

const Controller = (() => {
    const inite = () => {
        let orderList = Store.getters.getOrders();
        View.setters.renderOrders(orderList)

        let customers = Store.getters.getCustomers()
        let products  = Store.getters.getProducts()
        View.setters.renderCreateTabels(customers, products)

        $('#createBtn').on('click', function () {
            /**
             * 1- get form data
             * 2- save data in the store
             * 3- re-render the ordee table
             */

            let data =  View.getters.getFormData()

            if (data) {
                Store.setters.addNewOrder(data)

                let orderList = Store.getters.getOrders();
                View.setters.renderOrders(orderList)

                View.setters.toggleModal()
                View.setters.toggleSuccess()
            }
        })

        $('#containerTbody').on('click', '.delete-btn', function () {
            let flag = confirm('are you sure you want to delete this order')

            if (flag) {
                let orderId = $(this).data('id')
                Store.setters.deleteOrder(orderId)
        
                let orderList = Store.getters.getOrders();
                View.setters.renderOrders(orderList)
                View.setters.toggleDanger()
            }
        })
    }

    return {
        inite
    }
})();

Controller.inite();