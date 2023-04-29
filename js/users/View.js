const View = (() => {
    const selectors = {
        createBtn      : document.getElementById('createBtn'),
        updateBtn      : document.getElementById('updateBtn'),
        containerTbody : document.getElementById('containerTbody'),
        formFields     : ['name', 'email', 'phone'],
        createModal        : new bootstrap.Modal(document.getElementById('createForm'), {
            keyboard: false
        }),
        editModal        : new bootstrap.Modal(document.getElementById('editForm'), {
            keyboard: false
        })
    };
    
    /**
     * # The Getters in th view will get data from the form,
     * or bring elements objects.
     * 
     * # Setters will update and render elements in the 
     * front-end.
     */

    const setters = {
        renderTable (customersList) {
            let customersTrElemnts = '';

            for (let i = 0; i < customersList.length; i++) {
                customersTrElemnts += `
                    <tr>
                        <td style="visibility:${customersList[i].flag?"hidden":''}">${customersList[i].id}</td>
                        <td style="visibility:${customersList[i].flag?"hidden":''}">${customersList[i].name}</td>
                        <td style="visibility:${customersList[i].flag?"hidden":''}">${customersList[i].email}</td>
                        <td style="visibility:${customersList[i].flag?"hidden":''}">${customersList[i].phone}</td>
                        <td>
                            <button data-id="${customersList[i].id}"  class=" show-btn btn btn-sm btn-info">
                                <i data-id="${customersList[i].id}"  class="show-btn fas fa-eye"></i>
                            </button>
                            <button data-id="${customersList[i].id}" class="edit-btn btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editForm">
                                <i data-id="${customersList[i].id}" class="edit-btn fas fa-edit"></i>
                            </button>
                            <button data-id="${customersList[i].id}" class="delete-btn btn btn-sm btn-danger">
                                <i data-id="${customersList[i].id}" class="delete-btn fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }

            containerTbody.innerHTML = customersTrElemnts;
        },
        
        toggleModal (isEdit = false) {
            isEdit ? selectors.editModal.hide() : selectors.createModal.hide();
        },

        renderEditFormData (customer) {
            selectors.formFields.forEach(field => {
                let targetEl = document.getElementById(`edit-${field}`);
                targetEl.value = customer[field]
            });
        } 
    };
    
    const getters = {
        getCreateBtn () {
            return selectors.createBtn;
        },

        getUpdateBtn () {
            return selectors.updateBtn;
        },

        getContainerTbody () {
            return selectors.containerTbody;
        },
        
        getFormData (isEdit = false) {
            let data     = {};
            let isValied = true;

            for (let i = 0; i < selectors.formFields.length; i++) {
                let fieldEl = document.getElementById((isEdit ? 'edit-' : '' ) + selectors.formFields[i]);
                let fieldValue  = fieldEl.value;

                if (Boolean(fieldValue)) {
                    data[selectors.formFields[i]] = fieldEl.value;
                    fieldEl.style.borderColor = '';
                } else {
                    isValied = false;
                    fieldEl.style.borderColor = 'red';
                }
            }

            if (isValied) {
                helpers.clearForm();
            }

            return isValied ? data : false;
        },
        
    };

    const helpers = {
        clearForm (isEdit = false) {
            for (let i = 0; i < selectors.formFields.length; i++) {
                let fieldEl   = document.getElementById((isEdit ? 'edit-' : '' ) + selectors.formFields[i]);
                fieldEl.value = '';
            }
        }
    }
    
    return {
        setters,
        getters
    };
})();

export default View