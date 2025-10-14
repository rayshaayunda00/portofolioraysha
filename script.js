// Tahun otomatis
document.getElementById("year").textContent = new Date().getFullYear();

// Form kontak
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const mailto = `mailto:emailkamu@contoh.com?subject=Pesan dari ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
  window.location.href = mailto;
  
  // Reset form setelah pengiriman
  document.getElementById("name").value = '';
  document.getElementById("email").value = '';
  document.getElementById("message").value = '';
  
  // Tampilkan pesan sukses
  showNotification('Pesan berhasil dikirim!');
});

// Menu hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Ubah ikon hamburger
  if (navLinks.classList.contains('active')) {
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Tutup menu saat mengklik link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animasi scroll untuk section
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Terapkan animasi untuk section
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
  // Buat elemen notifikasi
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary);
    color: var(--dark);
    padding: 15px 25px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateX(150%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Tampilkan notifikasi
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Sembunyikan notifikasi setelah 3 detik
  setTimeout(() => {
    notification.style.transform = 'translateX(150%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Smooth scroll untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Preloader (opsional)
window.addEventListener('load', function() {
  const preloader = document.createElement('div');
  preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--dark);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
  `;
  
  preloader.innerHTML = `
    <div style="text-align: center;">
      <div style="width: 50px; height: 50px; border: 3px solid var(--dark-light); border-top: 3px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
      <p style="color: var(--text);">Memuat...</p>
    </div>
  `;
  
  document.body.appendChild(preloader);
  
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(preloader);
    }, 500);
  }, 1000);
});

// Tambahkan style untuk spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);