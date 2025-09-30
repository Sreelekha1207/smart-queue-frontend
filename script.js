// Store tokens in localStorage so queue persists
let queue = JSON.parse(localStorage.getItem('queue')) || [];

// Update queue display
function updateQueueDisplay() {
    const queueDisplay = document.getElementById('queueDisplay');
    if (!queueDisplay) return;
    queueDisplay.innerHTML = '';
    queue.forEach((person, index) => {
        const div = document.createElement('div');
        div.classList.add('queue-card');
        if (person.tokenType === 'Emergency') div.classList.add('emergency');

        div.innerHTML = `
            <strong>${index + 1}. ${person.name}</strong> (${person.tokenType})<br>
            State: ${person.state} | Hospital: ${person.hospital} | Doctor: ${person.doctor}<br>
            ${index === 0 ? '<strong>Now Serving</strong>' : 'Est. Wait: ' + (index * 5) + ' min'}
        `;

        queueDisplay.appendChild(div);
    });
}

// Handle booking form
const tokenForm = document.getElementById('tokenForm');
if (tokenForm) {
    tokenForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const state = document.getElementById('state').value.trim();
        const hospital = document.getElementById('hospital').value.trim();
        const doctor = document.getElementById('doctor').value.trim();
        const tokenType = document.getElementById('tokenType').value;

        if (!name || !state || !hospital || !doctor) return;

        const newToken = { name, state, hospital, doctor, tokenType };
        queue.push(newToken);
        localStorage.setItem('queue', JSON.stringify(queue));

        document.getElementById('confirmation').textContent = `Token booked successfully! Your position: ${queue.length}. Est. Wait: ${(queue.length-1)*5} min`;

        tokenForm.reset();
    });
}

// Display queue on queue.html
updateQueueDisplay();