const Store = (() => {

    const data = {
        orders : [
            {
                id : 1,
                
                user : {
                    id : 1,
                    name : 'ahmed',
                    email : 'ahmed@hfs.com',
                    phone : '01063200201'
                },

                products : [
                    {
                        id : 1,
                        name : 'CPU AMD 1',
                        code : '12123',
                        quantity : 10,
                        price : 1200.5
                    },
                    {
                        id : 2,
                        name : 'MotherBoard ASUS 1',
                        code : '12223',
                        quantity : 10,
                        price : 1200.5
                    }
                ]
            }
        ],

        customers : [ {
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
        }
    ],

        products : [
            {
                id : 1,
                name : 'CPU AMD 1',
                code : '12123',
                quantity : 10,
                price : 1200.5
            },
            {
                id : 2,
                name : 'MotherBoard ASUS 1',
                code : '12223',
                quantity : 10,
                price : 1200.5
            }
        ]
    };

    const getters = {
        getOrders () {
            return data.orders.slice();
        },

        getCustomers () {
            return data.customers.slice()
        },

        getProducts () {
            return data.products.slice()
        }
    }

    const setters = {
        addNewOrder (newOrder) {
            /**
             newOrder = {
                user : '1',
                products : ['1', '2']
             }
             */
            newOrder.id       = Math.round(Math.random() * 1000)
            newOrder.user     = data.customers.find(customer => customer.id == newOrder.user)
            newOrder.products = data.products.filter(product => newOrder.products.includes(product.id.toString()))
            data.orders.push(newOrder)
        },

        deleteOrder (orderId) {
            data.orders = data.orders.filter(order => order.id != orderId)
        }
    }

    const helpers = {

        getLocaltStorage () {
            /**
             * Get orders, customers, products
             */

            let orders = JSON.parse(localStorage.getItem('orders'))
            if (Boolean(orders)) {
                data.orders = orders
            }

            let customers = JSON.parse(localStorage.getItem('customers'))
            if (Boolean(customers)) {
                data.customers = customers
            }

            let products = JSON.parse(localStorage.getItem('products'))
            if (Boolean(products)) {
                data.products = products
            }
            
        }

    }

    helpers.getLocaltStorage()

    return {
        getters,
        setters
    }
})();

export default Store;