const dropList = document.querySelectorAll(".drop-list select");
const exchangeIcon = document.querySelector("form .icon");

fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
getButton = document.querySelector("form button");


// VAR QUE IRÁ ADICIONAR TODAS AS OPÇÕES DE MOEDAS NO SELECT BOX
for(let i = 0; i < dropList.length; i++) {
    for(currency_code in country_list) {
        let selected;
        if(i == 0){
            selected =  currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected =  currency_code == "BRL" ? "selected" : "";
        }

        let optionTag =  `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); // MUDANDO A BANDEIRA CONFORTE O ELEMENTO VAI PASSANDO COMO ARGUMENTO
    })
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}


// ATUALIZANDO A PÁGINA E O VALOR SELECIONADO JÁ MOSTRAR A CONVERSÃO
window.addEventListener("load", () => {
    getExchangeRate();
})

getButton.addEventListener("click", e => {
    e.preventDefault(); // 
    getExchangeRate();
});

// TROCANDO O VALOR DAS MOEDAS CASO O USUÁRIO CLIQUE NO ÍCONE
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})


function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");

    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Realizando a conversão...";
    let url = `https://v6.exchangerate-api.com/v6/1495801fd667ae485a09bccf/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
    let exchangeRate = result.conversion_rates[toCurrency.value];
    let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(()=> {
        exchangeRateTxt.innerText = "Alguma coisa acontenceu..."
    });
    
};

