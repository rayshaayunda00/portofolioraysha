/**
 * ==============================================================================
 * PORTOFOLIO RAYSHA AYUNDA PUTRI DIESTA — JAVASCRIPT
 * Fitur: Dark/Light Mode, Typing Effect, Scroll Reveal,
 *        Navbar Scrollspy, Mobile Drawer Accessible, dan Honest Contact Form
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Progressive Enhancement: Tandai bahwa JS aktif
  document.documentElement.classList.add('js-ready');

  // Deteksi preferensi user: prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     2. PENGELOLAAN TEMA GELAP / TERANG (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Baca tema tersimpan atau gunakan preferensi sistem OS
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Perbarui meta theme-color untuk browser seluler
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#ffffff' : '#0b1120');
    }
  };

  // Inisialisasi tema saat load
  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Dengarkan perubahan preferensi OS jika user belum memilih secara manual
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  /* ==========================================================================
     3. NAVBAR SCROLL EFFECT & MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenuWrapper = document.getElementById('nav-menu-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');

  // Efek transisi navbar saat scrolling
  let lastScrollY = window.scrollY;
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Panggil sekali saat start

  // Toggle Menu Mobile
  const toggleMobileMenu = (forceClose = false) => {
    if (!hamburger || !navMenuWrapper) return;
    
    const isOpen = forceClose ? false : !navMenuWrapper.classList.contains('active');
    
    navMenuWrapper.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Tutup menu saat klik salah satu navigasi link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Tutup menu saat klik area luar menu
  document.addEventListener('click', (e) => {
    if (navMenuWrapper && navMenuWrapper.classList.contains('active')) {
      if (!navMenuWrapper.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMobileMenu(true);
      }
    }
  });

  // Tutup menu saat menekan tombol Escape (Keyboard Accessibility)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenuWrapper && navMenuWrapper.classList.contains('active')) {
      toggleMobileMenu(true);
      hamburger.focus();
    }
  });

  /* ==========================================================================
     4. NAVBAR ACTIVE LINK HIGHLIGHT (SCROLLSPY MENGGUNAKAN INTERSECTION OBSERVER)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ==========================================================================
     5. HERO TYPING EFFECT
     ========================================================================== */
  const typingTarget = document.getElementById('typing-text');
  if (typingTarget) {
    const roles = [
      'Laravel Web Development',
      'Livewire & Tailwind CSS',
      'Sistem Informasi Berbasis Web',
      'RESTful API & Database MySQL'
    ];
    
    if (prefersReducedMotion) {
      typingTarget.textContent = 'Laravel Web Development';
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 90;

      const typeLoop = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
          typingTarget.textContent = currentRole.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 45;
        } else {
          typingTarget.textContent = currentRole.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
          // Jeda sejenak setelah selesai mengetik satu kata
          typingSpeed = 1600;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          typingSpeed = 400;
        }

        setTimeout(typeLoop, typingSpeed);
      };

      typeLoop();
    }
  }

  /* ==========================================================================
     6. DATA & RENDER SERTIFIKASI + FILTER + LIGHTBOX MODAL
     ========================================================================== */
  const sertifikat = [
    { judul: "English Proficiency Test (TOEFL)", penerbit: "PT. DailyCipta Dwipa", tanggal: "September 2026", kategori: "Bahasa", image: "images/sertifikat/toefl.jpg", gambar: "images/sertifikat/toefl.jpg", pdf: "files/sertifikat/toefl.pdf", linkKredensial: "" },
    { judul: "Career in Website Development", penerbit: "MySkill", tanggal: "29 September 2026", kategori: "Web", image: "images/sertifikat/career-in-website-development.jpg", gambar: "images/sertifikat/career-in-website-development.jpg", pdf: "files/sertifikat/career-in-website-development.pdf", linkKredensial: "" },
    { judul: "Assessing Marketing Materials", penerbit: "MySkill", tanggal: "28 September 2026", kategori: "Marketing", image: "images/sertifikat/assessing-marketing-materials.jpg", gambar: "images/sertifikat/assessing-marketing-materials.jpg", pdf: "files/sertifikat/assessing-marketing-materials.pdf", linkKredensial: "" },
    { judul: "Brand Positioning Introduction", penerbit: "MySkill", tanggal: "28 September 2026", kategori: "Marketing", image: "images/sertifikat/brand-positioning-introduction.jpg", gambar: "images/sertifikat/brand-positioning-introduction.jpg", pdf: "files/sertifikat/brand-positioning-introduction.pdf", linkKredensial: "" },
    { judul: "Branding Introduction", penerbit: "MySkill", tanggal: "28 September 2026", kategori: "Marketing", image: "images/sertifikat/branding-introduction.jpg", gambar: "images/sertifikat/branding-introduction.jpg", pdf: "files/sertifikat/branding-introduction.pdf", linkKredensial: "" },
    { judul: "Marketing Introduction", penerbit: "MySkill", tanggal: "28 September 2026", kategori: "Marketing", image: "images/sertifikat/marketing-introduction.jpg", gambar: "images/sertifikat/marketing-introduction.jpg", pdf: "files/sertifikat/marketing-introduction.pdf", linkKredensial: "" },
    { judul: "Sertifikat Magang: Junior Data Analyst", penerbit: "PT Digitama Sinergi Indonesia", tanggal: "Juni 2026", kategori: "Magang", image: "images/sertifikat/sertifikat-magang-digitama.jpg", gambar: "images/sertifikat/sertifikat-magang-digitama.jpg", pdf: "files/sertifikat/sertifikat-magang-digitama.pdf", linkKredensial: "" },
    { judul: "NDG Linux Essentials", penerbit: "Cisco Networking Academy", tanggal: "12 Juli 2024", kategori: "Linux", image: "images/sertifikat/ndg-linux-essentials.jpg", gambar: "images/sertifikat/ndg-linux-essentials.jpg", pdf: "files/sertifikat/ndg-linux-essentials.pdf", linkKredensial: "" },
    { judul: "Database Programming with SQL – Final Exam", penerbit: "Oracle Academy", tanggal: "4 Juli 2024", kategori: "Database", image: "images/sertifikat/database-programming-final-exam.jpg", gambar: "images/sertifikat/database-programming-final-exam.jpg", pdf: "files/sertifikat/database-programming-final-exam.pdf", linkKredensial: "" },
    { judul: "Database Programming with SQL", penerbit: "Oracle Academy", tanggal: "4 Juli 2024", kategori: "Database", image: "images/sertifikat/database-programming.jpg", gambar: "images/sertifikat/database-programming.jpg", pdf: "files/sertifikat/database-programming.pdf", linkKredensial: "" },
    { judul: "Database Foundations – Final Exam", penerbit: "Oracle Academy", tanggal: "27 Juni 2024", kategori: "Database", image: "images/sertifikat/database-foundations-final-exam.jpg", gambar: "images/sertifikat/database-foundations-final-exam.jpg", pdf: "files/sertifikat/database-foundations-final-exam.pdf", linkKredensial: "" },
    { judul: "Database Foundations", penerbit: "Oracle Academy", tanggal: "26 Juni 2024", kategori: "Database", image: "images/sertifikat/database-foundations.jpg", gambar: "images/sertifikat/database-foundations.jpg", pdf: "files/sertifikat/database-foundations.pdf", linkKredensial: "" },
    { judul: "Java Programming – Final Exam", penerbit: "Oracle Academy", tanggal: "12 Juni 2024", kategori: "Java", image: "images/sertifikat/java-programming-final-exam.jpg", gambar: "images/sertifikat/java-programming-final-exam.jpg", pdf: "files/sertifikat/java-programming-final-exam.pdf", linkKredensial: "" },
    { judul: "Java Programming", penerbit: "Oracle Academy", tanggal: "12 Juni 2024", kategori: "Java", image: "images/sertifikat/java-programming.jpg", gambar: "images/sertifikat/java-programming.jpg", pdf: "files/sertifikat/java-programming.pdf", linkKredensial: "" },
    { judul: "Java Fundamentals – Final Exam", penerbit: "Oracle Academy", tanggal: "21 April 2024", kategori: "Java", image: "images/sertifikat/java-fundamentals-final-exam.jpg", gambar: "images/sertifikat/java-fundamentals-final-exam.jpg", pdf: "files/sertifikat/java-fundamentals-final-exam.pdf", linkKredensial: "" },
    { judul: "Java Fundamentals", penerbit: "Oracle Academy", tanggal: "21 April 2024", kategori: "Java", image: "images/sertifikat/java-fundamentals.jpg", gambar: "images/sertifikat/java-fundamentals.jpg", pdf: "files/sertifikat/java-fundamentals.pdf", linkKredensial: "" }
  ];

  // State Filter & Pagination
  let activeFilter = 'all';
  let isCertExpanded = false;
  const INITIAL_CERT_LIMIT = 8;

  // DOM Elements
  const certGrid = document.getElementById('certifications-grid');
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certToggleWrapper = document.getElementById('cert-toggle-wrapper');
  const certToggleBtn = document.getElementById('cert-toggle-btn');
  const certToggleText = document.getElementById('cert-toggle-text');

  // Lightbox Modal Elements & State
  const certLightbox = document.getElementById('cert-lightbox');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxFallback = document.getElementById('lightbox-fallback');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxIssuer = document.getElementById('lightbox-issuer');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxPdfBtn = document.getElementById('lightbox-pdf-btn');
  const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
  const lightboxCredLink = document.getElementById('lightbox-cred-link');

  let currentFilteredList = [];
  let currentLightboxIndex = 0;
  let lastTriggerElement = null;

  // Dapatkan daftar sertifikat sesuai filter yang aktif
  const getFilteredCertificates = () => {
    if (activeFilter === 'all') {
      return sertifikat;
    }
    return sertifikat.filter((c) => c.kategori.toLowerCase() === activeFilter.toLowerCase());
  };

  const updateLightboxContent = () => {
    const cert = currentFilteredList[currentLightboxIndex];
    if (!cert) return;

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} DARI ${currentFilteredList.length}`;
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = cert.judul;
    }
    if (lightboxIssuer) {
      lightboxIssuer.innerHTML = `<i class="fas fa-building" aria-hidden="true"></i> <span>${cert.penerbit}</span>`;
    }
    if (lightboxDate) {
      lightboxDate.innerHTML = `<i class="fas fa-calendar-alt" aria-hidden="true"></i> <span>${cert.tanggal}</span>`;
    }

    const certImgSrc = cert.image || cert.gambar;
    if (lightboxImg && lightboxFallback) {
      lightboxImg.style.display = 'block';
      lightboxFallback.style.display = 'none';
      lightboxImg.src = certImgSrc;
      lightboxImg.alt = `Sertifikat ${cert.judul} dari ${cert.penerbit}`;

      lightboxImg.onerror = () => {
        lightboxImg.style.display = 'none';
        lightboxFallback.style.display = 'flex';
      };

      if (lightboxImg.complete && lightboxImg.naturalHeight === 0 && certImgSrc) {
        lightboxImg.style.display = 'none';
        lightboxFallback.style.display = 'flex';
      }
    }

    // Kontrol Navigasi Tombol Panah (disable jika hanya 1 sertifikat pada filter aktif)
    const hasMultiple = currentFilteredList.length > 1;
    if (lightboxPrevBtn) {
      lightboxPrevBtn.style.opacity = hasMultiple ? '1' : '0.35';
      lightboxPrevBtn.style.cursor = hasMultiple ? 'pointer' : 'default';
      lightboxPrevBtn.setAttribute('aria-disabled', hasMultiple ? 'false' : 'true');
    }
    if (lightboxNextBtn) {
      lightboxNextBtn.style.opacity = hasMultiple ? '1' : '0.35';
      lightboxNextBtn.style.cursor = hasMultiple ? 'pointer' : 'default';
      lightboxNextBtn.setAttribute('aria-disabled', hasMultiple ? 'false' : 'true');
    }

    // Kontrol Tombol PDF (Buka di Tab Baru) & Unduh
    if (cert.pdf && cert.pdf.trim().length > 0) {
      if (lightboxPdfBtn) {
        lightboxPdfBtn.style.display = 'inline-flex';
        lightboxPdfBtn.href = cert.pdf;
        lightboxPdfBtn.target = '_blank';
        lightboxPdfBtn.rel = 'noopener noreferrer';
        lightboxPdfBtn.setAttribute('aria-label', `Buka PDF sertifikat ${cert.judul} di tab baru`);
      }
      if (lightboxDownloadBtn) {
        lightboxDownloadBtn.style.display = 'inline-flex';
        lightboxDownloadBtn.href = cert.pdf;
        const cleanJudul = cert.judul.replace(/[\\/:*?"<>|]/g, '').trim();
        const cleanPenerbit = cert.penerbit.replace(/[\\/:*?"<>|]/g, '').trim();
        const downloadName = `Sertifikat - ${cleanJudul} - ${cleanPenerbit}.pdf`;
        lightboxDownloadBtn.setAttribute('download', downloadName);
        lightboxDownloadBtn.setAttribute('aria-label', `Unduh PDF sertifikat ${cert.judul}`);
      }
    } else {
      if (lightboxPdfBtn) lightboxPdfBtn.style.display = 'none';
      if (lightboxDownloadBtn) lightboxDownloadBtn.style.display = 'none';
    }

    // Kontrol Tombol Kredensial (hanya jika linkKredensial tidak kosong)
    if (lightboxCredLink) {
      if (cert.linkKredensial && cert.linkKredensial.trim().length > 0) {
        lightboxCredLink.style.display = 'inline-flex';
        lightboxCredLink.href = cert.linkKredensial;
      } else {
        lightboxCredLink.style.display = 'none';
        lightboxCredLink.removeAttribute('href');
      }
    }
  };

  const openLightbox = (index, triggerEl) => {
    if (!certLightbox) return;
    currentLightboxIndex = index;
    lastTriggerElement = triggerEl || document.activeElement;

    updateLightboxContent();

    certLightbox.classList.add('is-open');
    certLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Fokus ke tombol tutup untuk aksesibilitas keyboard
    if (lightboxCloseBtn) {
      setTimeout(() => lightboxCloseBtn.focus(), 50);
    }
  };

  const closeLightbox = () => {
    if (!certLightbox) return;

    certLightbox.classList.remove('is-open');
    certLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Kembalikan fokus ke kartu yang membuka modal
    if (lastTriggerElement && typeof lastTriggerElement.focus === 'function') {
      lastTriggerElement.focus();
    }
  };

  const nextCert = () => {
    if (currentFilteredList.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredList.length;
    updateLightboxContent();
  };

  const prevCert = () => {
    if (currentFilteredList.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
    updateLightboxContent();
  };

  // Render kartu sertifikat ke DOM berdasarkan filter dan batas tampilan
  const renderCertificates = () => {
    if (!certGrid) return;

    currentFilteredList = getFilteredCertificates();
    const visibleList = isCertExpanded ? currentFilteredList : currentFilteredList.slice(0, INITIAL_CERT_LIMIT);

    certGrid.innerHTML = '';

    visibleList.forEach((cert, index) => {
      const card = document.createElement('article');
      card.className = 'cert-card reveal';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', `Lihat sertifikat ${cert.judul} dari ${cert.penerbit}`);

      const certImgSrc = cert.image || cert.gambar;
      const certAlt = `Sertifikat ${cert.judul} dari ${cert.penerbit}`;
      const pdfBadgeHtml = cert.pdf
        ? `<span class="cert-pdf-badge" title="Tersedia Dokumen PDF"><i class="fas fa-file-pdf" aria-hidden="true"></i> PDF</span>`
        : '';

      card.innerHTML = `
        <div class="cert-thumb">
          ${pdfBadgeHtml}
          <img class="cert-img" src="${certImgSrc}" alt="${certAlt}" loading="lazy">
          <div class="cert-placeholder" style="display: none;">
            <i class="fas fa-award cert-placeholder-icon" aria-hidden="true"></i>
            <span class="cert-placeholder-label">${cert.judul}</span>
          </div>
          <div class="cert-zoom-overlay">
            <span class="cert-zoom-badge">
              <i class="fas fa-magnifying-glass-plus" aria-hidden="true"></i>
              <span>Lihat Detail</span>
            </span>
          </div>
        </div>
        <div class="cert-body">
          <h3 class="cert-title">${cert.judul}</h3>
          <p class="cert-issuer">
            <i class="fas fa-building" aria-hidden="true"></i>
            <span>${cert.penerbit}</span>
          </p>
          <p class="cert-date">
            <i class="fas fa-calendar-alt" aria-hidden="true"></i>
            <span>${cert.tanggal}</span>
          </p>
          <span class="cert-category-badge">${cert.kategori}</span>
        </div>
      `;

      // Fallback jika gambar di kartu gagal dimuat
      const cardImg = card.querySelector('.cert-img');
      const cardPlaceholder = card.querySelector('.cert-placeholder');
      if (cardImg && cardPlaceholder) {
        cardImg.onerror = () => {
          cardImg.style.display = 'none';
          cardPlaceholder.style.display = 'flex';
        };
        if (cardImg.complete && cardImg.naturalHeight === 0 && certImgSrc) {
          cardImg.style.display = 'none';
          cardPlaceholder.style.display = 'flex';
        }
      }

      // Event klik & keyboard (Enter/Space)
      card.addEventListener('click', () => openLightbox(index, card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index, card);
        }
      });

      certGrid.appendChild(card);
    });

    // Kontrol tombol "Lihat Semua" / "Tampilkan Lebih Sedikit"
    if (certToggleWrapper && certToggleText && certToggleBtn) {
      if (currentFilteredList.length > INITIAL_CERT_LIMIT) {
        certToggleWrapper.style.display = 'flex';
        if (isCertExpanded) {
          certToggleText.textContent = 'Tampilkan Lebih Sedikit';
          certToggleBtn.classList.add('is-expanded');
          certToggleBtn.setAttribute('aria-expanded', 'true');
        } else {
          certToggleText.textContent = `Lihat Semua (${currentFilteredList.length})`;
          certToggleBtn.classList.remove('is-expanded');
          certToggleBtn.setAttribute('aria-expanded', 'false');
        }
      } else {
        certToggleWrapper.style.display = 'none';
      }
    }
  };

  // Event listener tombol filter kategori
  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      activeFilter = btn.getAttribute('data-filter') || 'all';
      isCertExpanded = false; // Reset pagination ke 8 kartu saat ganti kategori
      renderCertificates();
    });
  });

  // Event listener tombol toggle "Lihat Semua"
  if (certToggleBtn) {
    certToggleBtn.addEventListener('click', () => {
      isCertExpanded = !isCertExpanded;
      renderCertificates();

      // Jika ditutup kembali, scroll halus ke atas area sertifikasi
      if (!isCertExpanded) {
        const certSection = document.getElementById('certifications');
        if (certSection) {
          certSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Inisialisasi awal render sertifikat
  renderCertificates();

  // Event listener tombol modal
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }
  if (certLightbox) {
    certLightbox.addEventListener('click', (e) => {
      if (e.target === certLightbox || e.target === lightboxOverlay) {
        closeLightbox();
      }
    });
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', nextCert);
  }
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', prevCert);
  }

  // Keyboard navigation & accessibility modal
  document.addEventListener('keydown', (e) => {
    if (!certLightbox || !certLightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextCert();
    } else if (e.key === 'ArrowLeft') {
      prevCert();
    } else if (e.key === 'Tab') {
      // Focus trapping di dalam lightbox
      const focusableElements = certLightbox.querySelectorAll('button:not([disabled]), a[href]:not([disabled])');
      if (focusableElements.length === 0) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });

  /* ==========================================================================
     6.2 MODAL DETAIL PROYEK
     ========================================================================== */
  const projectsData = [
    {
      id: 'percetakan-arjuna',
      title: 'Percetakan Arjuna',
      subtitle: 'Sistem Manajemen Order',
      category: 'Web App',
      image: 'images/percetakan-arjuna.png',
      alt: 'Tampilan sistem manajemen order Percetakan Arjuna',
      desc: 'Sistem manajemen order otomatis untuk Percetakan Arjuna yang menggantikan proses order manual sebelumnya, dibangun dengan TALL Stack.',
      features: [
        'Manajemen order dan alur pesanan otomatis untuk menggantikan pencatatan manual',
        'Upload file desain cetak mandiri dan verifikasi spesifikasi pesanan',
        'Pemantauan status pengerjaan pesanan secara real-time',
        'Integrasi autentikasi login pengguna dengan akun Google',
        'Antarmuka reaktif dan responsif dibangun dengan TALL Stack'
      ],
      tech: [
        { name: 'Laravel', icon: 'fab fa-laravel text-laravel' },
        { name: 'Livewire', icon: 'fas fa-bolt text-primary' },
        { name: 'Alpine.js', icon: 'fas fa-mountain text-secondary' },
        { name: 'Tailwind CSS', icon: 'fab fa-css3-alt text-css' }
      ],
      github: 'https://github.com/rayshaayunda00/percetakan_arjuna.git',
      demo: null
    },
    {
      id: 'sipangah',
      title: 'Sipangah',
      subtitle: 'Sistem Pengaduan Masyarakat',
      category: 'Web App',
      image: 'images/sipangah.jpg',
      alt: 'Tampilan sistem informasi pengaduan masyarakat Sipangah',
      desc: 'Sistem informasi berbasis web untuk mendigitalisasi layanan pengaduan masyarakat di Kelurahan Cupak Tangah. Memudahkan warga dalam mengirim dan melacak status laporan secara online, serta membantu admin dalam verifikasi dan tindak lanjut pengaduan.',
      features: [
        'Digitalisasi portal pengaduan masyarakat terpadu untuk warga kelurahan',
        'Formulir pengiriman laporan pengaduan online yang mudah diakses',
        'Pelacakan status penanganan laporan secara transparan dan berkala',
        'Dashboard manajemen bagi admin untuk verifikasi dan tindak lanjut laporan',
        'Keamanan sistem dan otentikasi pengguna menggunakan Laravel Breeze'
      ],
      tech: [
        { name: 'PHP', icon: 'fab fa-php text-primary' },
        { name: 'MySQL', icon: 'fas fa-database text-database' },
        { name: 'Laravel', icon: 'fab fa-laravel text-laravel' },
        { name: 'Tailwind CSS', icon: 'fab fa-css3-alt text-css' },
        { name: 'Laravel Breeze', icon: 'fas fa-shield-halved text-emerald' }
      ],
      github: 'https://github.com/rayshaayunda00/sipangah.git',
      demo: null
    }
  ];

  const projectModal = document.getElementById('project-modal');
  const projectModalCloseBtn = document.getElementById('project-modal-close');
  const projectModalOverlay = document.getElementById('project-modal-overlay');
  const projectModalImg = document.getElementById('project-modal-img');
  const projectModalBadge = document.getElementById('project-modal-badge');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalSubtitle = document.getElementById('project-modal-subtitle');
  const projectModalDesc = document.getElementById('project-modal-desc');
  const projectModalFeatures = document.getElementById('project-modal-features');
  const projectModalTech = document.getElementById('project-modal-tech');
  const projectModalActions = document.getElementById('project-modal-actions');

  let lastProjectTrigger = null;

  const openProjectModal = (index, triggerEl) => {
    const project = projectsData[index];
    if (!project || !projectModal) return;

    lastProjectTrigger = triggerEl || document.activeElement;

    if (projectModalImg) {
      projectModalImg.src = project.image;
      projectModalImg.alt = project.alt;
    }
    if (projectModalBadge) projectModalBadge.textContent = project.category;
    if (projectModalTitle) projectModalTitle.textContent = project.title;
    if (projectModalSubtitle) projectModalSubtitle.textContent = project.subtitle;
    if (projectModalDesc) projectModalDesc.textContent = project.desc;

    if (projectModalFeatures) {
      projectModalFeatures.innerHTML = project.features
        .map(f => `<li><i class="fas fa-check-circle text-primary" aria-hidden="true"></i> <span>${f}</span></li>`)
        .join('');
    }

    if (projectModalTech) {
      projectModalTech.innerHTML = project.tech
        .map(t => `<span class="tech-pill"><i class="${t.icon}"></i> ${t.name}</span>`)
        .join('');
    }

    if (projectModalActions) {
      let actionsHtml = `
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-project-github">
          <i class="fab fa-github" aria-hidden="true"></i>
          <span>Lihat di GitHub</span>
          <i class="fas fa-arrow-right btn-project-arrow" aria-hidden="true"></i>
        </a>
      `;
      if (project.demo) {
        actionsHtml += `
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
            <span>Demo</span>
          </a>
        `;
      }
      projectModalActions.innerHTML = actionsHtml;
    }

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (projectModalCloseBtn) {
      setTimeout(() => projectModalCloseBtn.focus(), 50);
    }
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastProjectTrigger && typeof lastProjectTrigger.focus === 'function') {
      lastProjectTrigger.focus();
    }
  };

  if (projectModalCloseBtn) {
    projectModalCloseBtn.addEventListener('click', closeProjectModal);
  }
  if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', closeProjectModal);
  }
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal || e.target === projectModalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Keyboard navigation & accessibility modal proyek
  document.addEventListener('keydown', (e) => {
    if (!projectModal || !projectModal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeProjectModal();
    } else if (e.key === 'Tab') {
      const focusable = projectModal.querySelectorAll('button:not([disabled]), a[href]:not([disabled])');
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Event listener pemicu buka modal pada kartu proyek
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    const index = parseInt(card.getAttribute('data-project-index'), 10) || 0;

    // Klik pada kartu membuka modal (abaikan jika yang diklik link eksternal)
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        return;
      }
      openProjectModal(index, card);
    });

    // Keyboard accessibility: Enter atau Space pada kartu
    card.addEventListener('keydown', (e) => {
      if (e.target.closest('a')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(index, card);
      }
    });

    // Tombol teks kecil "Lihat Detail"
    const detailBtn = card.querySelector('.btn-project-detail');
    if (detailBtn) {
      detailBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(index, card);
      });
    }

    // Tombol GitHub langsung membuka link tanpa membuka modal
    const githubLink = card.querySelector('.btn-project-github');
    if (githubLink) {
      githubLink.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });

  /* ==========================================================================
     6.1 KARTU PROFIL TENTANG SAYA — STATISTIK OTOMATIS & COUNT-UP ANIMATION
     ========================================================================== */
  const initProfileStats = () => {
    const profileCard = document.getElementById('about-profile-card');
    const certEl = document.getElementById('profile-stat-certs');
    const gradEl = document.getElementById('profile-stat-graduation');

    if (!profileCard || !certEl || !gradEl) return;

    // Jumlah sertifikat dihitung otomatis dari array sertifikat di script.js (saat ini 16)
    const certCount = Array.isArray(sertifikat) ? sertifikat.length : 16;
    const gradYear = 2026;

    const animateNumber = (el, target, duration = 1200) => {
      if (prefersReducedMotion) {
        el.textContent = target;
        return;
      }
      const startTime = performance.now();
      const frame = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing cubic out: 1 - Math.pow(1 - progress, 3)
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          el.textContent = target;
        }
      };
      requestAnimationFrame(frame);
    };

    let hasStarted = false;
    const startCountUp = () => {
      if (hasStarted) return;
      hasStarted = true;
      animateNumber(certEl, certCount, 1200);
      animateNumber(gradEl, gradYear, 1400);
    };

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const statsObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCountUp();
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });
      statsObserver.observe(profileCard);
    } else {
      startCountUp();
    }
  };

  initProfileStats();

  /* ==========================================================================
     7. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Jika prefers-reduced-motion aktif atau browser tidak mendukung IntersectionObserver
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     8. TOGGLE TUGAS PENGALAMAN (LIHAT SELENGKAPNYA / LEBIH SEDIKIT)
     ========================================================================== */
  const expToggleBtn = document.getElementById('experience-toggle-btn');
  const expMoreTasks = document.getElementById('experience-more-tasks');
  if (expToggleBtn && expMoreTasks) {
    expToggleBtn.addEventListener('click', () => {
      const isExpanded = expToggleBtn.getAttribute('aria-expanded') === 'true';
      const newExpanded = !isExpanded;
      expToggleBtn.setAttribute('aria-expanded', newExpanded ? 'true' : 'false');
      expToggleBtn.classList.toggle('is-expanded', newExpanded);
      expMoreTasks.classList.toggle('is-expanded', newExpanded);
      const toggleText = expToggleBtn.querySelector('.toggle-text');
      if (toggleText) {
        toggleText.textContent = newExpanded ? 'Lihat lebih sedikit' : 'Lihat selengkapnya';
      }
    });
  }

  /* ==========================================================================
     9. FORM KONTAK — VALIDASI & PENGIRIMAN TRANSPARAN
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');

    // Validasi email sederhana
    const isValidEmail = (val) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    };

    const setFieldError = (inputEl, hasError) => {
      const group = inputEl.closest('.form-group');
      if (group) {
        group.classList.toggle('has-error', hasError);
      }
    };

    // Bersihkan error saat pengguna mulai mengetik kembali
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => setFieldError(input, false));
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validasi Nama
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, true);
        isValid = false;
      }

      // Validasi Email
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        setFieldError(emailInput, true);
        isValid = false;
      }

      // Validasi Subjek
      if (!subjectInput.value.trim()) {
        setFieldError(subjectInput, true);
        isValid = false;
      }

      // Validasi Pesan
      if (!messageInput.value.trim()) {
        setFieldError(messageInput, true);
        isValid = false;
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status show-error';
          formStatus.textContent = 'Mohon periksa dan lengkapi kolom yang ditandai merah.';
        }
        return;
      }

      // Alamat email tujuan
      const targetEmail = 'rayshaayuda@gmail.com';

      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const messageBody = messageInput.value.trim();

      const fullBody = `Halo Raysha,

Nama Pengirim: ${senderName}
Email Pengirim: ${senderEmail}

Pesan:
${messageBody}

---
Dikirim melalui formulir kontak portofolio.`;

      // Buat URL mailto dengan encodeURIComponent
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(`[Portofolio] ${subject}`)}&body=${encodeURIComponent(fullBody)}`;

      // Tampilkan status yang jujur dan transparan kepada user
      if (formStatus) {
        formStatus.className = 'form-status show-info';
        formStatus.textContent = 'Membuka aplikasi email Anda untuk mengirim pesan...';
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> <span>Membuka Email...</span>';
      }

      // Buka aplikasi email
      setTimeout(() => {
        window.location.href = mailtoUrl;

        // Reset tombol dan tampilkan konfirmasi
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Kirim Pesan</span> <i class="fas fa-paper-plane" aria-hidden="true"></i>';
        }

        if (formStatus) {
          formStatus.className = 'form-status show-info';
          formStatus.textContent = 'Jika aplikasi email Anda tidak terbuka otomatis, silakan kirim langsung ke email: ' + targetEmail;
        }

        contactForm.reset();
      }, 700);
    });
  }

  /* ==========================================================================
     9. TAHUN OTOMATIS PADA FOOTER
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});