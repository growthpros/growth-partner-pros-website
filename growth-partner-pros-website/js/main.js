// Global data storage
let siteData = {};

// Load YAML data files
async function loadData() {
    try {
        const files = [
            'home.yml',
            'services.yml',
            'about.yml',
            'contact.yml',
            'settings.yml',
            'videos.yml'
        ];
        
        for (const file of files) {
            const response = await fetch(`_data/${file}`);
            const yamlText = await response.text();
            const data = jsyaml.load(yamlText);
            const key = file.replace('.yml', '');
            siteData[key] = data;
        }
        
        // Load blog posts
        await loadBlogPosts();
        
        // Populate content
        populateContent();
        
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default content if data loading fails
        populateDefaultContent();
    }
}

// Load blog posts
async function loadBlogPosts() {
    try {
        // In a real implementation, you'd scan the _posts directory
        // For now, we'll create some sample posts
        siteData.blog = [
            {
                title: "The Future of AI in Business: 5 Trends to Watch",
                date: "2025-01-15",
                author: "Caroline Hinton",
                excerpt: "Discover the key AI trends that will shape business operations in 2025 and beyond.",
                slug: "future-of-ai-in-business"
            },
            {
                title: "How to Achieve 10x Productivity with AI Tools",
                date: "2025-01-10",
                author: "Caroline Hinton",
                excerpt: "Learn the specific strategies and tools that can multiply your productivity exponentially.",
                slug: "10x-productivity-with-ai"
            },
            {
                title: "AI Strategy Implementation: A Step-by-Step Guide",
                date: "2025-01-05",
                author: "Caroline Hinton",
                excerpt: "A comprehensive guide to implementing AI strategy in your organization.",
                slug: "ai-strategy-implementation-guide"
            }
        ];
    } catch (error) {
        console.error('Error loading blog posts:', error);
        siteData.blog = [];
    }
}

// Populate content from data
function populateContent() {
    // Update page title
    if (siteData.settings && siteData.settings.site_title) {
        document.getElementById('page-title').textContent = siteData.settings.site_title;
    }
    
    // Populate home page
    if (siteData.home) {
        populateHomePage();
    }
    
    // Populate services page
    if (siteData.services) {
        populateServicesPage();
    }
    
    // Populate about page
    if (siteData.about) {
        populateAboutPage();
    }
    
    // Populate contact page
    if (siteData.contact) {
        populateContactPage();
    }
    
    // Populate blog
    if (siteData.blog) {
        populateBlogPage();
    }
    
    // Populate social links
    if (siteData.settings && siteData.settings.social) {
        populateSocialLinks();
    }
}

// Populate home page content
function populateHomePage() {
    const home = siteData.home;
    
    // Hero section
    if (home.hero) {
        document.getElementById('hero-headline').textContent = home.hero.headline;
        document.getElementById('hero-subheadline').textContent = home.hero.subheadline;
        document.getElementById('hero-description').textContent = home.hero.description;
        document.getElementById('hero-primary-btn').textContent = home.hero.primary_button;
        document.getElementById('hero-secondary-btn').textContent = home.hero.secondary_button;
    }
    
    // Value propositions
    if (home.value_props) {
        document.getElementById('value-props-title').textContent = home.value_props.title;
        
        const cardsContainer = document.getElementById('value-props-cards');
        cardsContainer.innerHTML = '';
        
        home.value_props.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'bg-white p-8 rounded-lg shadow-lg card-hover';
            cardElement.innerHTML = `
                <h3 class="text-2xl font-bold mb-4 text-navy">${card.title}</h3>
                <p class="mb-6">${card.description}</p>
                <a href="#services" class="text-coral font-bold flex items-center" onclick="showSection('services')">
                    ${card.link_text} <i class="fas fa-arrow-right ml-2"></i>
                </a>
            `;
            cardsContainer.appendChild(cardElement);
        });
    }
    
    // Results section
    if (home.results) {
        document.getElementById('results-title').textContent = home.results.title;
        document.getElementById('results-description').textContent = home.results.description;
        
        const statsContainer = document.getElementById('results-stats');
        statsContainer.innerHTML = '';
        
        home.results.stats.forEach(stat => {
            const statElement = document.createElement('div');
            statElement.className = 'text-center';
            statElement.innerHTML = `
                <div class="text-5xl font-bold gradient-text mb-4">${stat.number}</div>
                <p>${stat.description}</p>
            `;
            statsContainer.appendChild(statElement);
        });
    }
    
    // Testimonial
    if (home.testimonial) {
        document.getElementById('testimonial-quote').textContent = home.testimonial.quote;
        document.getElementById('testimonial-author').textContent = home.testimonial.author;
        document.getElementById('testimonial-btn').textContent = home.testimonial.button_text;
    }
    
    // About Caroline section
    if (home.about_caroline) {
        document.getElementById('about-caroline-title').textContent = home.about_caroline.title;
        document.getElementById('about-caroline-subtitle').textContent = home.about_caroline.subtitle;
        document.getElementById('about-caroline-description').textContent = home.about_caroline.description;
        document.getElementById('about-caroline-btn').textContent = home.about_caroline.button_text;
    }
}

// Populate services page
function populateServicesPage() {
    const services = siteData.services;
    
    document.getElementById('services-title').textContent = services.title;
    document.getElementById('services-description').textContent = services.description;
    
    const servicesContainer = document.getElementById('services-list');
    servicesContainer.innerHTML = '';
    
    services.services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'bg-white p-8 rounded-lg shadow-lg service-card';
        
        const featuresHtml = service.features.map(feature => `<li>${feature}</li>`).join('');
        
        serviceElement.innerHTML = `
            <div class="text-4xl text-teal mb-6">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-navy">${service.name}</h3>
            <p class="mb-6">${service.description}</p>
            ${service.price ? `<div class="text-xl font-bold text-coral mb-4">${service.price}</div>` : ''}
            <ul class="space-y-2 mb-6">
                ${featuresHtml}
            </ul>
            <a href="#contact" class="btn-primary" onclick="showSection('contact')">Get Started</a>
        `;
        servicesContainer.appendChild(serviceElement);
    });
}

// Populate about page
function populateAboutPage() {
    const about = siteData.about;
    
    document.getElementById('about-title').textContent = about.title;
    document.getElementById('about-description').textContent = about.description;
    
    // Convert markdown to HTML (simple implementation)
    const bioHtml = markdownToHtml(about.bio);
    document.getElementById('about-bio').innerHTML = bioHtml;
    
    // Success stories
    const storiesContainer = document.getElementById('success-stories');
    storiesContainer.innerHTML = '';
    
    about.success_stories.forEach(story => {
        const storyElement = document.createElement('div');
        storyElement.className = 'testimonial-card p-6 shadow-lg';
        storyElement.innerHTML = `
            <div class="text-2xl text-coral mb-4">"</div>
            <p class="italic mb-4">${story.quote}</p>
            <div class="font-bold">${story.author}</div>
            ${story.company ? `<div class="text-sm text-gray-600">${story.company}</div>` : ''}
        `;
        storiesContainer.appendChild(storyElement);
    });
}

// Populate contact page
function populateContactPage() {
    const contact = siteData.contact;
    
    document.getElementById('contact-title').textContent = contact.title;
    document.getElementById('contact-description').textContent = contact.description;
    document.getElementById('contact-email').textContent = contact.email;
    
    if (contact.phone) {
        document.getElementById('contact-phone').textContent = contact.phone;
        document.getElementById('contact-phone-container').style.display = 'flex';
    }
    
    // Contact form
    if (contact.contact_form) {
        document.getElementById('contact-form-title').textContent = contact.contact_form.title;
        document.getElementById('contact-form-description').textContent = contact.contact_form.description;
        document.getElementById('contact-form-submit').textContent = contact.contact_form.submit_text;
    }
    
    // Calendly integration
    if (contact.calendly_url) {
        const calendlyEmbed = document.getElementById('calendly-embed');
        calendlyEmbed.innerHTML = `
            <div class="calendly-inline-widget" 
                 data-url="${contact.calendly_url}" 
                 style="min-width:320px;height:630px;">
            </div>
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
        `;
    }
}

// Populate blog page
function populateBlogPage() {
    const blogContainer = document.getElementById('blog-posts');
    blogContainer.innerHTML = '';
    
    if (siteData.blog.length === 0) {
        blogContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <h3 class="text-2xl font-bold mb-4">Coming Soon</h3>
                <p class="text-gray-600">Blog posts will appear here once you start publishing content through the admin interface.</p>
            </div>
        `;
        return;
    }
    
    siteData.blog.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-white p-6 rounded-lg shadow-lg blog-card';
        postElement.innerHTML = `
            <div class="text-sm text-gray-500 mb-2">${formatDate(post.date)}</div>
            <h3 class="text-xl font-bold mb-3 text-navy">${post.title}</h3>
            <p class="text-gray-600 mb-4">${post.excerpt}</p>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">By ${post.author}</span>
                <a href="blog/${post.slug}.html" class="text-coral font-bold">Read More</a>
            </div>
        `;
        blogContainer.appendChild(postElement);
    });
}

// Populate social links
function populateSocialLinks() {
    const social = siteData.settings.social;
    const socialContainer = document.getElementById('social-links');
    socialContainer.innerHTML = '';
    
    if (social.linkedin) {
        socialContainer.innerHTML += `
            <a href="${social.linkedin}" class="text-white hover:text-coral transition-colors">
                <i class="fab fa-linkedin text-2xl"></i>
            </a>
        `;
    }
    
    if (social.twitter) {
        socialContainer.innerHTML += `
            <a href="${social.twitter}" class="text-white hover:text-coral transition-colors">
                <i class="fab fa-twitter text-2xl"></i>
            </a>
        `;
    }
    
    if (social.instagram) {
        socialContainer.innerHTML += `
            <a href="${social.instagram}" class="text-white hover:text-coral transition-colors">
                <i class="fab fa-instagram text-2xl"></i>
            </a>
        `;
    }
}

// Fallback content if data loading fails
function populateDefaultContent() {
    console.log('Using default content');
    // The HTML already contains default content, so nothing to do here
}

// Utility functions
function markdownToHtml(markdown) {
    // Simple markdown to HTML conversion
    return markdown
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.*)$/gim, '<p>$1</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p><li>/g, '<ul><li>')
        .replace(/<\/li><\/p>/g, '</li></ul>');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active class in navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('open');
}

function showSectionAndCloseMobileMenu(sectionId) {
    showSection(sectionId);
    toggleMobileMenu();
}

// Initialize Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

// For PDF export, make all sections visible
function showAllSectionsForPrint() {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
}

// If this is being loaded for printing, show all sections
if (window.matchMedia('print').matches) {
    showAllSectionsForPrint();
}

