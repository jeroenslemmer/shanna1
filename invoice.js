

for (const button of document.querySelectorAll('.showInvoice')){
    button.onclick = (e) => showSection(sectionInvoice);
}
for (const button of document.querySelectorAll('.showSpecs')){
    button.onclick = (e) => showSection(sectionSpecs);
}
for (const button of document.querySelectorAll('.showInput')){
    button.onclick = (e) => showSection(sectionInput);
}
for (const button of document.querySelectorAll('.printPage')){
    button.onclick = (e) => window.print();
}


function showSection(activateSection){
    const sections = document.querySelectorAll('section');
    for (let section of sections) {
        section.classList.remove('active');
    }
    activateSection.classList.add('active');
}

function createIntegerInput(max, input){
    if (!input){
        const input = document.createElement('input');
    }
    if (max){
        input.maxValue = max;
    } else {
        input.maxValue = 600;
    }
    input.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    input.addEventListener('blur', function (e) {
        
        const numberValue = parseInt(this.value, 10);
        if (numberValue > this.maxValue) {
            alert('Klopt dit?');
        }
    });
    return input;
}

function createLessonDate(after){
    const lessonDate = document.querySelector('.lessonDateTemplate');
    const clone = lessonDate.cloneNode(true);
    for (input of clone.querySelectorAll('.int')){
        input = createIntegerInput(300,input);
    }
    const date = clone.querySelector('[type="date"]');
    date.value = '';
    const createButton = clone.querySelector('.createLessonDate');
    clone.classList.remove('lessonDateTemplate');
    clone.classList.add('lessonDate');
    const lessonData = document.getElementById('lessonData');
    if (after && after.nextSibling){
        lessonData.insertBefore(clone, after.nextSibling)
    } else {
        lessonData.appendChild(clone);
    }
    createButton.onclick = (e) => {createLessonDate(clone)};
    const buttonCreateService = clone.querySelector('.createService');
    const services = clone.querySelector('.services');
    buttonCreateService.onclick = (e) => {createService(services)}

}
createLessonDate();

// const buttonCreateLessonDate = document.getElementById('createLessonDate');


function createService(services,after){
    const service = document.querySelector('.serviceTemplate');
    const clone = service.cloneNode(true);
    
    clone.classList.remove('serviceTemplate');
    clone.classList.add('service');

    if (after && after.nextSibling){
        services.insertBefore(clone, after.nextSibling)
    } else {
        services.appendChild(clone);
    }

    const removeButton = clone.querySelector('.removeService');
    removeButton.onclick = (e) => {clone.remove();}
}








