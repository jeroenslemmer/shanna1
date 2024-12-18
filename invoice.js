

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




