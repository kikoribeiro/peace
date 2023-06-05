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

    const fetchCSGOProfile = async (steamId) => {
    const TRNApiKey = 'f8fd1723-c779-40ff-ab22-57f475b91fd0';
    const url = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamId}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'TRN-Api-Key': 'f8fd1723-c779-40ff-ab22-57f475b91fd0',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSGO profile');
        }

        const profileData = response.data;
        return profileData;
    } catch (error) {
        console.error('Error fetching CSGO profile:', error);
        throw error;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchbutton');
    const steamIdInput = document.getElementById('steamidinput');
  
    fetchButton.addEventListener('click', async () => {
      const steamId = steamIdInput.value;
      if (steamId) {
        try {
          const profileData = await fetchCSGOProfile(steamId);
          displayProfile(profileData);
        } catch (error) {
          resultContainer.textContent = 'Failed to fetch CSGO profile';
        }
      } else {
        resultContainer.textContent = 'Please enter a Steam ID';
      }
    });
  });

function displayProfile(profileData) {
    const resultContainer = document.getElementById('result-container');

    resultContainer.innerHTML = `
        <h2>${profileData.platformInfo.platformUserHandle}</h2>
        <div>
            <h3>Stats:</h3>
            <p>Total Kills: ${profileData.segments[0].stats.kills.displayValue}</p>
            <p>Total Deaths: ${profileData.segments[0].stats.deaths.displayValue}</p>
            <p>Total Wins: ${profileData.segments[0].stats.wins.displayValue}</p>
            <p>Total Matches Played: ${profileData.segments[0].stats.matchesPlayed.displayValue}</p>
        </div>
    `;
}
