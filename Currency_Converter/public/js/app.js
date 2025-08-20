const baseURL = "https://v6.exchangerate-api.com/v6/7b7631b37aeae1be5ca6ef05/latest";

// Selecting the Dropdowns
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");    


for(let select of dropdowns){

    for(currencyCode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;

        if(select.name === "from" && currencyCode === "USD"){

            newOption.selected = "selected";

        }

        else if(select.name == "to" && currencyCode === "INR"){

            newOption.selected = "selected";

        }

        select.append(newOption);

    }

    select.addEventListener("change", (evt) =>{

        updateFlag(evt.target);

    })

}



const updateFlag = (element) =>{

    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;

}


const updateExchangeRate = async () => {

    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){

        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurrency.value,toCurrency.value)
    
    const URL = `${baseURL}/${fromCurrency.value}`; 
    let response = await fetch(URL);
    let data = await response.json();
    
    // 🚩 CHANGE 2: Correct way to access the rate from the 'conversion_rates' object
    let rate = data.conversion_rates[toCurrency.value]; 

    let finalAmount = amtVal * rate;
    // 🚩 CHANGE 3: Added toFixed(2) for better display of currency
    msg.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount.toFixed(2)} ${toCurrency.value}`; 
    
}


btn.addEventListener("click", (evt) =>{

    evt.preventDefault(); // Prevent the by default refresh of the page ( and other actions as well )
    updateExchangeRate();

})

window.addEventListener("load", () =>{

    updateExchangeRate();

})

