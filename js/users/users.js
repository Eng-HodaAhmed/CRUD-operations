import Store from "./Store.js";
import View from "./View.js";

const Controller = (() => {
    const inite = () => {


        View.getters.getCreateBtn().addEventListener('click', function () {
            const data = View.getters.getFormData();

            if (data) {
                const customersList = Store.setters.addCustomer(data);
                View.setters.renderTable(customersList);
                View.setters.toggleModal();
            }

        });

        View.getters.getUpdateBtn().addEventListener('click', function () {


            const data = View.getters.getFormData(true);

            console.log(data);
            if (data) {
                const customersList = Store.setters.updateCustomer(data);
                View.setters.renderTable(customersList);
                View.setters.toggleModal(true);
            }

        })

        View.getters.getContainerTbody().addEventListener('click', function (e) {


            if (e.target.classList.contains('delete-btn')) {


                const customerId = e.target.dataset.id;
                let flag = confirm("Are you sure you want to delete this customer !!");

                if (flag && Boolean(customerId)) {
                    const customersList = Store.setters.deleteCustomer(customerId);
                    View.setters.renderTable(customersList);
                }

            }
            else if (e.target.classList.contains('edit-btn')) {


                const customerId = e.target.dataset.id;
                Store.setters.setTargetEditId(customerId);
                const targetCustomer = Store.getters.findCustomer(customerId);
                View.setters.renderEditFormData(targetCustomer);
            }
            else if (e.target.classList.contains('show-btn')) {
            
                const customerId = e.target.dataset.id;
                let customers = Store.setters.toggleFlag(customerId)
                View.setters.renderTable(customers)
            }
        });

        const customersList = Store.getters.getCustomers();
        View.setters.renderTable(customersList);
    };

    return {
        inite
    };
})();

Controller.inite()
