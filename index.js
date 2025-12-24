const fromCurrency = document.getElementById('from-currency');
const fromAmount = document.getElementById('from-amount');
const toCurrency = document.getElementById('to-currency');
const toAmount = document.getElementById('to-amount');
const rateDisplay = document.getElementById('exchange-rate-display');
const swapBtn = document.getElementById('swap-button');

// calculate exchange rate and update amounts
const calculate = async () => {
    const fromCurrencyVal = fromCurrency.value;
    const toCurrencyVal = toCurrency.value;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/19af1528adb7f0115504daca/latest/${fromCurrencyVal}`);
        const data = await response.json();

        if (data.result === "error") {
            throw new Error(data['error-type']);
        }

        const rate = data.conversion_rates[toCurrencyVal];

        rateDisplay.innerText = `1 ${fromCurrencyVal} = ${rate} ${toCurrencyVal}`;

        toAmount.value = (fromAmount.value * rate).toFixed(2);

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

// event listeners
fromCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);
toCurrency.addEventListener('change', calculate);
toAmount.addEventListener('input', calculate);

// swap functionality
swapBtn.addEventListener('click', () => {
    const tempCurrency = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    calculate();
});

// Initial calculation
calculate();