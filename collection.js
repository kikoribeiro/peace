let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
    if (nav.style.transform !== 'translateX(0%)') {
        nav.style.transform = 'translateX(0%)';
        nav.style.transition = 'transform 0.2s ease-out';
    } else { 
        nav.style.transform = 'translateX(-100%)';
        nav.style.transition = 'transform 0.2s ease-out';
    }
});

// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

toggleIcon.addEventListener('click', () => {
    if (!toggleIcon.classList.contains('toggle')) {
        toggleIcon.classList.add('toggle');
    } else {
        toggleIcon.classList.remove('toggle');
    }
});




let skinsData = [];

function fetchCSGOData() {
    fetch('https://bymykel.github.io/CSGO-API/api/en/collections.json')
        .then(response => response.json())
        .then(data => {
            collectionsData = data;
            // Process the data
            displayData(collectionsData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data) {
    const skinsTable = document.getElementById('skins-table');
  
    if (!skinsTable) {
        console.error('collections-table element not found');
        return;
    }

    
    skinsTable.innerHTML = '';

  
    const tableHeaderRow = document.createElement('tr');
    const headers = ['Name', 'Image'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeaderRow.appendChild(th);
    });
    skinsTable.appendChild(tableHeaderRow);

    data.forEach(collections => {
        const tableRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = collections.name;
        tableRow.appendChild(nameCell);

        const imageCell = document.createElement('td');
        const imageElement = document.createElement('img');
        imageElement.src = collections.image; // Set the image URL
        imageCell.appendChild(imageElement);
        tableRow.appendChild(imageCell);

    });
}

function filterData() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    const filteredData = collectionsData.filter(collections => {
        return collections.name.toLowerCase().includes(searchQuery);
    });

    displayData(filteredData);
}
fetchCSGOData();