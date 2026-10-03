const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const FALLBACK_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdown= document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const msg = document.querySelector(".msg");
for(let select of dropdown){
for(code in countryList){
    let newOption = document.createElement("option");
    newOption.value = code;
    newOption.textContent = code;
    if(select.name==="from" && code==="USD"){
        newOption.selected = "selected";
    }
    else if(select.name==="to" && code==="INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
    }
select.addEventListener("change", e=>{
    updateFlag(e.target);
});
}

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
};

btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const fromCurrency = document.querySelector(".from select").value;
    const toCurrency = document.querySelector(".to select").value;
    let amount = document.querySelector(".amount input").value;
    if(amount==="" || amount<=0){
        amount=1;
        document.querySelector(".amount input").value = 1;

    }

    const fromCode = fromCurrency.toLowerCase();
    const toCode = toCurrency.toLowerCase();
    const URL = `${BASE_URL}/${fromCode}.json`;
    let response = await fetch(URL);
    if (!response.ok) {
        response = await fetch(`${FALLBACK_URL}/${fromCode}.json`);
    }
    if (!response.ok) {
        msg.innerText = "Could not retrieve the exchange rate. Please try again.";
        return;
    }
    let data = await response.json();
    let rate = data[fromCode][toCode];
    let total = (amount * rate).toFixed(2);
    msg.innerText= `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
});


