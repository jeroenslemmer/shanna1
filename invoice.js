const sectionInput = document.getElementById('sectionInput');
const clientSelect = document.getElementById('clientId');
const clientName = document.getElementById('clientName');
const tariffInput = document.getElementById('tariff');
const invoiceDescription = document.getElementById('invoiceDescription');
const body = document.querySelector('body');
const invoiceTotals = {};
let client = -1;
tariffInput.value = '';
clientName.value = '';
invoiceDescription.value = '';
tariffInput.onchange = (e)=> {
  calcDisplayTotals();
}

for (let clientIndex in clients){
  const client = clients[clientIndex];
  const option = document.createElement('option');
  option.value = clientIndex.toString();
  option.textContent = client.name;
  clientSelect.appendChild(option);
}
clientSelect.onchange = (e) => {
  client = clients[parseInt(clientSelect.value)];
  tariffInput.value = client.tariff.toFixed(2);
  clientName.value = client.name;
  sectionInput.setAttribute('type',client.type);
  sectionInput.setAttribute('lumpsum',(client.lumpsum || false).toString());
  body.setAttribute('lesson-unit',client.lessonUnit || '');
  calcDisplayTotals();
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

const serviceTemplateSelectUnit = document.querySelector('.serviceTemplate .unit');
for (let unitIndex in serviceUnits){
  const unit = serviceUnits[unitIndex];
  const  option = document.createElement('option');
  option.value = unitIndex.toString();
  option.textContent = unit.name;
  serviceTemplateSelectUnit.appendChild(option);  
}

const serviceTemplateSelectType = document.querySelector('.serviceTemplate .serviceType');
for (let serviceTypeIndex in serviceTypes){
  const serviceTYpe = serviceTypes[serviceTypeIndex];
  const option = document.createElement('option');
  option.value = serviceTypeIndex.toString();
  option.textContent = serviceTYpe.name;
  serviceTemplateSelectType.appendChild(option);
}

serviceTemplateSelectType.value = '';

for (const button of document.querySelectorAll('.showInvoice')){
  button.onclick = (e) => {
    createInvoice();
    showSection(sectionInvoice);
  }
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

function formatToDDMMYYYY(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-'); // Split into components
  return `${day}-${month}-${year}`; // Format as 'dd-mm-yyyy'
}

function createInvoice(){
  const header = document.querySelector('#sectionInvoice .invoiceHeader');
  const headerLeft = header.querySelector('.invoiceHeaderLeft');
  headerLeft.innerHTML = clientName.value + '<br>';
  for (let line of client.address.split(',')){
    headerLeft.innerHTML += line + '<br>';
  }
  const headerRight = header.querySelector('.invoiceHeaderRight');
  headerRight.innerHTML = '';
  for (let line of myHeaderData){
    headerRight.innerHTML += line + '<br>';
  }
  const invoiceNr = header.querySelector('.invoiceNr span');
  invoiceNr.textContent = document.getElementById('invoiceNr').value;

  const invoiceDate = header.querySelector('.invoiceDate span');
  invoiceDate.textContent = formatToDDMMYYYY(document.getElementById('invoiceDate').value);

  const footer = document.querySelector('#sectionInvoice .invoiceFooter');
  footer.innerHTML = '';
  for (let line of myFooterData){
    line = line.replace('$factuurnummer', document.getElementById('invoiceNr').value);
    line = line.replace('$factuurbedrag', invoiceTotals.Incl.toFixed(2));
    footer.innerHTML += line + '<br>';
  }
  const details = document.querySelector('#sectionInvoice .invoiceDetails');
  displayDetails(details);
  const totals = document.querySelector('#sectionInvoice .totals');
  displayTotals(totals);
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
      alert('Ingevoerd: '+numberValue+' Klopt dit?');
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
      alert('Ingevoerd: '+ floatValue +' Klopt dit?');
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
  for (input of clone.querySelectorAll('.float')){
    input = createFloatInput(5,input);
  }
  for (let span of clone.querySelectorAll('span.duration')){
    const minutesInput = span.querySelector('input.minutes');
    const hoursInput = span.querySelector('input.hours');
    minutesInput.onchange = (e) => {
      IntValue = parseInt(minutesInput.value);
      hoursInput.value = '';
      if (!isNaN(IntValue)){
        hoursInput.value = (IntValue / 60).toFixed(2);
      }
      calcDisplayTotals();
    }
    hoursInput.onchange = (e) => {
      FloatValue = parseFloat(hoursInput.value);
      minutesInput.value = '';
      if (!isNaN(FloatValue)){
        minutesInput.value = (FloatValue * 60).toFixed(0);
      }
      calcDisplayTotals();
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
  const removeLessonDate = clone.querySelector('.removeLessonDate');
  removeLessonDate.onclick = (e)=>{
    let lessonDates = clone.parentNode.querySelectorAll('.lessonDate');
    if (lessonDates.length > 1){
      clone.parentNode.removeChild(clone);
      calcDisplayTotals();
    }
  }
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
  removeButton.onclick = (e) => {clone.remove(); calcDisplayTotals(); }
  vatSelect = clone.querySelector('.vat');
  vatSelect.value = '';
  for (let input of clone.querySelectorAll('input')){
    input.addEventListener('change',(e)=>{calcDisplayTotals();})
  }
  for (let input of clone.querySelectorAll('select')){
    input.addEventListener('change',(e)=>{calcDisplayTotals();})
  }
  for (let input of clone.querySelectorAll('textarea')){
    input.addEventListener('change',(e)=>{calcDisplayTotals();})
  }
}

createFloatInput(50,tariffInput);

function displayDetail(container, value, className){
  let detail = document.createElement('p');
  container.appendChild(detail);
  detail.textContent = value;
  detail.className = className;
}

function displayDetails(container){
  container.innerHTML = '';

  for (let lessonDate of document.querySelectorAll('.lessonDate')){
    let hours = 0;
    let date = lessonDate.querySelector('input[type="date"').value;
    let div = document.createElement('div');
    container.appendChild(div);
    displayDetail(div,(formatToDDMMYYYY(date) || 'datum') + ':', 'displayDate')
    lessons = '';
    for (let vatIndex in [0,1]){
      hours = parseFloat(lessonDate.querySelector(`span[data-vat="${vatIndex}"] .hours`).value || '0');
      if (hours){
        let displayUnits = 'uur';
        if (client.lessonUnit == 'lessons'){
          displayUnits = 'lessen';
        }
        lessons += `zangles ${vats[vatIndex].les}: ${hours.toFixed(2)} ${displayUnits}; `
      }
    }
    displayDetail(div,lessons, '');
    for (let service of lessonDate.querySelectorAll('.service')){
      let serviceType = serviceTypes[parseInt(service.querySelector('.serviceType').value || '0')].name;
      let description = service.querySelector('.description').value || '';
      let des = '';
      if (serviceType) des += serviceType;
      if (description) des += ((des)?' ':'') + description;
      let unit = serviceUnits[parseInt(service.querySelector('.unit').value || '0')].name;
      let amount = (parseFloat(service.querySelector('.amount').value || 0)).toFixed(2);
      let detail = `${des}: ${amount} ${unit}; `;
      displayDetail(div,detail, '');   
    }
  }
}

function displayTotalColumn(container, value, className){
  let span = document.createElement('span');
  span.className = className;
  span.innerHTML = value;
  container.appendChild(span)
}

function displayTotals(container){
  for (let el of container.querySelectorAll('.bdy')){
    container.removeChild(el);
  }
  for (let el of container.querySelectorAll('.ftr')){
    container.removeChild(el);
  }
  for (vat of vats){
    if (vat.totExcl > 0){
      displayTotalColumn(container, vat.name, 'bdy');
      displayTotalColumn(container, vat.services.join('<br>'),'bdy');
      displayTotalColumn(container, vat.totExcl.toFixed(2), 'bdy flt');
      displayTotalColumn(container, vat.amount.toFixed(2), 'bdy flt');
      displayTotalColumn(container, vat.totIncl.toFixed(2), 'bdy flt');
    }
  }
  displayTotalColumn(container, '', 'ftr');
  displayTotalColumn(container, 'Totalen:','ftr');
  displayTotalColumn(container, invoiceTotals.Excl.toFixed(2), 'ftr flt');
  displayTotalColumn(container, invoiceTotals.VAT.toFixed(2), 'ftr flt');
  displayTotalColumn(container, invoiceTotals.Incl.toFixed(2), 'ftr flt');
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
      let hoursInput = duration.value;
      if (hoursInput != ''){
        hours += parseFloat(hoursInput)
      }
    }
    if (hours){
      lessonUnit = 'uur';
      if (client.lessonUnit == 'lessons'){
        lessonUnit = 'lessen';
      }
      vats[vatnr].services.push(`zangles ${vats[vatnr].les}: ${hours.toFixed(2)} ${lessonUnit} à € ${tariff.toFixed(2)}`)
      vats[vatnr].totExcl = parseFloat((hours * tariff).toFixed(2));
      vats[vatnr].hours = hours;
    }
  }

  for (let service of document.querySelectorAll('.service')){
    let serviceDate = formatToDDMMYYYY(service.parentNode.parentNode.querySelector('input[type="date"').value);
    let serviceType = serviceTypes[parseInt(service.querySelector('.serviceType').value || '0')].name;
    let description = service.querySelector('.description').value || '';
    let des = '';
    if (serviceType) des += serviceType;
    if (description) des += ((des)?' ':'') + description;
    let unit = serviceUnits[parseInt(service.querySelector('.unit').value || '0')].name;
    let amount = parseFloat(service.querySelector('.amount').value || 0);
    let tariff = parseFloat(service.querySelector('.tariff').value || 0);
    let total = amount * tariff;
    let vatIndex = parseInt(service.querySelector('.vat').value || '0');
    let serviceDes = `${des}: ${amount.toFixed(2)} ${unit} à € ${tariff.toFixed(2)}`;
    if (serviceDate){
      serviceDes = serviceDate + ': ' + serviceDes;
    }
    if (tariff > 0){
      vats[vatIndex].services.push(serviceDes);
      vats[vatIndex].totExcl += parseFloat(total.toFixed(2));
    }
  }
  invoiceTotals.Excl = 0;
  invoiceTotals.VAT = 0;
  invoiceTotals.Incl = 0;
  for (vat of vats){
    if (vat.totExcl > 0){
      invoiceTotals.Excl += vat.totExcl;
      vat.amount = parseFloat((vat.totExcl * vat.perc / 100).toFixed(2));
      invoiceTotals.VAT += vat.amount;
      vat.totIncl = vat.totExcl + vat.amount;
      invoiceTotals.Incl += vat.totIncl;
    }
  }
}

function calcDisplayTotals(){
  calcTotals();
  displayTotals(document.querySelector('#sectionInput .totals'));
}
