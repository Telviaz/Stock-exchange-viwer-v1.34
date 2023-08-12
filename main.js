document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchBtn');
  const symbolInput = document.getElementById('symbol');
  const stockDataDiv = document.getElementById('stockData');

  searchButton.addEventListener('click', function () {
    const symbol = symbolInput.value.toUpperCase();
    fetchStockData(symbol);
  });

  function fetchStockData(symbol) {
    const apiKey = 'HA9DDC9IGCTOTA8N';
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    stockDataDiv.innerHTML = 'Loading...';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const latestData = data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]];
        if (!latestData) {
          stockDataDiv.innerHTML = 'No data available for this symbol.';
          return;
        }

        const openPrice = parseFloat(latestData['1. open']).toFixed(2);
        const closePrice = parseFloat(latestData['4. close']).toFixed(2);
        const highPrice = parseFloat(latestData['2. high']).toFixed(2);
        const lowPrice = parseFloat(latestData['3. low']).toFixed(2);
        const volume = latestData['5. volume'];

        stockDataDiv.innerHTML = `
          <p>Symbol: ${symbol}</p>
          <p>Open Price: $${openPrice}</p>
          <p>Close Price: $${closePrice}</p>
          <p>High Price: $${highPrice}</p>
          <p>Low Price: $${lowPrice}</p>
          <p>Volume: ${volume}</p>
        `;

        setTimeout(() => {
          stockDataDiv.classList.add('fade-in');
        }, 100);
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
        stockDataDiv.innerHTML = 'Error fetching stock data';
      });
  }
});
