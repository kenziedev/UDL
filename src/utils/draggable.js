export function makePanelDraggable(panel) {
    const header = panel.querySelector('.panel-header');
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = panel.offsetLeft || 50;
    let yOffset = panel.offsetTop || 50;

    function setTranslate(xPos, yPos) {
        const panelWidth = panel.offsetWidth;
        const panelHeight = panel.offsetHeight;
        const headerHeight = header.offsetHeight;

        if (xPos < 0) xPos = 0;
        if (xPos > window.innerWidth - panelWidth) xPos = window.innerWidth - panelWidth;
        if (yPos < 0) yPos = 0;
        if (yPos > window.innerHeight - headerHeight) yPos = window.innerHeight - headerHeight;

        xOffset = xPos;
        yOffset = yPos;
        panel.style.left = `${xPos}px`;
        panel.style.top = `${yPos}px`;
    }

    function dragStart(e) {
        if (e.target.closest('.panel-btn')) return;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = true;
        e.preventDefault();
    }

    function dragEnd() {
        isDragging = false;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        setTranslate(currentX, currentY);
    }

    panel.style.left = panel.style.left || '50px';
    panel.style.top = panel.style.top || '50px';

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    window.addEventListener('resize', () => {
        setTranslate(xOffset, yOffset);
    });
}
