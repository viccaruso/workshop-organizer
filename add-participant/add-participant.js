import { checkAuth, createParticipant, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const dropdown = document.querySelector('select');
const form = document.querySelector('form');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async() => {
    const workshops = await getWorkshops();
    for (let workshop of workshops) {
        const optionEl = document.createElement('option');
        optionEl.value = workshop.id;
        optionEl.textContent = workshop.name;
        dropdown.append(optionEl);
    }
    console.log(form);
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const workshop_id = data.get('workshop_id');

    const participant = {
        name: name,
        workshop_id: workshop_id
    };

    await createParticipant(participant);

    form.reset();
});