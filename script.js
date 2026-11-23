const tooltip = document.getElementById('tooltip');
const expandableCard = document.querySelector('.expandable-card');
const summary = expandableCard.querySelector('summary');
// Tooltip hover logic
document.querySelectorAll('.resident-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const name = item.getAttribute('data-name');
        const description = item.getAttribute('data-description');
        const url = item.getAttribute('data-url');
        tooltip.innerHTML = `
            <div class="tooltip-name">${name}</div>
            ${description ? `<div class="tooltip-description">${description}</div>` : ''}
        ${url ? `<div class="tooltip-url">${url}</div>` : ''}
        ${url ? '<div class="tooltip-hint">Нажмите, чтобы открыть сайт</div>' : ''}
        `;
        const rect = item.getBoundingClientRect();
        let top = rect.bottom + 10;
        let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
        // Adjust if tooltip would go off-screen
        if (left < 10) left = 10;
        if (left + tooltip.offsetWidth > window.innerWidth - 10) {
            left = window.innerWidth - tooltip.offsetWidth - 10;
        }
        if (top + tooltip.offsetHeight > window.innerHeight) {
            top = rect.top - tooltip.offsetHeight - 10;
        }
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.classList.add('visible');
    });
    item.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
    // Click to open URL
    item.addEventListener('click', (e) => {
        const url = item.getAttribute('data-url');
        if (url && url.trim() !== '') {
            window.open(url, '_blank');
        }
    });
});
summary.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        expandableCard.open = !expandableCard.open;
    }
});
document.querySelectorAll('.stat-row').forEach(row => {
    row.addEventListener('mouseenter', () => { row.style.transform = 'translateX(4px)'; });
    row.addEventListener('mouseleave', () => { row.style.transform = 'translateX(0)'; });
});
