const technologiesSelect = document.querySelector(
  '#calculator-form-technologies',
);

const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ',',
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: 'auto',
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: 'No available options',
  itemSelectText: 'Click to select',
  classNames: {
    containerInner: 'choices__inner tech-input-container',
    input: 'choices__input',
  },
});

calculateSum();

const calculatorForm = document.querySelector('.calculator-form');

console.log(calculatorForm);

calculatorForm.addEventListener('submit', function (event) {
  event.preventDefault();
  calculateSum();
});

function calculateSum() {
  //Selectors
  const websiteTypeSelect = document.querySelector(
    '#calculator-form-website-type',
  );
  const websiteCart = document.querySelector(
    '#calculator-form-input-cart input:checked',
  );
  const websiteReception = document.querySelector(
    '#calculator-form-input-reception input:checked',
  );

  //Values
  const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
  const technologiesValue = getTechnologiesSum(
    technologiesMultiSelect.getValue(),
  );
  const websiteCartValue = convertCartOptionToPrice(websiteCart.value);
  const websiteReceptionValue = convertReceptionToPrice(websiteReception.value);

  console.log(websiteTypeValue);
  console.log(technologiesValue);
  console.log(websiteCartValue);
  console.log(websiteReceptionValue);

  const totalSum =
    websiteTypeValue +
    technologiesValue +
    websiteCartValue +
    websiteReceptionValue;

  renderSum(totalSum);
}

function renderSum(sum) {
  const costElement = document.querySelector('.calculator-form-total-cost');

  costElement.textContent = 'Calculating...';

  setTimeout(function () {
    costElement.textContent = sum + '$';
  }, 2000);
}

function convertReceptionToPrice(option) {
  if (option === 'yes') {
    return 500;
  }
  return 0;
}

function convertCartOptionToPrice(option) {
  if (option === 'yes') {
    return 300;
  }
  return 0;
}

function getTechnologiesSum(technologiesArr) {
  let totalSum = 0;

  technologiesArr.forEach(function (tech) {
    totalSum = totalSum + extractPriceFromValue(tech.value);
  });
  return totalSum;
}

function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);

  if (price) {
    return Number(price[0].slice(1)) || 0;
  }

  return 0;
}

// calculatorForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   calculateSum();
// });

// function calculateSum() {
//   //Selectors

//   const websiteTypeSelect = document.querySelector(
//     '#calculator-form-website-type',
//   );
//   const websiteCart = document.querySelector(
//     '#calculator-form-input-cart input:checked',
//   );
//   const websiteReception = document.querySelector(
//     '#calculator-form-input-reception input:checked',
//   );

//   //Value

//   const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
//   const technologiesValue = getTechnologiesSum(
//     technologiesMultiSelect.getValue(),
//   );
//   const websiteCartValue = convertCartOptionToPrice(websiteCart.value);
//   const websiteReceptionValue = convertReceptionToPrice(websiteReception.value);

//   const totalSum =
//     websiteTypeValue +
//     technologiesValue +
//     websiteCartValue +
//     websiteReceptionValue;

//   renderSum(totalSum);
// }
