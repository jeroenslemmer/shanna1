vats = [
  {name: '21%', perc: 21,  les: '21 jaar en ouder',},
  {name: 'vrijgesteld', perc: 0, les: 'onder 21 jaar',},
  {name: '9%', perc: 9, },   
  {name: '0%', perc: 0, },   
];

clients = [
  {name: 'Main Music School', tariff: 29, type: 'school', lessonUnit: 'minutes', address: 'Nieuwstraat 2, 5301 EV Zaltbommel, Nederland'},
  {name: 'Zangschool Utrecht', tariff: 32.50, type: 'school', lessonUnit: 'hours', lumpsum: true, address: 'GX, Bouwstraat 55 (in ZIMIHC theater), 3572 SP Utrecht, Nederland'},
  {name: 'Vocal Factory Utrecht', tariff: 32.50, type: 'school', lessonUnit: 'minutes', address: 'Gruttersdijk 12, 3514 BG Utrecht, Nederland'},
	{name: 'Nienke Lohuis', tariff: 52.30, type: 'school', lessonUnit: 'lessons', address: 'Jan van Scorelstraat 89, 3583 CL Utrecht, Nederland'},
  {name: 'Privé les', tariff: 52.30, type: 'school', lessonUnit: 'lessons'},
  {name: 'Maria Ros', tariff: 32.50, type: 'other', address: 'Weegschaal 15, 33228 PA Dordrecht, Nederland'},
  {name: 'Cultureel', tariff: 32.50, type: 'other'},
  {name: 'Cultureel', tariff: 32.50, type: 'other'},
];

myHeaderData = [
	'Shanna Slemmer',
	'shanna.slemmer@gmail.com',
	'Slotermeerlaan 1-D203, 1064 GX',
	'Amsterdam, Nederland',
	'BTW-nummer NL001556138B79',
	'KvK-nummer 53549937',
	'IBAN NL40 TRIO 0379 4987 23',
];

myFooterData = [
	'Graag het totaalbedrag van <strong>€ $factuurbedrag</strong> binnen 30 dagen overmaken naar rekeningnummer <strong>NL40 TRIO 0379 4987 23</strong> t.n.v. S.N.Slemmer o.v.v. het factuurnummer $factuurnummer'
];

serviceTypes = [
  {name: ""},
  {name: "optreden", },
  {name: 'zangles'},
  {name: 'duo zangles' },
  {name: "piano begeleiding"},
  {name: "hulp leerlingoptredens"},
  {name: "reiskosten"},
  {name: "zangcadeau" },  
  {name: "coaching"},
];

serviceUnits = [
  {name: ''},
  {name: 'uur'},
  {name: 'lessen'},
  {name: 'stuks'},
  {name: 'km'},
  {name: 'keer'},
];

let hoursLimit = 300;