function taskAlertModal(alertText){
    let taskAlertModalDOM = document.querySelector('.task-alert-modal');
    let taskAlertModalDOMp = document.querySelector('.task-alert-modal').querySelector('p');

    taskAlertModalDOMp.innerHTML = alertText;

    taskAlertModalDOM.style.visibility = 'visible';
    taskAlertModalDOM.style.opacity= '1';
    taskAlertModalDOM.style.marginBottom = '0';

    setTimeout (
        () => {
            taskAlertModalDOM.style.visibility = 'hidden';
            taskAlertModalDOM.style.opacity= '0';
            taskAlertModalDOM.style.marginBottom = '-5%';
        }
    , 2500)

}