import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

function saveFormDataToLocalStorage() {
    const formData = {
        email: emailInput.value,
        message: messageInput.value
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function loadFormDataFromLocalStorage() {
    const formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
}

function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        email: emailInput.value,
        message: messageInput.value
    };

    console.log(formData); 

  
    emailInput.value = '';
    messageInput.value = '';

   
    localStorage.removeItem('feedback-form-state');
}


feedbackForm.addEventListener('input', throttle(saveFormDataToLocalStorage, 500)); 
feedbackForm.addEventListener('submit', handleSubmit);

loadFormDataFromLocalStorage();
