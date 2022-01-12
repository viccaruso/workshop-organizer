import { checkAuth, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const workshopsContainerDiv = document.querySelector('#workshops-container');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async() => {
    await displayWorkshops();
    
});

async function displayWorkshops() {
    const workshops = await getWorkshops();
    console.log(workshops);
    
    while (workshopsContainerDiv.firstChild) {
        workshopsContainerDiv.firstChild.remove();
    }
    for (let workshop of workshops) {
        const workshopDivEl = document.createElement('div');
        const titleEl = document.createElement('h2');
        const desctiptionEl = document.createElement('p');
        const participantsEl = document.createElement('p');

        titleEl.textContent = workshop.name;
        desctiptionEl.textContent = workshop.description;
        
        for (let participant in workshop.participants) {
            participantsEl.textContent += `${participant}, `;
        }
        
        workshopDivEl.append(titleEl, desctiptionEl, participantsEl);

        workshopsContainerDiv.append(workshopDivEl);
    }
}

