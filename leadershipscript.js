document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle with null checks
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                body.classList.remove('menu-active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Add fade-in effect when page loads
    document.body?.classList.add('page-transition');

    // Initialize typing animation with check
    if (typeof Typed !== 'undefined' && document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: [
                'a Visionary Leader',
                'a Servant Leader',
                'a Community Builder',
                'a Volunteer Coordinator',
                'a Youth Mentor',
                'a Public Event Strategist'
            ],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true
        });
    }

    // Update the radar chart initialization to handle theme changes
    const updateChartColors = (isLightMode) => {
    const gridColor = isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
    const pointLabelColor = isLightMode ? '#333' : '#fff';
    const legendLabelColor = isLightMode ? '#333' : '#fff';
    const borderColor = 'rgba(138, 43, 226, 1)';
    const pointColor = 'rgba(138, 43, 226, 1)';
    const tickColor = isLightMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
    const aspirationBorderColor = isLightMode ? 'rgba(0, 128, 0, 1)' : 'rgba(46, 204, 113, 0.5)';
const aspirationBgColor = isLightMode ? 'rgba(0, 128, 0, 0.15)' : 'rgba(46, 204, 113, 0.1)';
    
    if (radarChart) {
        radarChart.options.scales.r.angleLines.color = gridColor;
        radarChart.options.scales.r.grid.color = gridColor;
        radarChart.options.scales.r.pointLabels.color = pointLabelColor;
        radarChart.options.scales.r.ticks.color = tickColor;
        radarChart.options.plugins.legend.labels.color = legendLabelColor;
        
        // Update main dataset colors
        radarChart.data.datasets[0].borderColor = borderColor;
        radarChart.data.datasets[0].pointBackgroundColor = pointColor;
        radarChart.data.datasets[0].backgroundColor = 'rgba(138, 43, 226, 0.2)';
        
        // Update aspiration dataset colors
        radarChart.data.datasets[1].borderColor = aspirationBorderColor;
        radarChart.data.datasets[1].backgroundColor = aspirationBgColor;
        
        radarChart.update();
    }
};

    // Initialize radar chart with theme-aware colors
    let radarChart;
const ctx = document.getElementById('radarChart');
if (ctx && typeof Chart !== 'undefined') {
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Strategic Vision', 
                'Team Motivation', 
                'Decision Making', 
                'Conflict Resolution', 
                'Event Management', 
                'Communication'
            ],
            datasets: [{
                label: 'Leadership Competency',
                data: [92, 90, 88, 85, 90, 93],
                backgroundColor: 'rgba(58, 83, 155, 0.2)',  // Professional blue
                borderColor: 'rgba(58, 83, 155, 1)',       // Solid blue
                borderWidth: 2,
                pointBackgroundColor: 'rgba(58, 83, 155, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            },
            {
                label: 'Growth Areas',
                data: [95, 95, 90, 90, 95, 95],
                backgroundColor: 'rgba(244, 208, 63, 0.1)',  // Gold/yellow for growth
                borderColor: 'rgba(244, 208, 63, 0.5)',     // Gold border
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    suggestedMin: 50,
                    suggestedMax: 100,
                    pointLabels: {
                        color: '#fff',
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    },
                    ticks: {
                        display: true,
                        stepSize: 10,
                        backdropColor: 'transparent',
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.  // Smoother curves
                }
            }
        }
    });

        // Initial color setup based on current mode
        updateChartColors(document.documentElement.classList.contains('light-mode'));
    }

    // Initialize form validation with checks
    // Initialize form validation with EmailJS integration
const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;

                const name = this.elements['name'];
                const email = this.elements['email'];
                const subject = this.elements['subject'];
                const message = this.elements['message'];

                // Reset errors
                document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('error'));
                
                // Name validation
                if (!name?.value.trim()) {
                    showError(name, 'Name is required');
                    isValid = false;
                }

                // Email validation
                if (!email?.value.trim()) {
                    showError(email, 'Email is required');
                    isValid = false;
                } else if (!isValidEmail(email.value)) {
                    showError(email, 'Please enter a valid email');
                    isValid = false;
                }

                // Subject validation
                if (!subject?.value.trim()) {
                    showError(subject, 'Subject is required');
                    isValid = false;
                }

                // Message validation
                if (!message?.value.trim()) {
                    showError(message, 'Message is required');
                    isValid = false;
                } else if (message.value.trim().length < 20) {
                    showError(message, 'Message should be at least 20 characters');
                    isValid = false;
                }

                if (isValid) {
                    const submitBtn = this.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        const btnText = submitBtn.querySelector('.btn-text');
                        if (btnText) btnText.textContent = 'Sending...';
                        
                        // Prepare the email parameters
                        const templateParams = {
                            from_name: name.value.trim(),
                            from_email: email.value.trim(),
                            subject: subject.value.trim(),
                            message: message.value.trim()
                        };

                        // Send the email using EmailJS
                        emailjs.send('service_hn7ht0q', 'template_1ijyaht', templateParams)
                            .then(() => {
                                // Success message
                                if (btnText) btnText.textContent = 'Sent Successfully';
                                this.reset();
                                
                                const successMsg = document.createElement('div');
                                successMsg.className = 'form-success animate__animated animate__fadeIn';
                                successMsg.innerHTML = `
                                    <i class="fas fa-check-circle"></i>
                                    <p>Thank you! Your message has been sent successfully.</p>
                                `;
                                this.parentNode.insertBefore(successMsg, this.nextSibling);
                                
                                setTimeout(() => {
                                    submitBtn.disabled = false;
                                    if (btnText) btnText.textContent = 'Send Message';
                                }, 3000);
                            }, (error) => {
                                console.error('Failed to send message:', error);
                                alert('Failed to send message. Please try again later.');
                                submitBtn.disabled = false;
                                if (btnText) btnText.textContent = 'Send Message';
                            });
                    }
                }
            });

            function showError(field, message) {
                if (!field) return;
                const errorElement = field.parentNode?.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = message;
                    field.classList.add('error');
                }
            }

            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
        }

    // Initialize project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                projectCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) 
                        ? 'block' 
                        : 'none';
                    if (card.style.display === 'block') {
                        card.classList.add('animate__animated', 'animate__fadeIn');
                    }
                });
            });
        });
    }

    // FIXED: Initialize scroll animations with proper hiding and showing
    // First, hide all animatable elements initially
    const animatableElements = document.querySelectorAll(
        '.timeline-content, .project-card, .certificate-card, .skill-category'
    );
    
    // Hide elements initially by setting opacity to 0
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    // Create intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset styles and add animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add animation classes
                if (!entry.target.classList.contains('animate__animated')) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
    });

    // Check which elements are already in viewport and handle them
    animatableElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (isVisible) {
            // Show immediately without animation for elements in viewport
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.classList.add('animate__animated', 'animate__fadeInUp');
        } else {
            // Observe elements not in viewport
            observer.observe(el);
        }
    });

    // Initialize dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.remove('dark-mode');
                document.documentElement.classList.add('light-mode');
                localStorage.setItem('colorMode', 'light');
                updateChartColors(true);
            } else {
                document.body.classList.add('dark-mode');
                document.documentElement.classList.remove('light-mode');
                localStorage.setItem('colorMode', 'dark');
                updateChartColors(false);
            }
        });

        // Check for saved preference
        const savedMode = localStorage.getItem('colorMode');
        if (savedMode === 'light') {
            document.body.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            darkModeToggle.checked = true;
            updateChartColors(true);
        } else {
            updateChartColors(false);
        }
    }

    // Initialize achievement badges tooltips
    document.querySelectorAll('.badge[data-tooltip]').forEach(badge => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = badge.getAttribute('data-tooltip');
        badge.appendChild(tooltip);
        
        badge.addEventListener('mouseenter', () => {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });
        
        badge.addEventListener('mouseleave', () => {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
    });

    // Smooth scrolling with header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize skill bars animation
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-out';
            }, 100);
        }
    });

    // Initialize testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 1) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        showTestimonial(currentTestimonial);
        
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
});