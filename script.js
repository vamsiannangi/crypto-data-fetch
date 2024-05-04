let cryptoData = [];

function fetchData() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => {
      cryptoData = data;
      renderTable();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function renderTable() {
  const tableBody = document.getElementById('cryptoTableBody');
  tableBody.innerHTML = '';

  cryptoData.forEach(crypto => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${crypto.name}</td>
      <td>${crypto.symbol}</td>
      <td>${crypto.current_price}</td>
      <td>${crypto.total_volume}</td>
      <td><img src="${crypto.image}" alt="${crypto.name}" width="50"></td>
    `;
  });
}

function filterData(searchTerm) {
  const filteredData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
}

function handleSearch() {
  const searchTerm = document.getElementById('searchInput').value;
  const filteredData = filterData(searchTerm);
  cryptoData = filteredData;
  renderTable();
}

function sortByMarketCap() {
  cryptoData.sort((a, b) => b.market_cap - a.market_cap);
  renderTable();
}

function sortByPercentageChange() {
  cryptoData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable();
}

fetchData(); // Fetch data when the page loads
