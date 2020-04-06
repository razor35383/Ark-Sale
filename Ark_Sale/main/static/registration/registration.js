;(function() {
    'use strict';

    var form = document.getElementById('feedback');
        if (!form) return;
    var elements    = form.querySelectorAll('.form-control'),
    btn         = document.getElementById('send_mess'),
    patternfirstName = /^[A-Za-z]+$/,
    patternlastName = /^[A-Za-z]+$/,
    patternMail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+))@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+))\.([A-Za-z])+$/,
    patternPassword = /^[A-Za-z0-9]+$/,

    errorMess   = 
    [
        'Input field is empty', // [0]
        'Enter your firstname', //[1]
        'Invalid firname format',//[2]
        'Enter your lastname',//[3]
        'Invalid lastname format',//[4]
        'Enter Your email address', // [5]
        'Invalid e-mail format', // [6]
        'Write the password', // [7]
        'Invalid password format', //  [8]
        'Write the password again', //  [9]
    ],


    iserror     = false;
    

    //BUTTON
    btn.addEventListener('click', validForm);

    form.addEventListener('focus', function() {
        var el = document.activeElement;
        if (el !== btn) cleanError(el);
    }, true);

    
    function validForm(e) 
    {
        e.preventDefault();
        var formVal = getFormData(form),
            error;
 
        for (var property in formVal) 
        {
            error = getError(formVal, property);
            if (error.length != 0) 
            {
                iserror = true;
                showError(property, error);
            }
        }
 
        if (!iserror) 
        {
            sendFormData(formVal);
        }
        return false;
    }


    //VALIDATION FUNCTION
    function getError(formVal, property) 
    {
        var error = '',
            validate = 
            {
                'firstName': function() 
                {
                    if (formVal.firstName.length == 0) 
                    {
                        error = errorMess[1];
                    } 
                    else if (patternfirstName.test(formVal.firstName) == false) 
                    {
                        error = errorMess[2];
                    }
                },

                'lastName': function() 
                {
                    if (formVal.lastName.length == 0) 
                    {
                        error = errorMess[3];
                    } 
                    else if (patternlastName.test(formVal.lastName) == false) 
                    {
                        error = errorMess[4];
                    }
                },

                'usermail': function() 
                {
                    if (formVal.usermail.length == 0) 
                    {
                        error = errorMess[5];
                    } 
                    else if (patternMail.test(formVal.usermail) == false) 
                    {
                        error = errorMess[6];
                    }
                },

                'password': function() 
                {
                    if (formVal.password.length == 0) 
                    {
                        error = errorMess[7];
                    } 
                    else if (patternPassword.test(formVal.password) == false) 
                    {
                        error = errorMess[8];
                    }
                },

                'passwordCheck': function() 
                {
                    if (formVal.passwordCheck.length == 0) 
                    {
                        error = errorMess[9];
                    } 

                }
            };
        validate[property]();
        return error;
    }


    [].forEach.call(elements, function(element) 
    {
        element.addEventListener('blur', function(e) 
        {
            var formElement = e.target,
                property = formElement.getAttribute('name'),
                dataField = {};
     
            dataField[property] = formElement.value;

            var error = getError(dataField, property);
            if (error.length != 0) 
            {
                showError(property, error);
            }
            return false;
        });
    });


   //SHOW ERROR FUNCTION
   function showError(property, error) 
   {
       var formElement = form.querySelector('[name=' + property + ']'),
           errorBox = formElement.parentElement.nextElementSibling;

       formElement.classList.add('form-control_error');
       errorBox.innerHTML = error;
       errorBox.style.display = 'block';
   }


   function cleanError(el) 
   {
       var errorBox = el.parentElement.nextElementSibling;
       el.classList.remove('form-control_error');
       errorBox.removeAttribute('style');
   }
   
    
    function getFormData(form) 
    {
        var controls = {};
        if (!form.elements) return '';

        for (var i = 0, ln = form.elements.length; i < ln; i++) 
        {
            var element = form.elements[i];

            if (element.tagName.toLowerCase() != 'button') 
            {
                controls[element.name]= element.value;
            }
        } 
        return controls;
    }
    

})();