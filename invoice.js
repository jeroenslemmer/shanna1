

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

function createLessonDate(after){
    const lessonDate = document.querySelector('.lessonDateTemplate');
    const clone = lessonDate.cloneNode(true);
    const date = clone.querySelector('[type="date"]');
    date.value = '';
    const createButton = clone.querySelector('.createLessonDate');
    clone.classList.remove('lessonDateTemplate');
    const lessonData = document.getElementById('lessonData');
    if (after && after.nextSibling){
        lessonData.insertBefore(clone, after.nextSibling)
    } else {
        lessonData.appendChild(clone);
    }
    createButton.onclick = (e) => {createLessonDate(clone)};
}
createLessonDate();

const buttonCreateLessonDate = document.getElementById('createLessonDate');





