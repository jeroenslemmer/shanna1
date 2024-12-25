vats = [
  {
    name: '21%', perc: 21, services: [], totExcl: 0, les: 'vanaf 21 jaar', 
  },
  {
    name: 'vrijgesteld', perc: 0, services: [], totExcl: 0, les: 'onder 21 jaar', 
  },
  {
    name: '9%', perc: 9, services: [], totExcl: 0, 
  },   
  {
    name: '0%', perc: 0, services: [], totExcl: 0,
  },   
]

clients = [
  {name: 'Main Music School', tariff: 29},
  {name: 'Zangschool Utrecht', tariff: 32.50},
]

const clientSelect = document.getElementById('clientId');
const tariffInput = document.getElementById('tariff');
tariffInput.value = '';

for (clientIndex in clients){
  const client = clients[clientIndex];
  const option = document.createElement('option');
  option.value = clientIndex.toString();
  option.textContent = client.name;
  clientSelect.appendChild(option);
}
clientSelect.onchange = (e) => {
  tariffInput.value = clients[parseInt(clientSelect.value)].tariff.toFixed(2);
}
clientSelect.value = '';

const serviceTemplateSelectVAT = document.querySelector('.serviceTemplate .vat');
for (let vatIndex in vats){
  const vat = vats[vatIndex];
  const option = document.createElement('option');
  option.value = vatIndex.toString();
  option.textContent = vat.name;
  serviceTemplateSelectVAT.appendChild(option);
}
serviceTemplateSelectVAT.value = '';


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
      alert('Ingevoerd: '+numberValue+'Klopt dit?');
    }
  });
  return input;
}

function createFloatInput(max, input){
  if (!input){
    const input = document.createElement('input');
  }

  if (max){
    input.maxValue = max;
  } else {
    input.maxValue = 50;
  }
  input.addEventListener('keydown', function (e) {
    if ('0123456789'.includes(e.key) ) return;
    if (e.key == '.' && !input.value.includes('.')) return;
    if (e.key == 'Backspace') return;
    if (e.key == 'Delete') return;
    if (e.key == 'Tab') return;
    if (e.key == 'Enter') return;
    e.preventDefault();
 
  });

  input.addEventListener('input', function (e) {
    floatValue = parseFloat(input.value);

    if (floatValue > this.maxValue) {
      alert('Ingevoerd: '+ floatValue +'Klopt dit?');
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

  for (let span of clone.querySelectorAll('span.duration')){
    const minutesInput = span.querySelector('input.minutes');
    const hoursOutput = span.querySelector('span.hours');
    minutesInput.onchange = (e) => {
      IntValue = parseInt(minutesInput.value);
      hoursOutput.textContent = '...';
      if (!isNaN(IntValue)){
        hoursOutput.textContent = (IntValue / 60).toFixed(2);
      }
    }
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
  vatSelect = clone.querySelector('.vat');
  vatSelect.value = '';
}

createFloatInput(50,tariffInput);

function displayTotals(){
  const totals = document.getElementById('totals');
  totals.textContent = '';
  const totalsContentTemplate = document.querySelector('.totalsContentTemplate');
  totalsContentTemplate.childNodes.forEach((child) => {
    totals.appendChild(child.cloneNode(true));
  });
  for (vat of vats){
    if (vat.totExcl > 0){
        totalsContentTemplate.childNodes.forEach((child) => {
            let col = child.cloneNode(true);
            let text = ''
            switch (col.className)
            {
                case 'vat-des' : text = vat.name; break;
                case 'vat-resume' : text = '????'; break;
                case 'vat-excl' : text = vat.totExcl.toFixed(2); break;
                case 'vat-amount' : text = vat.amount.toFixed(2); break;
                case 'vat-incl' : text = vat.totIncl.toFixed(2); break;
            }
            console.log(col.className+':'+text);
            col.textContent = text;
            totals.appendChild(col);
        }); 
    }
  }
}

function calcTotals(){
  let dates = [];
  let tariffInput = document.getElementById('tariff');
  if (tariffInput.value == '') return;
  let tariff = parseFloat(tariffInput.value);
  for (let vat of vats){
    vat.services = [];
    vat.totExcl = 0;
    vat.amount = 0;
    vat.totIncl = 0;
  }

  for (let lessonDate of document.querySelectorAll('.lessonDate')){
    date = lessonDate.querySelector('input[type="date"]');
    if (date.value > ''){
      dates.push(date.value);
    }
  }
  dates = dates.sort();
  
  for (vatnr of [0,1]){
    let hours = 0;
    for (let duration of document.querySelectorAll(`span[data-vat="${vatnr}"] .hours`)){
      let hoursDisplayed = duration.textContent;
      if (hoursDisplayed != '...'){
        hours += parseFloat(hoursDisplayed)
      }
    }
    vats[vatnr].services.push(`zangles ${vats[vatnr].les} ${hours.toFixed(2)} uur à € ${tariff.toFixed(2)}`)
    vats[vatnr].totExcl = parseFloat((hours * tariff).toFixed(2));
  }

  for (let service of document.querySelectorAll('.service')){
    let description = service.querySelector('.description').value || '';
    let tariff = parseFloat(service.querySelector('.tariff').value || 0);
    let vatIndex = parseInt(service.querySelector('.vat').value || '0');
    if (description != ''){
      vats[vatIndex].services.push(`${description} à ${tariff.toFixed(2)}`);
      vats[vatIndex].totExcl += parseFloat(tariff.toFixed(2));
    }
  }

  for (vat of vats){
    if (vat.totExcl > 0){
        vat.amount = parseFloat((vat.totExcl * vat.perc / 100).toFixed(2));
        vat.totIncl = vat.totExcl + vat.amount;
    //   console.log(vat.name + '  ' + vat.services.join(', ') + ' totaal excl BTW ' + vat.totExcl.toFixed(2));
    }
  }



}

const buttonCalculate = document.getElementById('test')
buttonCalculate.onclick = (e) => {
  calcTotals();
  displayTotals();
}