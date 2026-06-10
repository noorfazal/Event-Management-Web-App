let events = [
    { id: 1, name: "Startup Weekend", date: "2026-06-20", description: "3 days of networking and pitching ideas." },
    { id: 2, name: "AI Summit", date: "2026-07-10", description: "Latest in Artificial Intelligence." },
    { id: 3, name: "Music Festival", date: "2025-12-05", description: "Annual classical music gala." },
    { id: 4, name: "Web Dev Hackathon", date: "2026-08-01", description: "24 hours coding challenge." },
    { id: 5, name: "Art Exhibition", date: "2025-11-18", description: "Modern art showcase." }
];
let nextId = 6;
function isPast(dateStr) {
    return new Date(dateStr) < new Date();
}
function sortEvents(eventsArray) {
    return [...eventsArray].sort((a, b) => new Date(a.date) - new Date(b.date));
}
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}
function renderEvents() {
    const container = document.getElementById('eventsContainer');
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    let filtered = events.filter(event => 
        event.name.toLowerCase().includes(searchQuery) || 
        event.date.includes(searchQuery)
    );
    filtered = sortEvents(filtered);
    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:50px;">📭 No events found. Add a new event!</div>';
        return;
    }
    let html = '';
    filtered.forEach(event => {
        const pastClass = isPast(event.date) ? 'past' : '';
        const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        }); 
        html += `
            <div class="event-card ${pastClass}">
                <h3>🎉 ${escapeHtml(event.name)}</h3>
                <div class="date">📅 ${formattedDate}</div>
                <p>${escapeHtml(event.description)}</p>
                <button class="delete-btn" onclick="deleteEvent(${event.id})">🗑 Delete</button>
            </div>
        `;
    });   
    container.innerHTML = html;
}
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(event => event.id !== id);
        renderEvents();
    }
}
function addEvent() {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    const desc = document.getElementById('eventDesc').value.trim();
    const warning = document.getElementById('warningMsg');
    if (!name || !date || !desc) {
        warning.style.display = 'block';
        setTimeout(() => { warning.style.display = 'none'; }, 2500);
        return;
    }
    events.push({
        id: nextId++,
        name: name,
        date: date,
        description: desc
    });
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventDesc').value = '';
    renderEvents();
    alert('✅ Event "' + name + '" added successfully!');
}
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function() {
        renderEvents();
    });
}
function init() {
    renderEvents();
    setupSearch();
    document.getElementById('addBtn').addEventListener('click', addEvent);
}
init();