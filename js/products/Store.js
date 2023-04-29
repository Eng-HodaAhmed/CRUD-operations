const Store = (() => {
    const data = {
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
    
    const setters = {
        addNewProduct (product) {
            product.id = Math.round(Math.random() * 100)
            data.products.push(product)

            helpers.setLocalStorage()
        },

        deleteProduct (productId) {
            data.products = data.products.filter(product => product.id != productId)

            helpers.setLocalStorage()
        },

        updateProduct (targetProduct) {
            let newData = []

            data.products.forEach(product => {
                if (product.id == targetProduct.id) {
                    newData.push(targetProduct)
                } else {
                    newData.push(product)
                }
            })

            data.products = newData

            helpers.setLocalStorage()

        },
    }

    const getters = {
        getData () {
            return data.products.slice()
        },

        findProduct (productId) {
            return data.products.find(product => product.id == productId)
        }
    }

    const helpers = {
        setLocalStorage () {
            let products = JSON.stringify(data.products)

            localStorage.setItem('products', products)
        },

        getLocalStorage () {
            let products = JSON.parse(localStorage.getItem('products'));

            if (Boolean(products)) {
                data.products = products
            }
        }
    }

    helpers.getLocalStorage()


    return {
        setters,
        getters
    }
})()

export default Store