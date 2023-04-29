const Store = (() => {
    const data = {
        targetEditId : null,
        customers : [
            {
                id : 1,
                name : 'huda',
                email : 'hhh@hfs.com',
                phone : '010000000',
                flag:false
            },
            {
                id : 2,
                name : 'ahmed',
                email : 'ahmed@hfs.com',
                phone : '0100000100',
                flag:false
            },
        ]
    };

    const setters = {
        addCustomer (newCustomerObj) {
            newCustomerObj.id = Math.round(Math.random() * 10000);
            data.customers.push(newCustomerObj)
            
            helpers.setLocalStorage()

            return data.customers;
        },

        updateCustomer (customerObj) {
            let newCustomersList = [];

            data.customers.forEach(customer => {
                if (customer.id == data.targetEditId) {
                    customerObj.id = data.targetEditId
                    newCustomersList.push(customerObj);
                } else {
                    newCustomersList.push(customer);
                }
            });

            data.customers = newCustomersList;

            helpers.setLocalStorage()

            return data.customers;
        },

        deleteCustomer (customerId) {
           
            data.customers = data.customers.filter(customer => customer.id != customerId);

            helpers.setLocalStorage()

            return data.customers;
        },

        setTargetEditId (customerId) {
            data.targetEditId = customerId;
        },
        toggleFlag(id){
            data.customers.forEach(customer => {
                if(customer.id==id){
                    customer.flag=!customer.flag 
                }
            });
            return data.customers
        }
    };

    const getters = {
        getCustomers () {
            return data.customers
        },

        findCustomer (customerId) {
            // find return target value
            return data.customers.find(customer => customer.id == customerId);
        }
    };

    const helpers = {
        setLocalStorage () {
            /**
             * Get users data and set local storage key users
             */

            let users = JSON.stringify(data.customers)
            localStorage.setItem('customers', users) 
        },

        getLocaclStorage () {
            let customers = localStorage.getItem('customers')

            if (Boolean(customers)) {
                data.customers = JSON.parse(customers)
            }
        }
    }

    helpers.getLocaclStorage()


    return {
        setters,
        getters
    };
})();

export default Store


