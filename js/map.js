// Map Handler using Leaflet
window.RanchMap = {
  map: null,
  markers: {},

  init: function(containerId, centerLat, centerLng) {
    // Initialize map
    this.map = L.map(containerId).setView([centerLat, centerLng], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  },

  updateMarkers: function(herdData) {
    herdData.forEach(animal => {
      if (this.markers[animal.id]) {
        // Update existing marker position
        this.markers[animal.id].setLatLng([animal.lat, animal.lng]);
        
        // Update icon color based on status
        const color = animal.status === 'Healthy' ? '#16A34A' : '#DC2626';
        const iconHtml = `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`;
        
        this.markers[animal.id].setIcon(L.divIcon({
          className: 'custom-div-icon',
          html: iconHtml,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        }));
      } else {
        // Create new marker
        const color = animal.status === 'Healthy' ? '#16A34A' : '#DC2626';
        const iconHtml = `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`;
        
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: iconHtml,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker([animal.lat, animal.lng], { icon: icon }).addTo(this.map);
        marker.bindPopup(`<b>${animal.name}</b><br>${animal.id}<br>Status: ${animal.status}`);
        
        this.markers[animal.id] = marker;
      }
    });
  }
};
