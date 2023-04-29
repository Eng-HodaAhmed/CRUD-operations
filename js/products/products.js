import Store from "./Store.js"
import View from "./View.js"

const Controller = (() => {
    const inite = () => {

        let targetEditId = null

        View.getters.getCreateBtn().addEventListener('click', function () {
            let data = View.getters.getFormData();
            
            if (data) {
                Store.setters.addNewProduct(data)
                let productsList = Store.getters.getData()
                View.setters.renderTable(productsList)
                View.setters.toggleModal()
            }
        })

        View.getters.getContainerTbody().addEventListener('click', function (e) {
            
            if (e.target.classList.contains('delete-btn')) {

                let flag = confirm('Are you sure you delete this record ?!')
                
                if (flag) {
                    let targetId = e.target.dataset.id
                    Store.setters.deleteProduct(targetId)
                    
                    let productsList = Store.getters.getData()
                    View.setters.renderTable(productsList)
                }
            }

            if (e.target.classList.contains('edit-btn')) {
                /**
                 * get target product id from data-id/dataset.id
                 * get target product
                 * fill the update form with the traget product data
                 */
                targetEditId = e.target.dataset.id
                
                let targetProduct = Store.getters.findProduct(targetEditId)

                View.setters.fillEditForm(targetProduct)
            }
        })

        View.getters.getUpdateBtn().addEventListener('click', function () {
            /**
             * Get data from edit form
             * if data is valied update the the store
             */
            
            let data = View.getters.getFormData('edit-')
            
            
            if (data) {
                data.id = targetEditId
                Store.setters.updateProduct(data)
                
                let productsList = Store.getters.getData()
                View.setters.renderTable(productsList)

                View.setters.toggleModal(true)
            }
        })
        

        let productsList = Store.getters.getData()
        View.setters.renderTable(productsList)
    }

    return {
        inite
    }
})() 

Controller.inite();