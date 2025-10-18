// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('sidebar-open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.btn-toggle-sidebar');
    const closeBtn = document.querySelector('.btn-close-sidebar');
    
    // Check if click is outside sidebar and not on toggle button
    if (!sidebar.contains(event.target) && 
        !toggleBtn.contains(event.target) && 
        !closeBtn.contains(event.target) && 
        window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        document.getElementById('mainContent').classList.remove('sidebar-open');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('sidebar-open');
    }
});

// Initialize sidebar state
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
});