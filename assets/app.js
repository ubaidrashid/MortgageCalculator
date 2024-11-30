// Select repayment and interest elements
let repaymentRadio = document.querySelector('.repaymentRadio');
let interestRadio = document.querySelector('.interesttRadio');
let calcType = document.querySelector('.calcType');

let amountIcon = document.querySelector('.amountIcon');
let YearIcon = document.querySelector('.YearIcon');
let interestIcon = document.querySelector('.interestIcon');

let amountInputCover = document.querySelector('.amountInputCover');
let loanTermCover = document.querySelector('.loanTermCover');
let interestIconCover = document.querySelector('.interestIconCover');

// Form elements
let loanAmountInput = document.getElementById('loan-amount');
let loanTermInput = document.getElementById('loan-term');
let interestRateInput = document.getElementById('interest-rate');
let calculateBtn = document.getElementById('calculate-btn');

// Error elements
let errorAmount = document.querySelector('.errorAmount');
let errorTerm = document.querySelector('.errorTerm');
let errorRate = document.querySelector('.errorRate');
let errorType = document.querySelector('.errorType');

// Result elements
let monthlyRepaymentElement = document.querySelector('.amountData');
let totalRepaymentElement = document.querySelector('.trAmountData');
let resultSection = document.querySelector('.completed');
let emptySection = document.querySelector('.empty');

// Number formatter for thousands separators
const formatter = new Intl.NumberFormat('en-UK', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Mortgage type selection handlers
repaymentRadio.addEventListener('click', () => {
    repaymentRadio.classList.add('selected');
    interestRadio.classList.remove('selected');
    calcType.innerText = 'Repayments';
    repaymentRadio.querySelector('.radiosRp > div').style.backgroundColor = 'hsl(61, 70%, 52%)';
    repaymentRadio.querySelector('.radiosRp').style.border = '2px solid hsl(61, 70%, 52%)';
    interestRadio.querySelector('.radiosIo').style.border = '1px solid';
    interestRadio.querySelector('.radiosIo > div').style.backgroundColor = 'gray';
    errorType.classList.add('none');
});

interestRadio.addEventListener('click', () => {
    interestRadio.classList.add('selected');
    repaymentRadio.classList.remove('selected');
    calcType.innerText = 'Interest';
    interestRadio.querySelector('.radiosIo > div').style.backgroundColor = 'hsl(61, 70%, 52%)';
    interestRadio.querySelector('.radiosIo').style.border = '2px solid hsl(61, 70%, 52%)';
    repaymentRadio.querySelector('.radiosRp > div').style.backgroundColor = 'gray';
    repaymentRadio.querySelector('.radiosRp').style.border = '1px solid';
    errorType.classList.add('none');
});

// Input validation function
const validateInputs = () => {
    let isValid = true;

    // Validate loan amount
    if (!loanAmountInput.value.trim()) {
        errorAmount.classList.remove('none');
        amountIcon.style.backgroundColor = 'hsl(4, 69%, 50%)';
        amountIcon.style.color = 'white';
        amountInputCover.style.border = '2px solid hsl(4, 69%, 50%)';
        isValid = false;
    } else {
        amountInputCover.style.border = '1px solid hsl(202, 55%, 16%)';
        amountIcon.style.color = ' hsl(200, 24%, 40%)';
        amountIcon.style.backgroundColor = 'hsl(202, 86%, 94%)';
        errorAmount.classList.add('none');
    }

    // Validate loan term
    if (!loanTermInput.value.trim()) {
        errorTerm.classList.remove('none');
        YearIcon.style.backgroundColor = 'hsl(4, 69%, 50%)';
        YearIcon.style.color = 'white';
        loanTermCover.style.border = '2px solid hsl(4, 69%, 50%)';
        isValid = false;
    } else {
        loanTermCover.style.border = '1px solid hsl(202, 55%, 16%)';
        YearIcon.style.color = ' hsl(200, 24%, 40%)';
        YearIcon.style.backgroundColor = 'hsl(202, 86%, 94%)';
        errorTerm.classList.add('none');
    }

    // Validate interest rate
    if (!interestRateInput.value.trim()) {
        errorRate.classList.remove('none');
        interestIcon.style.backgroundColor = 'hsl(4, 69%, 50%)';
        interestIcon.style.color = 'white';
        interestIconCover.style.border = '2px solid hsl(4, 69%, 50%)';
        isValid = false;
    } else {
        interestIconCover.style.border = '1px solid hsl(202, 55%, 16%)';
        interestIcon.style.color = ' hsl(200, 24%, 40%)';
        interestIcon.style.backgroundColor = 'hsl(202, 86%, 94%)';
        errorRate.classList.add('none');
    }

    // Validate mortgage type
    if (!repaymentRadio.classList.contains('selected') && !interestRadio.classList.contains('selected')) {
        errorType.classList.remove('none');
        isValid = false;
    } else {
        errorType.classList.add('none');
    }

    return isValid;
};

// Calculation logic
calculateBtn.addEventListener('click', () => {
    // Validate inputs
    if (!validateInputs()) return;

    let loanAmount = parseFloat(loanAmountInput.value);
    let loanTerm = parseFloat(loanTermInput.value);
    let interestRate = parseFloat(interestRateInput.value) / 100; // Convert to decimal

    let monthlyRepayment, totalRepayment;

    if (repaymentRadio.classList.contains('selected')) {
        // Repayment calculation (Standard amortized loan formula)
        let monthlyRate = interestRate / 12;
        let numberOfPayments = loanTerm * 12;
        monthlyRepayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        totalRepayment = monthlyRepayment * numberOfPayments;
    } else if (interestRadio.classList.contains('selected')) {
        // Interest Only calculation
        let monthlyRate = interestRate / 12;
        monthlyRepayment = loanAmount * monthlyRate;
        totalRepayment = loanAmount + (monthlyRepayment * loanTerm * 12); // Adding the principal amount
    }

    // Format numbers with commas and display results
    monthlyRepaymentElement.innerText = formatter.format(monthlyRepayment);
    totalRepaymentElement.innerText = formatter.format(totalRepayment);

    // Update the `amountData` field with the formatted monthly repayment
    document.querySelector('.amount').innerHTML = `£<span class="amountData">${formatter.format(monthlyRepayment)}</span>`;

    // Show result section and hide empty state
    resultSection.classList.remove('none');
    emptySection.classList.add('none');
});

// Clear All functionality
let clearAllBtn = document.querySelector('.clearAll');
clearAllBtn.addEventListener('click', () => {
    // Reset input fields
    loanAmountInput.value = '';
    loanTermInput.value = '';
    interestRateInput.value = '';

    // Reset radio buttons
    repaymentRadio.classList.remove('selected');
    interestRadio.classList.remove('selected');
    calcType.innerText = '';

    // Reset error messages
    errorAmount.classList.add('none');
    errorTerm.classList.add('none');
    errorRate.classList.add('none');
    errorType.classList.add('none');

    // Reset input field covers and icons
    amountInputCover.style.border = '1px solid hsl(202, 55%, 16%)';
    amountIcon.style.color = ' hsl(200, 24%, 40%)';
    amountIcon.style.backgroundColor = 'hsl(202, 86%, 94%)';

    loanTermCover.style.border = '1px solid hsl(202, 55%, 16%)';
    YearIcon.style.color = ' hsl(200, 24%, 40%)';
    YearIcon.style.backgroundColor = 'hsl(202, 86%, 94%)';

    interestIconCover.style.border = '1px solid hsl(202, 55%, 16%)';
    interestIcon.style.color = ' hsl(200, 24%, 40%)';
    interestIcon.style.backgroundColor = 'hsl(202, 86%, 94%)';

    // Reset result section
    resultSection.classList.add('none');
    emptySection.classList.remove('none');
});
