const enableValidation = ((validationConfig) => {
    
    const btn = validationConfig.formSelector.querySelector(`.${validationConfig.submitButtonSelector}`)
    //прыгает форма при ошибки валидации
    validationConfig.inputSelector.forEach(inputElement => {
        let liLast = document.createElement('span');
        liLast.textContent = 'asd'
        inputElement.addEventListener('input', function () {
            const errorElement = validationConfig.formSelector.querySelector(`.${inputElement.id}-error`)
            
            
            // validationConfig.formSelector.append(liLast);
            // inputElement.parentNode.insertBefore(liLast, inputElement.nextSibling);
            
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
            } else {
                clearValidation(validationConfig.formSelector, validationConfig)
            }
        })
    });
})
//не работает на профиле
const clearValidation = ((form, validationConfig) => {
    
    const btn = form.querySelector(`.${validationConfig.submitButtonSelector}`)
    
    if(hasInvalidInput(validationConfig.inputSelector)) {
        console.log(1);
        btn.classList.add(validationConfig.inactiveButtonClass)
      } else {
        btn.classList.remove(validationConfig.inactiveButtonClass)
    }

    validationConfig.inputSelector.forEach(inputElement => { 
        const errorElement = validationConfig.formSelector.querySelector(`.${inputElement.id}-error`)
        if (inputElement.validity.valid) {
            inputElement.classList.remove(validationConfig.inputErrorClass)
            errorElement.classList.remove(validationConfig.errorClass)
            errorElement.textContent = '';
        }
    });
      
})

const hasInvalidInput=(inputList) => {
    return inputList.some(inputElement => {
        console.log(inputElement.validity);
        return !inputElement.validity.valid;
    })
}

export {enableValidation, clearValidation} 