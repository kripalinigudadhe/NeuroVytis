// ========== CHART RENDERING ==========

function initCharts() {
    // Trend Chart
    const trendChart = document.getElementById('trendChart');
    if (trendChart) {
        drawTrendChart(trendChart);
    }
    
    // Region Chart
    const regionChart = document.getElementById('regionChart');
    if (regionChart) {
        drawRegionChart(regionChart);
    }
}

function drawTrendChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    ctx.fillStyle = 'rgba(39, 70, 255, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    // Sample data
    const data = [65, 72, 68, 78, 82, 75, 85, 88, 90, 92];
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'];
    
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 10; i++) {
        const y = padding + (graphHeight / 10) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw line chart
    ctx.strokeStyle = 'url(#gradient)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 194, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(46, 75, 255, 0.3)');
    ctx.strokeStyle = gradient;
    
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (graphWidth / (data.length - 1)) * index;
        const y = height - padding - (value / 100) * graphHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#00C2FF';
    data.forEach((value, index) => {
        const x = padding + (graphWidth / (data.length - 1)) * index;
        const y = height - padding - (value / 100) * graphHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#6B7A99';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
        const x = padding + (graphWidth / (labels.length - 1)) * index;
        ctx.fillText(label, x, height - padding + 20);
    });
}

function drawRegionChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    ctx.fillStyle = 'rgba(39, 70, 255, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    // Sample brain regions data
    const regions = [
        { name: 'Hippocampus', value: 85, color: '#00C2FF' },
        { name: 'Prefrontal', value: 78, color: '#2E4BFF' },
        { name: 'Temporal', value: 92, color: '#7A1FFF' },
        { name: 'Parietal', value: 71, color: '#FFB020' }
    ];
    
    const barHeight = 30;
    const spacing = 15;
    const padding = 40;
    const maxWidth = width - padding * 2;
    
    regions.forEach((region, index) => {
        const y = padding + (index * (barHeight + spacing));
        const barWidth = (region.value / 100) * maxWidth;
        
        // Draw bar
        const gradient = ctx.createLinearGradient(padding, y, padding + barWidth, y);
        gradient.addColorStop(0, region.color);
        gradient.addColorStop(1, region.color + '80');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(padding, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#0F1724';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(region.name, padding - 10, y + 20);
        
        // Draw value
        ctx.fillStyle = '#00C2FF';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(region.value + '%', padding + barWidth + 10, y + 20);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    console.log('[v0] Charts initialized');
});
