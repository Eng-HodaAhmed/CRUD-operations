
const View = (() => {
    const selectors = {
        createBtn      : document.getElementById('createBtn'),
        updateBtn      : document.getElementById('updateBtn'),
        containerTbody : document.getElementById('containerTbody'),
        fields         : ['name', 'code', 'quantity', 'price'],
        createModal    : new bootstrap.Modal(document.getElementById('createForm'), {
            keyboard: false
        }),
        editModal      : new bootstrap.Modal(document.getElementById('editForm'), {
            keyboard: false
        })
    }

    /**
     * # get data from create form
     * # input fields
     * # validation 
     * # show err
     */
    const setters = {

        renderTable (productsList) {
            let newRow = ''
            productsList.forEach(product => {
                newRow += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.code}</td>
                        <td>${product.quantity}</td>
                        <td>${product.price}</td>
                        <td>
                            <button class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </button>

                            <button data-id="${product.id}" class="edit-btn btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editForm">
                                <i data-id="${product.id}" class="edit-btn fas fa-edit"></i>
                            </button>
                            
                            <button data-id="${product.id}" class="delete-btn btn btn-sm btn-danger">
                                <i data-id="${product.id}" class="delete-btn fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `
            });

            selectors.containerTbody.innerHTML = newRow
        },

        toggleModal (isEdit = false) {
            isEdit ? selectors.editModal.hide() : selectors.createModal.hide();
        },

        fillEditForm (product) {
            selectors.fields.forEach(field => {
                let targetEl = document.getElementById(`edit-${field}`)
                targetEl.value = product[field]
            })
        }
    }

    const getters = {
        getFormData (isEdit = false) {
           
            let data = {};
            let isValied = true

            selectors.fields.forEach(field => {
                let targetEl = document.getElementById(`${isEdit ? 'edit-' : '' }${field}`)

                if (Boolean(targetEl.value)) {
                    data[field]  = targetEl.value 
                    targetEl.style.borderColor = ''
                } else {
                    isValied = false
                    targetEl.style.borderColor = 'red'   
                }
            })

            isValied && helpers.clearFields(isEdit)

            return isValied ? data : false
        },

        getCreateBtn () {
            return selectors.createBtn
        },

        getUpdateBtn () {
            return selectors.updateBtn
        },

        getContainerTbody () {
            return selectors.containerTbody
        }
    }

    const helpers = {
        clearFields (isEdit = false) {
            selectors.fields.forEach(field => {
                let targetEl = document.getElementById(`${isEdit ? 'edit-' : '' }${field}`)
                targetEl.value = ''
            })
        }
    }

    return {
        setters,
        getters
    }
})()

export default View;