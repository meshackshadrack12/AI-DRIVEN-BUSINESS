document.addEventListener('DOMContentLoaded', () => {
  // Only run if we are on the dashboard
  if (!document.getElementById('map')) return;

  // 1. Initialize Map
  window.RanchMap.init('map', window.LivestockData.baseLat, window.LivestockData.baseLng);

  // 2. Generate Initial Data
  let herd = window.LivestockData.generateInitialHerd(25); // 25 animals
  
  // 3. Render Initial State
  updateDashboard(herd);

  // 4. Start Simulation Loop
  window.LivestockData.simulateMovement((updatedHerd) => {
    updateDashboard(updatedHerd);
  });

  function updateDashboard(data) {
    // Update Map Markers
    window.RanchMap.updateMarkers(data);

    // Update Stats
    const totalCount = data.length;
    const healthyCount = data.filter(a => a.status === 'Healthy').length;
    const alertCount = totalCount - healthyCount;

    document.getElementById('totalCount').innerText = totalCount;
    document.getElementById('healthyCount').innerText = healthyCount;
    document.getElementById('alertCount').innerText = alertCount;

    // Render List
    const listContainer = document.getElementById('livestockListContainer');
    listContainer.innerHTML = '';

    // Sort: Alerts first
    const sortedData = [...data].sort((a, b) => {
      if (a.status === 'Alert' && b.status === 'Healthy') return -1;
      if (a.status === 'Healthy' && b.status === 'Alert') return 1;
      return 0;
    });

    sortedData.forEach(animal => {
      const statusClass = animal.status === 'Healthy' ? 'status-healthy' : 'status-alert';
      const timeString = new Date(animal.lastActive).toLocaleTimeString();
      
      const cardHtml = `
        <div class="livestock-card">
          <div class="card-header">
            <span style="font-weight: 600;">${animal.name}</span>
            <span class="status-badge ${statusClass}">${animal.status}</span>
          </div>
          <div class="card-header" style="margin-bottom: 0;">
            <span class="tag-id">${animal.id}</span>
          </div>
          <div class="card-details" style="margin-top: 0.5rem;">
            Activity: ${animal.movementStatus}<br>
            Last seen: ${timeString}
          </div>
        </div>
      `;
      listContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
  }
});
