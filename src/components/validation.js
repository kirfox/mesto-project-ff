const enableValidation = ((validationConfig) => {
    
    const btn = validationConfig.formSelector.querySelector(`.${validationConfig.submitButtonSelector}`)
    
    validationConfig.inputSelector.forEach(inputElement => {
        
        inputElement.addEventListener('input', function () {
            const errorElement = validationConfig.formSelector.querySelector(`.${inputElement.id}-error`)
            
            if(inputElement.validity.patternMismatch) {
                inputElement.setCustomValidity(inputElement.dataset.errorMessage);
            } else {
                inputElement.setCustomValidity("")
            }

            if(!inputElement.validity.valid) {
                inputElement.classList.add(validationConfig.inputErrorClass)  
                errorElement.textContent = inputElement.validationMessage;
                errorElement.classList.add(validationConfig.errorClass)
                btn.classList.add(validationConfig.inactiveButtonClass)
            }  else {  
                clearValidation(validationConfig.formSelector, validationConfig)
            }
        })
    });
})

const clearValidation = ((form, validationConfig) => {
    
    const btn = form.querySelector(`.${validationConfig.submitButtonSelector}`)

    validationConfig.inputSelector.forEach(inputElement => {
        
        const errorElement = validationConfig.formSelector.querySelector(`.${inputElement.id}-error`)
        
        if(!inputElement.validity.patternMismatch) inputElement.setCustomValidity("");
        
        if (inputElement.validity.valid) {    
            inputElement.classList.remove(validationConfig.inputErrorClass)
            errorElement.classList.remove(validationConfig.errorClass)
            errorElement.textContent = '';
        }
    });

    if(hasInvalidInput(validationConfig.inputSelector)) {
        btn.classList.add(validationConfig.inactiveButtonClass)
      } else {
        btn.classList.remove(validationConfig.inactiveButtonClass)
    }
      
})

const hasInvalidInput=(inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

export {enableValidation, clearValidation} 