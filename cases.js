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



const casesUrl = 'https://bymykel.github.io/CSGO-API/api/en/crates.json';

// Fetch cases data
async function fetchCases() {
  try {
    const response = await fetch(casesUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
}

// Display cases
function displayCases(cases) {
  const casesContainer = document.getElementById('casesContainer');
  casesContainer.innerHTML = '';

  if (cases && cases.length > 0) {
    cases.forEach((caseData) => {
      const caseElement = document.createElement('div');
      caseElement.classList.add('case');

      const caseImage = document.createElement('img');
      caseImage.src = caseData.image;
      caseImage.alt = caseData.name;

      const caseName = document.createElement('p');
      caseName.textContent = caseData.name;

      caseElement.appendChild(caseImage);
      caseElement.appendChild(caseName);
      casesContainer.appendChild(caseElement);

      // Add click event listener to case element
      caseElement.addEventListener('click', () => {
        displayContains(caseData.contains);
      });
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No cases found.';
    casesContainer.appendChild(errorMessage);
  }
}

// Display contains
function displayContains(contains) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');

  if (contains && contains.length > 0) {
    const containsList = document.createElement('ul');

    contains.forEach((skin) => {
      const skinName = skin.name;

      const listItem = document.createElement('li');
      listItem.textContent = skinName;

      containsList.appendChild(listItem);
    });

    modalContent.innerHTML = '';
    modalContent.appendChild(containsList);
  } else {
    modalContent.innerHTML = 'No skins found in this case.';
  }

  modal.style.display = 'block';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Load cases on page load
window.onload = async function () {
  try {
    const cases = await fetchCases();
    displayCases(cases);
  } catch (error) {
    console.error('Error loading cases:', error);
  }
};


function filterDataCases() {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();

  // Filter the cases based on the search query
  const casesContainer = document.getElementById('casesContainer');
  const caseElements = casesContainer.getElementsByClassName('case');

  Array.from(caseElements).forEach((caseElement) => {
    const caseName = caseElement.getElementsByTagName('p')[0];
    if (caseName.textContent.toLowerCase().includes(searchQuery)) {
      caseElement.style.display = 'block';
    } else {
      caseElement.style.display = 'none';
    }
  });
}
