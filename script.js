const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];
let displayedCoins = [];

function fetchCryptoData() {

    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch cryptocurrency data");
            }

            return response.json();
        })
        .then((coins) => {
             console.log("Cryptocurrency Data:", coins);

            // Store the API response
            cryptoData = coins;
            displayedCoins = [...cryptoData];

            renderCryptoData(displayedCoins);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

fetchCryptoData();


function renderCryptoData(coins) {
    const tableBody = document.getElementById("cryptoTableBody");

    tableBody.innerHTML = "";

    coins.forEach((coin) => {
        
        const row = document.createElement("tr");

        
        const coinCell = document.createElement("td");

        const coinInfo = document.createElement("div");
        coinInfo.classList.add("coin-info");

        const coinImage = document.createElement("img");
        coinImage.src = coin.image;
        coinImage.alt = coin.name;

        const coinName = document.createElement("span");
        coinName.textContent = coin.name;

        coinInfo.appendChild(coinImage);
        coinInfo.appendChild(coinName);
        coinCell.appendChild(coinInfo);

      
        const symbolCell = document.createElement("td");
        symbolCell.textContent = coin.symbol.toUpperCase();

        
        const priceCell = document.createElement("td");
        priceCell.textContent = `$${coin.current_price.toLocaleString()}`;

      
        const volumeCell = document.createElement("td");
        volumeCell.textContent = `$${coin.total_volume.toLocaleString()}`;

      
        const changeCell = document.createElement("td");
        const change = coin.price_change_percentage_24h;

        changeCell.textContent = change !== null
            ? `${change.toFixed(2)}%`
            : "N/A";

        changeCell.classList.add(
            change >= 0 ? "positive" : "negative"
        );

        
        const marketCapCell = document.createElement("td");
        marketCapCell.textContent = `Mkt Cap :$${coin.market_cap.toLocaleString()}`;

       
        row.appendChild(coinCell);
        row.appendChild(symbolCell);
        row.appendChild(priceCell);
        row.appendChild(volumeCell);
        row.appendChild(changeCell);
        row.appendChild(marketCapCell);

  
        tableBody.appendChild(row);
    });
}


function searchCrypto() {
  
    const searchInput = document.getElementById("searchInput");

    const searchText = searchInput.value.trim().toLowerCase();

    displayedCoins = cryptoData.filter((coin) => {
        return (
            coin.name.toLowerCase().includes(searchText) ||
            coin.symbol.toLowerCase().includes(searchText)
        );
    });

    renderCryptoData(displayedCoins);
}

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", searchCrypto);


function sortByMarketCap() {
    const copy = [...displayedCoins];

    copy.sort((a, b) => b.market_cap - a.market_cap);

    renderCryptoData(copy);
}

const sortMarketCap = document.getElementById("sortMarketCap");

sortMarketCap.addEventListener("click", sortByMarketCap);


function sortByPercentage() {
    const copy = [...displayedCoins];

    copy.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

    renderCryptoData(copy);
}

const sortPercentage = document.getElementById("sortPercentage");

sortPercentage.addEventListener("click", sortByPercentage);



async function fetchCryptoDataAsync() {

    try {
        
        const res = await fetch(URL);

        if(!res.ok) {
            throw new Error("Failed to fetch cryptocurrency data");
        }

        const coins = await res.json();

        cryptoData = coins;
        displayedCoins = [...cryptoData];

        renderCryptoData(displayedCoins);

        console.log(cryptoData);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

//fetchCryptoDataAsync();
