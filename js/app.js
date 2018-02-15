var timeHours = ['6am','7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var storeForm = document.getElementById('storeForm');
var allBranches = [];

storeForm.addEventListener('submit', handleFormSubmit);

function SalmonStore (name, minCustomers, maxCustomers, avgCookies) {
  this.timeHours = timeHours;
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.totalCookiesSoldToday = [];
  this.addedTotalCookies = 0;
  this.customersEachHour = [];
  allBranches.push(this);
  this.peopleEveryHour();
  this.totalSold();
}

SalmonStore.prototype.totalSold = function() {
  for (var i=0; i < timeHours.length; i++) {
    var totalCookiesSold = this.customersEachHour[i] * this.avgCookies;
    this.totalCookiesSoldToday.push(Math.floor(totalCookiesSold));
    this.addedTotalCookies = this.totalCookiesSoldToday[i] + this.addedTotalCookies;
  }
},

SalmonStore.prototype.peopleEveryHour = function() {
  for (var i = 0; i < timeHours.length; i++) {
    var customerForOneHour =  Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)+ this.minCustomers);
    this.customersEachHour.push(customerForOneHour);
  }
},
SalmonStore.prototype.putTheNumbersInTheBroswer = function() {
  var tableContent = document.getElementById('storeTable');
  var trEL = document.createElement('tr');
  tdEL = document.createElement('td');
  tdEL.textContent = this.name;
  trEL.appendChild(tdEL);
  for (var i = 0; i < timeHours.length; i++) {
    var tdEL = document.createElement('td');
    tdEL.textContent = this.totalCookiesSoldToday[i];
    trEL.appendChild(tdEL);
  }
  tableContent.appendChild(trEL);
  tdEL = document.createElement('td');
  tdEL.textContent = this.addedTotalCookies;
  trEL.appendChild(tdEL);
};

function handleFormSubmit(event){
  event.preventDefault();
  var avgCookies = event.target.avgCookies.value;
  var minCustomers = event.target.minCustomers.value;
  var maxCustomers = event.target.maxCustomers.value;
  var name = event.target.name.value;
  var newStore = new SalmonStore(name, minCustomers, maxCustomers, avgCookies);
  event.target.reset();
  newStore.putTheNumbersInTheBroswer();
}
function headerRow () {
  var total = document.createElement('th');
  var blankData = document.createElement('th');
  var tableContent = document.getElementById('storeTable');
  var trEL = document.createElement('tr');
  trEL.appendChild(blankData);
  for (var i = 0; i < timeHours.length; i++) {
    var thEL = document.createElement('th');
    thEL.textContent = timeHours[i];
    trEL.appendChild(thEL);
  }
  total.textContent = 'total';
  trEL.appendChild(total);
  tableContent.appendChild(trEL);
}

new SalmonStore('1st and Pike', 23, 65, 6.3);
new SalmonStore('SeaTac Airport', 3, 24, 1.2);
new SalmonStore('SeattleCenter', 11, 38, 3.7);
new SalmonStore('Capital Hill', 20, 38, 2.3);
new SalmonStore('Alki', 2, 16, 4.6);

headerRow();
for (var i = 0; i < allBranches.length; i++) {
  allBranches[i].putTheNumbersInTheBroswer();
}