import { checkAuth, deleteParticipant, getWorkshops, logout } from '../fetch-utils.js';

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
        const participantsEl = renderParticipant(workshop.workshop_participants);

        titleEl.textContent = workshop.name;
        desctiptionEl.textContent = workshop.description;

        workshopDivEl.append(titleEl, desctiptionEl, participantsEl);

        workshopsContainerDiv.append(workshopDivEl);
    }
}

export function renderParticipant(participants) {
    const participantsEl = document.createElement('div');

    for (let p of participants) {
        const participantEl = document.createElement('p');

        participantEl.classList.add('participant');
        participantEl.textContent = ` ${p.name} `;
        participantEl.addEventListener('click', async() => {
            await deleteParticipant(p.id);
            await displayWorkshops();
        });

        participantsEl.append(participantEl);
    }
    console.log(participantsEl);
    return participantsEl;
}