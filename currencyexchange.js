const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.79, SAR: 3.75, AED: 3.67, TND: 3.12, DZD: 134.50, EGP: 30.90, JOD: 0.71 },
    EUR: { USD: 1.09, GBP: 0.86, SAR: 4.08, AED: 4.00, TND: 3.39, DZD: 146.20, EGP: 33.63, JOD: 0.77 },
    GBP: { USD: 1.27, EUR: 1.16, SAR: 4.74, AED: 4.65, TND: 3.94, DZD: 170.00, EGP: 39.11, JOD: 0.90 },
    SAR: { USD: 0.27, EUR: 0.24, GBP: 0.21, AED: 0.98, TND: 0.83, DZD: 35.80, EGP: 8.24, JOD: 0.19 },
    AED: { USD: 0.27, EUR: 0.25, GBP: 0.22, SAR: 1.02, TND: 0.85, DZD: 36.60, EGP: 8.41, JOD: 0.19 },
    TND: { USD: 0.32, EUR: 0.29, GBP: 0.25, SAR: 1.20, AED: 1.18, DZD: 43.10, EGP: 9.90, JOD: 0.23 },
    DZD: { USD: 0.0074, EUR: 0.0068, GBP: 0.0059, SAR: 0.028, AED: 0.027, TND: 0.023, EGP: 0.23, JOD: 0.0053 },
    EGP: { USD: 0.032, EUR: 0.030, GBP: 0.026, SAR: 0.12, AED: 0.12, TND: 0.10, DZD: 4.35, JOD: 0.023 },
    JOD: { USD: 1.41, EUR: 1.30, GBP: 1.11, SAR: 5.28, AED: 5.18, TND: 4.39, DZD: 189.00, EGP: 43.45 }
};

const currencySymbols = {
    USD: '$', EUR: '€', GBP: '£', SAR: '﷼', AED: 'د.إ',
    TND: 'د.ت', DZD: 'د.ج', EGP: '£', JOD: 'د.أ'
};

const currencyNames = {
    USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound',
    SAR: 'Saudi Riyal', AED: 'UAE Dirham', TND: 'Tunisian Dinar',
    DZD: 'Algerian Dinar', EGP: 'Egyptian Pound', JOD: 'Jordanian Dinar'
};

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const currencyResult = document.getElementById('currency-result');
const currencyDetail = document.getElementById('currency-detail');
const currencyRate = document.getElementById('currency-rate');
const swapBtn = document.getElementById('swap-currencies');
const resultBox = document.querySelector('.result-box');

/**
 * Show loading effect on an element
 * @param {HTMLElement} element 
 */
function showLoadingEffect(element) {
    element.classList.add('loading-effect');
    setTimeout(() => {
        element.classList.remove('loading-effect');
    }, 500);
}


function convertCurrency() {
    const amount = parseFloat(amountInput.value) || 0;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    showLoadingEffect(resultBox);

    if (from === to) {
        setTimeout(() => {
            const result = amount.toFixed(2);
            currencyResult.textContent = `${currencySymbols[to]}${result}`;
            currencyDetail.textContent = `${amount} ${currencyNames[from]} = ${currencySymbols[to]}${result}`;
            currencyRate.innerHTML = `<i class="fas fa-info-circle"></i> Exchange Rate: 1 ${currencyNames[from]} = 1 ${currencyNames[to]}`;
        }, 300);
        return;
    }

    let result;
    if (from === 'USD') {
        result = amount * exchangeRates.USD[to];
    } else if (to === 'USD') {
        result = amount / exchangeRates[from].USD;
    } else {
        const toUSD = amount / exchangeRates[from].USD;
        result = toUSD * exchangeRates.USD[to];
    }

    setTimeout(() => {
        const rate = (result / amount).toFixed(4);
        currencyResult.textContent = `${currencySymbols[to]}${result.toFixed(2)}`;
        currencyDetail.textContent = `${currencySymbols[from]}${amount} ${currencyNames[from]} = ${currencySymbols[to]}${result.toFixed(2)} ${currencyNames[to]}`;
        currencyRate.innerHTML = `<i class="fas fa-info-circle"></i> Current Exchange Rate: 1 ${currencyNames[from]} = ${rate} ${currencyNames[to]}`;

        currencyResult.style.color = '#00d2ff';
        setTimeout(() => {
            currencyResult.style.color = '';
        }, 500);
    }, 300);
}

function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

function setupEvents() {
    amountInput.addEventListener('input', convertCurrency);
    fromCurrency.addEventListener('change', convertCurrency);
    toCurrency.addEventListener('change', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);

    amountInput.addEventListener('focus', function () {
        this.select();
        this.style.backgroundColor = '#f0f8ff';
    });

    amountInput.addEventListener('blur', function () {
        this.style.backgroundColor = '';
    });

    fromCurrency.addEventListener('focus', function () {
        this.style.boxShadow = '0 0 0 3px rgba(58, 123, 213, 0.3)';
    });

    fromCurrency.addEventListener('blur', function () {
        this.style.boxShadow = '';
    });

    toCurrency.addEventListener('focus', function () {
        this.style.boxShadow = '0 0 0 3px rgba(58, 123, 213, 0.3)';
    });

    toCurrency.addEventListener('blur', function () {
        this.style.boxShadow = '';
    });
}

function init() {
    setupEvents();
    convertCurrency();


    setTimeout(() => {
        document.querySelectorAll('.input-group, .result-box, .exchange-rate').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', init);