let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
    if (nav.style.transform != 'translateX(0%)') {
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
    if (toggleIcon.className != 'menuIcon toggle') {
        toggleIcon.className += ' toggle';
    } else {
        toggleIcon.className = 'menuIcon';
    }
});
//API------------------------------------------------

const TRNApiKey = 'f8fd1723-c779-40ff-ab22-57f475b91fd0';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy server URL

const fetchCSGOProfile = async (steamId) => {
  const url = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamId}`;

  try {
    const response = await fetch(proxyUrl + url, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'TRN-Api-Key': TRNApiKey
      }
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const profileData = await response.json();
    console.log(profileData);

    return profileData;
  } catch (error) {
    console.error('Error fetching CSGO profile:', error);
  }
};
const updateProfileInfo = (profileData) => {
    const profileDiv = document.getElementById('profileData');
  
    // Update the HTML with the desired data from the profileData object
    profileDiv.innerHTML = `
      <h2>CSGO Profile</h2>
      <p>Username: ${profileData.data.platformInfo.platformUserHandle}</p>
      <p>Level: ${profileData.data.segments[0].stats.level.value}</p>
      <p>Kills: ${profileData.data.segments[0].stats.kills.value}</p>
      <!-- Add more data as needed -->
    `;
  };
  
fetchCSGOProfile('76561198008049283');
let skinsData = []; // Variable to store the retrieved skins data
        function fetchCSGOData() {
            fetch('https://bymykel.github.io/CSGO-API/api/en/skins.json')
                .then(response => response.json())
                .then(data => {
                  skinsData = data;
                    // Process the data
                    displayData(skinsData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        function displayData(data) {
          const skinsTable = document.getElementById('skins-table');

          // Clear any existing data
          skinsTable.innerHTML = '';

          // Create table headers
          const tableHeaderRow = document.createElement('tr');
          const headers = ['Nome', 'Imagem', 'Raridade'];
          headers.forEach(header => {
              const th = document.createElement('th');
              th.textContent = header;
              tableHeaderRow.appendChild(th);
          });
          skinsTable.appendChild(tableHeaderRow);

          
          data.forEach(skin => {
              const tableRow = document.createElement('tr');

              const nameCell = document.createElement('td');
              nameCell.textContent = skin.name;
              tableRow.appendChild(nameCell);

              const imageCell = document.createElement('td');
              const imageElement = document.createElement('img');
              imageElement.src = skin.image; // Set the image URL
              imageCell.appendChild(imageElement);
              tableRow.appendChild(imageCell);

              const rarityCell = document.createElement('td');
              rarityCell.textContent = skin.rarity;
              tableRow.appendChild(rarityCell);

              skinsTable.appendChild(tableRow);
          });
        }
       

        function filterData() {
          const searchQuery = document.getElementById('search-input').value.toLowerCase();

          // Filter the skins based on the search query
          const filteredData = skinsData.filter(skin => {
              return skin.name.toLowerCase().includes(searchQuery);
          });

          displayData(filteredData);
      }
    


      new Twitch.Embed("twitch-embed", {
        width: 854,
        height: 480,
        channel: "monstercat",
        // Only needed if this page is going to be embedded on other websites
        parent: ["embed.example.com", "othersite.example.com"]
      });
