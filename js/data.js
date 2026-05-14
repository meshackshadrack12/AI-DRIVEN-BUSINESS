// Simulated Data Store and Generator
window.LivestockData = {
  herd: [],
  baseLat: 0.35, // Laikipia Region approximate
  baseLng: 36.8,

  generateInitialHerd: function(count = 20) {
    const names = ['Bessie', 'Daisy', 'Luna', 'Bella', 'Stella', 'Ruby', 'Rosie', 'Molly', 'Sadie', 'Chloe'];
    const statuses = ['Healthy', 'Healthy', 'Healthy', 'Healthy', 'Alert']; // 20% alert chance initially

    for (let i = 0; i < count; i++) {
      const isAlert = statuses[Math.floor(Math.random() * statuses.length)] === 'Alert';
      
      this.herd.push({
        id: `TAG-${1000 + i}`,
        name: names[Math.floor(Math.random() * names.length)],
        status: isAlert ? 'Alert' : 'Healthy',
        // Slight random offsets from base location
        lat: this.baseLat + (Math.random() - 0.5) * 0.05,
        lng: this.baseLng + (Math.random() - 0.5) * 0.05,
        lastActive: new Date().toISOString(),
        movementStatus: isAlert ? 'Abnormal' : 'Grazing'
      });
    }
    return this.herd;
  },

  simulateMovement: function(callback) {
    // Every 3 seconds, update positions slightly and randomly change status
    setInterval(() => {
      let changed = false;
      this.herd.forEach(animal => {
        // 10% chance to move significantly
        if (Math.random() > 0.9) {
          animal.lat += (Math.random() - 0.5) * 0.005;
          animal.lng += (Math.random() - 0.5) * 0.005;
          animal.lastActive = new Date().toISOString();
          changed = true;
          
          // 2% chance to trigger an alert if healthy
          if (animal.status === 'Healthy' && Math.random() > 0.98) {
            animal.status = 'Alert';
            animal.movementStatus = 'Abnormal';
          } 
          // 5% chance to recover if alert
          else if (animal.status === 'Alert' && Math.random() > 0.95) {
            animal.status = 'Healthy';
            animal.movementStatus = 'Grazing';
          }
        }
      });

      if (changed && typeof callback === 'function') {
        callback(this.herd);
      }
    }, 3000);
  }
};
