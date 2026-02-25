let currentCategory = 'all';
let currentSearchTerm = '';
let currentSortBy = 'name';

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('celebritiesContainer')) {
        loadCelebrities();
        initFilters();
        initSearch();
        initSort();
    }
    
    if (document.getElementById('galleryContainer')) {
        loadGallery();
        loadTimeline();
    }
    
    if (document.getElementById('quoteOfTheDay')) {
        showQuoteOfTheDay();
    }
    
    if (document.getElementById('worldMap')) {
        initWorldMap();
    }
    
    // Новые функции для коллекций
    updateCollectionsCount();
    initCollections();
    updateStats();
    
    initModal();
    initFullscreenInspireModal();
    initCollectionModal();
    
    const clearCategoryBtn = document.getElementById('clearCategoryBtn');
    if (clearCategoryBtn) {
        clearCategoryBtn.addEventListener('click', clearCategoryFilter);
    }
    
    initParallax();
});

// Обновление статистики на главной
function updateStats() {
    const totalQuotes = document.getElementById('total-quotes');
    const totalCelebrities = document.getElementById('total-celebrities');
    
    if (totalQuotes) {
        let quoteCount = 0;
        celebritiesData.forEach(celebrity => {
            quoteCount += celebrity.quotes.length;
        });
        totalQuotes.textContent = quoteCount;
    }
    
    if (totalCelebrities) {
        totalCelebrities.textContent = celebritiesData.length;
    }
}

// Подсчет цитат по темам
function getQuotesByTheme(theme) {
    let count = 0;
    celebritiesData.forEach(celebrity => {
        celebrity.quotes.forEach(quote => {
            if (quote.themes && quote.themes.includes(theme)) {
                count++;
            }
        });
    });
    return count;
}

// Обновление счетчиков на карточках коллекций
function updateCollectionsCount() {
    const themes = ['motivation', 'love', 'wisdom', 'happiness', 'success'];
    
    themes.forEach(theme => {
        const countElement = document.getElementById(`${theme}-count`);
        if (countElement) {
            const count = getQuotesByTheme(theme);
            countElement.textContent = `${count} цитат`;
        }
    });
}

// Инициализация кликов по коллекциям
function initCollections() {
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('collection-btn') || e.target.closest('.collection-btn')) {
                const theme = this.dataset.theme;
                showCollectionModal(theme);
            }
        });
        
        const btn = card.querySelector('.collection-btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const theme = card.dataset.theme;
                showCollectionModal(theme);
            });
        }
    });
}

// Показ модального окна с коллекцией
function showCollectionModal(theme) {
    const modal = document.getElementById('collectionModal');
    const modalBody = document.getElementById('collectionModalBody');
    
    if (!modal || !modalBody) return;
    
    const quotes = [];
    celebritiesData.forEach(celebrity => {
        celebrity.quotes.forEach(quote => {
            if (quote.themes && quote.themes.includes(theme)) {
                quotes.push({
                    text: quote.text,
                    author: celebrity.name,
                    image: celebrity.image,
                    profession: celebrity.profession
                });
            }
        });
    });
    
    let html = `
        <div class="collection-header">
            <div class="collection-header-icon">${themeIcons[theme]}</div>
            <h2>Коллекция: ${themeTranslations[theme]}</h2>
            <p>${quotes.length} цитат о ${themeTranslations[theme].toLowerCase()}</p>
        </div>
        <div class="collection-quotes-list">
    `;
    
    quotes.forEach((quote, index) => {
        html += `
            <div class="collection-quote-item fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="collection-quote-author">
                    <img src="${quote.image}" alt="${quote.author}" onerror="this.src='https://via.placeholder.com/50x50?text=${encodeURIComponent(quote.author)}'">
                    <div>
                        <h4>${quote.author}</h4>
                        <p>${quote.profession}</p>
                    </div>
                </div>
                <p class="collection-quote-text">"${quote.text}"</p>
            </div>
        `;
    });
    
    html += '</div>';
    
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
}

// Инициализация модального окна коллекций
function initCollectionModal() {
    const modal = document.getElementById('collectionModal');
    const closeBtn = document.querySelectorAll('.close-modal');
    
    if (!modal) return;
    
    closeBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function loadCelebrities() {
    const container = document.getElementById('celebritiesContainer');
    if (!container) return;
    
    let filteredCelebrities = filterCelebrities(celebritiesData);
    filteredCelebrities = sortCelebrities(filteredCelebrities);
    
    container.innerHTML = '';
    
    if (filteredCelebrities.length === 0) {
        showNoResults(container);
        return;
    }
    
    filteredCelebrities.forEach(celebrity => {
        const card = createCelebrityCard(celebrity);
        container.appendChild(card);
    });
    
    addQuoteButtonsListeners();
}

function createCelebrityCard(celebrity) {
    const card = document.createElement('div');
    card.className = 'celebrity-card';
    card.dataset.id = celebrity.id;
    
    const previewQuote = celebrity.quotes && celebrity.quotes.length > 0 
        ? `"${celebrity.quotes[0].text}"` 
        : 'Нет цитат';
    
    card.innerHTML = `
        <div class="celebrity-image">
            <img src="${celebrity.image}" alt="${celebrity.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(celebrity.name)}'">
        </div>
        <div class="celebrity-info">
            <h3>${celebrity.name}</h3>
            <p class="celebrity-category">${celebrity.category}</p>
            <p class="celebrity-quote">${previewQuote}</p>
            <div class="celebrity-actions">
                <button class="btn btn-small view-quotes-btn" data-id="${celebrity.id}">
                    <i class="fas fa-quote-right"></i> Все цитаты (${celebrity.quotes.length})
                </button>
                <button class="btn btn-small category-btn" data-category="${celebrity.category}">
                    <i class="fas fa-tag"></i>
                </button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (e.target.closest('button')) return;
        showCelebrityQuotes(celebrity.id);
    });
    
    const categoryBtn = card.querySelector('.category-btn');
    if (categoryBtn) {
        categoryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const category = this.dataset.category;
            filterByCategory(category);
        });
    }
    
    return card;
}

function filterCelebrities(celebrities) {
    return celebrities.filter(celebrity => {
        const matchesCategory = currentCategory === 'all' || celebrity.category === currentCategory;
        
        let matchesSearch = true;
        if (currentSearchTerm) {
            const searchLower = currentSearchTerm.toLowerCase();
            const nameMatch = celebrity.name.toLowerCase().includes(searchLower);
            const quoteMatch = celebrity.quotes.some(quote => 
                quote.text.toLowerCase().includes(searchLower)
            );
            matchesSearch = nameMatch || quoteMatch;
        }
        
        return matchesCategory && matchesSearch;
    });
}

function sortCelebrities(celebrities) {
    const sorted = [...celebrities];
    
    switch(currentSortBy) {
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
            break;
        default:
            sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }
    
    return sorted;
}

function initFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.dataset.category;
            
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    currentCategory = category;
    
    const categoryHeader = document.getElementById('categoryHeader');
    const selectedCategorySpan = document.getElementById('selectedCategory');
    
    if (categoryHeader && selectedCategorySpan) {
        if (category === 'all') {
            categoryHeader.style.display = 'none';
        } else {
            selectedCategorySpan.textContent = category;
            categoryHeader.style.display = 'flex';
        }
    }
    
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        if (tag.dataset.category === category) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });
    
    loadCelebrities();
}

function clearCategoryFilter() {
    filterByCategory('all');
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            currentSearchTerm = searchInput.value.trim();
            loadCelebrities();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                currentSearchTerm = this.value.trim();
                loadCelebrities();
            }
        });
    }
}

function initSort() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSortBy = this.value;
            loadCelebrities();
        });
    }
}

function showNoResults(container) {
    container.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
    `;
}

function addQuoteButtonsListeners() {
    const quoteButtons = document.querySelectorAll('.view-quotes-btn');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const celebrityId = parseInt(this.dataset.id);
            showCelebrityQuotes(celebrityId);
        });
    });
}

function showCelebrityQuotes(celebrityId) {
    const celebrity = celebritiesData.find(c => c.id === celebrityId);
    
    if (!celebrity) return;
    
    const modalBody = document.getElementById('modalBody');
    const modal = document.getElementById('quoteModal');
    
    let quotesHtml = `
        <div class="celebrity-quotes-header">
            <h2>${celebrity.name}</h2>
            <p>${celebrity.profession}, ${celebrity.country}</p>
            <p>${celebrity.birthYear} - ${celebrity.deathYear}</p>
            <span class="celebrity-category">${celebrity.category}</span>
        </div>
        <div class="quotes-list">
    `;
    
    celebrity.quotes.forEach((quote, index) => {
        quotesHtml += `
            <div class="quote-item typewriter-effect" data-index="${index}">
                <i class="fas fa-quote-left"></i>
                <p>${quote.text}</p>
            </div>
        `;
    });
    
    quotesHtml += '</div>';
    
    modalBody.innerHTML = quotesHtml;
    modal.style.display = 'flex';
    
    setTimeout(() => {
        document.querySelectorAll('.typewriter-effect').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('typewriter-animate');
            }, i * 300);
        });
    }, 100);
}

function initModal() {
    const modal = document.getElementById('quoteModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !closeBtn) return;
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function initFullscreenInspireModal() {
    const modal = document.getElementById('inspireModal');
    const inspireBtns = document.querySelectorAll('#inspireBtn');
    const closeBtn = document.querySelector('.close-fullscreen-modal');
    
    if (!modal || inspireBtns.length === 0) return;
    
    inspireBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showRandomFullscreenQuote();
            modal.style.display = 'flex';
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showRandomFullscreenQuote() {
    const modalBody = document.getElementById('inspireModalBody');
    if (!modalBody) return;
    
    const allQuotes = [];
    celebritiesData.forEach(celebrity => {
        celebrity.quotes.forEach(quote => {
            allQuotes.push({
                text: quote.text,
                author: celebrity.name,
                img: celebrity.image,
                profession: celebrity.profession,
                country: celebrity.country,
                years: `${celebrity.birthYear} - ${celebrity.deathYear}`
            });
        });
    });
    
    const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    
    modalBody.innerHTML = `
        <div class="fullscreen-quote-content fade-in">
            <div class="fullscreen-quote-icon">
                <i class="fas fa-quote-right"></i>
            </div>
            <p class="fullscreen-quote-text">"${randomQuote.text}"</p>
            <div class="fullscreen-quote-author">
                <img src="${randomQuote.img}" alt="${randomQuote.author}" onerror="this.src='https://via.placeholder.com/100x100?text=${encodeURIComponent(randomQuote.author)}'">
                <div>
                    <h3>${randomQuote.author}</h3>
                    <p>${randomQuote.profession}, ${randomQuote.country}</p>
                    <p class="fullscreen-quote-years">${randomQuote.years}</p>
                </div>
            </div>
            <button class="btn btn-primary fullscreen-new-quote">
                <i class="fas fa-sync-alt"></i> Ещё цитата
            </button>
        </div>
    `;
    
    const newQuoteBtn = modalBody.querySelector('.fullscreen-new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', showRandomFullscreenQuote);
    }
}

function showQuoteOfTheDay() {
    const quoteCard = document.getElementById('quoteOfTheDay');
    if (!quoteCard) return;
    
    const allQuotes = [];
    celebritiesData.forEach(celebrity => {
        celebrity.quotes.forEach(quote => {
            allQuotes.push({
                text: quote.text,
                author: celebrity.name,
                img: celebrity.image,
                profession: celebrity.profession
            });
        });
    });
    
    const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    
    quoteCard.innerHTML = `
        <div class="quote-content">
            <p class="quote-text">"${randomQuote.text}"</p>
            <div class="quote-author">
                <img src="${randomQuote.img}" alt="${randomQuote.author}" class="author-avatar" onerror="this.src='https://via.placeholder.com/60x60?text=${encodeURIComponent(randomQuote.author)}'">
                <div class="author-info">
                    <h4>${randomQuote.author}</h4>
                    <p>${randomQuote.profession}</p>
                </div>
            </div>
        </div>
        <div class="quote-actions">
            <button id="newQuoteBtn" class="btn btn-small">
                <i class="fas fa-sync-alt"></i> Новая цитата
            </button>
        </div>
    `;
    
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', showQuoteOfTheDay);
    }
}

function loadGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    celebritiesData.forEach(celebrity => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        item.innerHTML = `
            <img src="${celebrity.image}" alt="${celebrity.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/350x300?text=${encodeURIComponent(celebrity.name)}'">
            <div class="gallery-overlay">
                <h3>${celebrity.name}</h3>
                <p>${celebrity.quotes[0] ? `"${celebrity.quotes[0].text.substring(0, 50)}..."` : ''}</p>
                <div class="gallery-tags">
                    <span class="gallery-tag">${celebrity.category}</span>
                </div>
            </div>
        `;
        
        item.addEventListener('click', function() {
            showCelebrityQuotes(celebrity.id);
        });
        
        container.appendChild(item);
    });
}

function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const sortedByBirth = [...celebritiesData].sort((a, b) => a.birthYear - b.birthYear);
    
    sortedByBirth.forEach(celebrity => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        const birthDate = celebrity.birthYear > 0 ? celebrity.birthYear : `${Math.abs(celebrity.birthYear)} до н.э.`;
        const deathDate = celebrity.deathYear > 0 ? celebrity.deathYear : `${Math.abs(celebrity.deathYear)} до н.э.`;
        
        item.innerHTML = `
            <div class="timeline-date">${birthDate} - ${deathDate}</div>
            <div class="timeline-content">
                <h3>${celebrity.name}</h3>
                <p>${celebrity.profession}, ${celebrity.country}</p>
            </div>
        `;
        
        container.appendChild(item);
    });
}

function initWorldMap() {
    const mapElement = document.getElementById('worldMap');
    if (!mapElement) return;
    
    const map = L.map('worldMap').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    celebritiesData.forEach(celebrity => {
        if (celebrity.coordinates) {
            const marker = L.marker(celebrity.coordinates).addTo(map);
            
            let quotesPreview = '';
            if (celebrity.quotes && celebrity.quotes.length > 0) {
                quotesPreview = celebrity.quotes.slice(0, 2).map(q => `"${q.text.substring(0, 50)}..."`).join('<br><br>');
            }
            
            marker.bindPopup(`
                <div class="map-popup">
                    <h3>${celebrity.name}</h3>
                    <p><strong>${celebrity.profession}</strong></p>
                    <p>${celebrity.birthYear} - ${celebrity.deathYear}</p>
                    <p>${celebrity.country}</p>
                    <div class="map-popup-quotes">
                        <small>${quotesPreview}</small>
                    </div>
                    <button class="btn btn-small view-quotes-map" data-id="${celebrity.id}">
                        Смотреть цитаты
                    </button>
                </div>
            `);
            
            marker.on('popupopen', function() {
                setTimeout(() => {
                    const viewBtn = document.querySelector('.view-quotes-map');
                    if (viewBtn) {
                        viewBtn.addEventListener('click', function() {
                            const id = parseInt(this.dataset.id);
                            showCelebrityQuotes(id);
                        });
                    }
                }, 100);
            });
        }
    });
}

function initParallax() {
    window.addEventListener('scroll', function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}