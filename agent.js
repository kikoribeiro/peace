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
    fetch('https://bymykel.github.io/CSGO-API/api/en/agents.json')
        .then(response => response.json())
        .then(data => {
            agentsData = data;
            // Process the data
            displayData(agentsData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data) {
    const skinsTable = document.getElementById('skins-table');
  
    if (!skinsTable) {
        console.error('agent-table element not found');
        return;
    }

    
    skinsTable.innerHTML = '';

  
    const tableHeaderRow = document.createElement('tr');
    const headers = ['Name', 'Image', 'Rarity'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeaderRow.appendChild(th);
    });
    skinsTable.appendChild(tableHeaderRow);

    data.forEach(agent => {
        const tableRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = agent.name;
        tableRow.appendChild(nameCell);

        const imageCell = document.createElement('td');
        const imageElement = document.createElement('img');
        imageElement.src = agent.image; // Set the image URL
        imageCell.appendChild(imageElement);
        tableRow.appendChild(imageCell);

        const rarityCell = document.createElement('td');
        rarityCell.textContent = agent.rarity;
        tableRow.appendChild(rarityCell);

        skinsTable.appendChild(tableRow);
    });
}

function filterData() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    const filteredData = agentsData.filter(agent => {
        return agent.name.toLowerCase().includes(searchQuery);
    });

    displayData(filteredData);
}
fetchCSGOData();