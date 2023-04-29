const View = (() => {
    const selectors = {
        containerTbody : $('#containerTbody'),
        createFormCustomers : $('#createFormCustomers'),
        createFormProducts : $('#createFormProducts'),
        createModal    : new bootstrap.Modal(document.getElementById('createForm'), {
            keyboard: false
        }),
        editModal      : new bootstrap.Modal(document.getElementById('editForm'), {
            keyboard: false
        })
    }

    const getters = {
        getFormData () {
            /**
             * get user, products
             */
            let data = {
                user : null,
                products : []
            }

            data.user = $('.selected-user:checked').val()
            let products = $('.selected-product:checked')
            for (let i = 0; i < products.length; i++) {
                data.products.push(products[i].value)
            }

            
            return helpers.validateFormData(data) ? data : false
        }
    }

    const setters = {
        renderOrders (ordersList) {
            let orders = '';
            ordersList.forEach(order => {
                orders += `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.user.name}</td>
                        <td>${order.products.length}</td>
                        <td>
                            <button class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </button>

                            <button data-id="${order.id}" class="edit-btn btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editForm">
                                <i data-id="${order.id}" class="edit-btn fas fa-edit"></i>
                            </button>
                            
                            <button data-id="${order.id}" class="delete-btn btn btn-sm btn-danger">
                                <i data-id="${order.id}" class="delete-btn fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `
            });

            selectors.containerTbody.html(orders)
        },

        renderCreateTabels (customers, products, isEdit = false) {
            let customersTable = '';
            customers.forEach(customer => {
                customersTable += `
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>
                            <input type="radio" name="selectedUser" value="${customer.id}" class="selected-user" />
                        </td>
                    </td>
                `
            });
            selectors.createFormCustomers.html(customersTable)

            let productsTable = '';
            products.forEach(product => {
                productsTable += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>${product.price}</td>
                        <td>
                            <input type="checkbox" name="selectedProduct" value="${product.id}" class="selected-product" />
                        </td>
                    </tr>
                `
            })
            selectors.createFormProducts.html(productsTable)
        },

        toggleModal (isEdit = false) {
            isEdit ? selectors.editModal.hide() : selectors.createModal.hide();
        },

        toggleSuccess () {
            $('.success-order').slideDown(500)
            setTimeout(() => {
                $('.success-order').slideUp(500)
            }, 3000)
        },

        toggleDanger () {
            $('.danger-order').slideDown(500)
            setTimeout(() => {
                $('.danger-order').slideUp(500)
            }, 3000)
        }
    }

    const helpers = {
        validateFormData (formData) {
            /**
             * check if all fields is valied
             * if field if not valied show err message and retur false
             */
            let isValied = true;
            
            if (!Boolean(formData.user)) {
                isValied = false;
                $('.user-err').slideDown(500);
            } else {
                $('.user-err').slideUp(500);
            }

            if (!formData.products.length) {
                isValied = false;
                $('.product-err').slideDown(500)
            } else {
                $('.product-err').slideUp(500)
            }

            return isValied
        }
    }
    
    return {
        getters,
        setters
    }
})();

export default View