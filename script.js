let celebritiesDataGlobal = [];
let currentCategory = 'all';
let currentSearchTerm = '';
let currentSortBy = 'name';
let currentPage = 0;
let isLoading = false;
let allFilteredCelebrities = [];
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let quizQuestions = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function (m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function showToast(message) {
  const toast = document.getElementById('toastPremium');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(celebrityId, quoteText) {
  return favorites.some(
    (f) => f.celebrityId === celebrityId && f.quoteText === quoteText,
  );
}

function toggleFavorite(
  celebrityId,
  quoteText,
  quoteTheme,
  celebrityName,
  celebrityImage,
) {
  const index = favorites.findIndex(
    (f) => f.celebrityId === celebrityId && f.quoteText === quoteText,
  );
  if (index === -1) {
    favorites.push({
      celebrityId,
      quoteText,
      quoteTheme,
      celebrityName,
      celebrityImage,
    });
    showToast('✨ Добавлено в избранное');
  } else {
    favorites.splice(index, 1);
    showToast('🗑 Удалено из избранного');
  }
  saveFavorites();
  const favModal = document.getElementById('favoritesModalPremium');
  if (favModal && favModal.style.display === 'flex') {
    renderFavoritesModal();
  }
}

function renderFavoritesModal() {
  const modalBody = document.getElementById('favoritesModalBodyPremium');
  if (!modalBody) return;
  if (favorites.length === 0) {
    modalBody.innerHTML =
      '<div style="text-align:center;padding:3rem"><i class="fas fa-heart" style="font-size:3rem;color:var(--gold);margin-bottom:1rem;display:block"></i><h3>Нет избранных цитат</h3><p>Добавьте цитаты, нажав на сердечко</p></div>';
    return;
  }
  let html = '<div style="display:flex;flex-direction:column;gap:1rem">';
  favorites.forEach((fav, idx) => {
    const celebrity = celebritiesDataGlobal.find(
      (c) => c.id === fav.celebrityId,
    );
    html += `
            <div style="background:var(--bg-elevated);border-radius:16px;padding:1.5rem;border:1px solid var(--border-light)">
                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
                    <img src="${fav.celebrityImage}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)" onerror="this.src='https://via.placeholder.com/50'">
                    <div>
                        <h4 style="font-family:Playfair Display">${escapeHtml(fav.celebrityName)}</h4>
                        <p style="color:var(--text-muted);font-size:0.8rem">${celebrity ? celebrity.profession : ''}</p>
                    </div>
                    <button class="fav-remove-btn-premium" data-id="${fav.celebrityId}" data-quote="${escapeHtml(fav.quoteText)}" style="margin-left:auto;background:transparent;border:1px solid var(--border-medium);border-radius:30px;padding:0.5rem 1rem;cursor:pointer;transition:all 0.2s">🗑 Удалить</button>
                </div>
                <p style="font-style:italic;color:var(--text-secondary)">"${escapeHtml(fav.quoteText)}"</p>
            </div>
        `;
  });
  html += '</div>';
  modalBody.innerHTML = html;
  document.querySelectorAll('.fav-remove-btn-premium').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const quote = btn.dataset.quote;
      const idx = favorites.findIndex(
        (f) => f.celebrityId === id && f.quoteText === quote,
      );
      if (idx !== -1) favorites.splice(idx, 1);
      saveFavorites();
      renderFavoritesModal();
      showToast('Удалено из избранного');
    });
  });
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

function showCelebrityQuotes(celebrityId) {
  const celebrity = celebritiesDataGlobal.find((c) => c.id === celebrityId);
  if (!celebrity) return;
  const modalBody = document.getElementById('modalBodyPremium');
  const modal = document.getElementById('quoteModalPremium');
  let quotesHtml = `
        <div style="text-align:center;margin-bottom:2rem;border-bottom:1px solid var(--border-light);padding-bottom:1rem">
            <h2 style="font-family:Playfair Display;font-size:1.8rem">${escapeHtml(celebrity.name)}</h2>
            <p style="color:var(--gold)">${escapeHtml(celebrity.profession)} • ${escapeHtml(celebrity.country)}</p>
            <p style="color:var(--text-muted);font-size:0.8rem">${celebrity.birthYear} — ${celebrity.deathYear}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
    `;
  celebrity.quotes.forEach((quote, idx) => {
    const isFav = isFavorite(celebrity.id, quote.text);
    quotesHtml += `
            <div style="background:var(--bg-elevated);border-radius:16px;padding:1.5rem;border-left:3px solid var(--gold)">
                <p style="font-style:italic;margin-bottom:1rem">"${escapeHtml(quote.text)}"</p>
                <div style="display:flex;gap:0.8rem">
                    <button class="fav-quote-premium" data-id="${celebrity.id}" data-quote="${escapeHtml(quote.text)}" data-theme="${quote.themes ? quote.themes[0] : ''}" style="background:transparent;border:1px solid var(--border-medium);border-radius:30px;padding:0.4rem 1rem;cursor:pointer;transition:all 0.2s">${isFav ? '❤️' : '🤍'} ${isFav ? 'В избранном' : 'В избранное'}</button>
                    <button class="ai-similar-premium" data-theme="${quote.themes ? quote.themes[0] : 'wisdom'}" style="background:transparent;border:1px solid var(--border-medium);border-radius:30px;padding:0.4rem 1rem;cursor:pointer;transition:all 0.2s">✨ Похожая</button>
                </div>
            </div>
        `;
  });
  quotesHtml += '</div>';
  modalBody.innerHTML = quotesHtml;
  modal.style.display = 'flex';

  document.querySelectorAll('.fav-quote-premium').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const quote = btn.dataset.quote;
      const theme = btn.dataset.theme;
      const celeb = celebritiesDataGlobal.find((c) => c.id === id);
      toggleFavorite(id, quote, theme, celeb.name, celeb.image);
      showCelebrityQuotes(id);
    });
  });

  document.querySelectorAll('.ai-similar-premium').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const theme = btn.dataset.theme;
      const quotes = [];
      celebritiesDataGlobal.forEach((c) => {
        c.quotes.forEach((q) => {
          if (q.themes && q.themes.includes(theme)) {
            quotes.push({ text: q.text, author: c.name });
          }
        });
      });
      if (quotes.length > 0) {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        showToast(`✨ "${random.text.substring(0, 80)}..." — ${random.author}`);
      } else {
        showToast('😔 Похожих цитат не найдено');
      }
    });
  });
}

function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const quoteText = document.getElementById('envelopeQuoteText');
  const quoteAuthor = document.getElementById('envelopeQuoteAuthor');

  if (!envelope || !celebritiesDataGlobal.length) return;

  const allQuotes = [];
  celebritiesDataGlobal.forEach((c) => {
    c.quotes.forEach((q) => {
      allQuotes.push({ text: q.text, author: c.name });
    });
  });
  const random = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  quoteText.textContent = `"${random.text}"`;
  quoteAuthor.textContent = `— ${random.author}`;

  envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
      envelope.style.cursor = 'default';
    }, 600);
  });
}

function initQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer) return;

  if (!celebritiesDataGlobal.length) return;

  const allQuestions = [];
  celebritiesDataGlobal.forEach((celebrity) => {
    celebrity.quotes.forEach((quote) => {
      const wrongOptions = celebritiesDataGlobal
        .filter((c) => c.id !== celebrity.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((c) => c.name);

      if (wrongOptions.length === 3) {
        allQuestions.push({
          quote: quote.text,
          correct: celebrity.name,
          options: [...wrongOptions, celebrity.name].sort(
            () => 0.5 - Math.random(),
          ),
        });
      }
    });
  });

  quizQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
  currentQuizIndex = 0;
  quizScore = 0;
  quizAnswered = false;

  const quizResultDiv = document.getElementById('quizResult');
  const quizCard = document.querySelector('.quiz-question-card');
  const progressBar = document.getElementById('quizProgressBar');
  const scoreSpan = document.getElementById('quizScore');
  const totalSpan = document.getElementById('quizTotal');

  if (!quizCard) return;

  totalSpan.textContent = quizQuestions.length;
  scoreSpan.textContent = '0';
  quizResultDiv.style.display = 'none';
  quizCard.style.display = 'block';
  if (progressBar) progressBar.style.width = '0%';

  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (currentQuizIndex >= quizQuestions.length) {
    finishQuiz();
    return;
  }

  const question = quizQuestions[currentQuizIndex];
  const quoteText = document.getElementById('quizQuoteText');
  const optionsContainer = document.getElementById('quizOptions');
  const feedbackDiv = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextQuizBtn');
  const progressBar = document.getElementById('quizProgressBar');
  const scoreSpan = document.getElementById('quizScore');

  if (!quoteText || !optionsContainer) return;

  quoteText.textContent = `"${question.quote}"`;
  optionsContainer.innerHTML = '';
  feedbackDiv.innerHTML = '';
  feedbackDiv.className = 'quiz-feedback';
  if (nextBtn) nextBtn.disabled = true;
  quizAnswered = false;

  if (progressBar)
    progressBar.style.width = `${(currentQuizIndex / quizQuestions.length) * 100}%`;
  if (scoreSpan) scoreSpan.textContent = quizScore;

  question.options.forEach((option) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(option, btn));
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected, btnElement) {
  if (quizAnswered) return;

  const question = quizQuestions[currentQuizIndex];
  const isCorrect = selected === question.correct;
  const feedbackDiv = document.getElementById('quizFeedback');
  const allOptions = document.querySelectorAll('.quiz-option');

  quizAnswered = true;

  if (isCorrect) {
    quizScore++;
    const scoreSpan = document.getElementById('quizScore');
    if (scoreSpan) scoreSpan.textContent = quizScore;
    if (feedbackDiv) {
      feedbackDiv.innerHTML =
        '<i class="fas fa-check-circle"></i> Правильно! Отличная эрудиция!';
      feedbackDiv.classList.add('correct-feedback');
    }
    btnElement.classList.add('correct');
  } else {
    if (feedbackDiv) {
      feedbackDiv.innerHTML = `<i class="fas fa-times-circle"></i> Неправильно. Правильный ответ: ${question.correct}`;
      feedbackDiv.classList.add('wrong-feedback');
    }
    btnElement.classList.add('wrong');

    allOptions.forEach((opt) => {
      if (opt.textContent === question.correct) {
        opt.classList.add('correct');
      }
    });
  }

  allOptions.forEach((opt) => {
    opt.classList.add('disabled');
  });

  const nextBtn = document.getElementById('nextQuizBtn');
  if (nextBtn) nextBtn.disabled = false;
}

function nextQuestion() {
  if (!quizAnswered) return;
  currentQuizIndex++;
  renderQuizQuestion();
}

function finishQuiz() {
  const quizCard = document.querySelector('.quiz-question-card');
  const quizResultDiv = document.getElementById('quizResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  const total = quizQuestions.length;
  const percent = (quizScore / total) * 100;

  if (quizCard) quizCard.style.display = 'none';
  if (quizResultDiv) quizResultDiv.style.display = 'block';

  if (percent === 100) {
    if (resultTitle) resultTitle.textContent = '🏆 Мастер мудрости!';
    if (resultMessage)
      resultMessage.textContent = `Поздравляем! Вы ответили правильно на все ${quizScore} из ${total} вопросов. Вы настоящий знаток цитат!`;
  } else if (percent >= 70) {
    if (resultTitle) resultTitle.textContent = '📚 Знаток цитат';
    if (resultMessage)
      resultMessage.textContent = `Отличный результат! ${quizScore} из ${total} правильных ответов. Вы хорошо знаете великих мыслителей!`;
  } else if (percent >= 40) {
    if (resultTitle) resultTitle.textContent = '🌱 Начинающий мудрец';
    if (resultMessage)
      resultMessage.textContent = `${quizScore} из ${total} правильных ответов. Неплохо, но есть куда расти! Попробуйте ещё раз.`;
  } else {
    if (resultTitle) resultTitle.textContent = '📖 Ученик';
    if (resultMessage)
      resultMessage.textContent = `${quizScore} из ${total} правильных ответов. Не расстраивайтесь! Каждая цитата — это шаг к мудрости.`;
  }

  const restartBtn = document.getElementById('restartQuizBtn');
  if (restartBtn) {
    restartBtn.onclick = () => {
      initQuiz();
    };
  }
}

function createCelebrityCard(celebrity) {
  const card = document.createElement('div');
  card.className = 'celebrity-card-premium fade-in';
  const preview = celebrity.quotes[0]?.text || 'Нет цитат';
  card.innerHTML = `
        <div class="celebrity-image-premium">
            <img src="${celebrity.image}" loading="lazy" onerror="this.src='https://via.placeholder.com/320x260?text=${encodeURIComponent(celebrity.name)}'">
        </div>
        <div class="celebrity-info-premium">
            <h3 class="celebrity-name-premium">${escapeHtml(celebrity.name)}</h3>
            <span class="celebrity-category-premium">${escapeHtml(celebrity.category)}</span>
            <p class="celebrity-quote-preview-premium">"${escapeHtml(preview.substring(0, 100))}${preview.length > 100 ? '...' : ''}"</p>
            <div class="celebrity-actions-premium">
                <button class="btn-card view-quotes-premium" data-id="${celebrity.id}">📖 ${celebrity.quotes.length}</button>
                <button class="btn-card category-filter-premium" data-category="${celebrity.category}">🏷️</button>
            </div>
        </div>
    `;
  card.addEventListener('click', (e) => {
    if (!e.target.closest('button')) showCelebrityQuotes(celebrity.id);
  });
  card.querySelector('.view-quotes-premium')?.addEventListener('click', (e) => {
    e.stopPropagation();
    showCelebrityQuotes(celebrity.id);
  });
  card
    .querySelector('.category-filter-premium')
    ?.addEventListener('click', (e) => {
      e.stopPropagation();
      filterByCategory(celebrity.category);
    });
  return card;
}

function filterCelebrities() {
  return celebritiesDataGlobal.filter((c) => {
    const matchCat =
      currentCategory === 'all' || c.category === currentCategory;
    let matchSearch = true;
    if (currentSearchTerm) {
      const term = currentSearchTerm.toLowerCase();
      matchSearch =
        c.name.toLowerCase().includes(term) ||
        c.quotes.some((q) => q.text.toLowerCase().includes(term));
    }
    return matchCat && matchSearch;
  });
}

function sortCelebrities(list) {
  const sorted = [...list];
  if (currentSortBy === 'name')
    sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  if (currentSortBy === 'name-desc')
    sorted.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
  return sorted;
}

function filterByCategory(category) {
  currentCategory = category;
  const tags = document.querySelectorAll('.filter-tag-premium');
  tags.forEach((tag) => {
    if (tag.dataset.category === category) tag.classList.add('active');
    else tag.classList.remove('active');
  });
  reloadCelebritiesList();
}

function reloadCelebritiesList() {
  if (!document.getElementById('celebritiesContainerPremium')) return;
  allFilteredCelebrities = sortCelebrities(filterCelebrities());
  currentPage = 0;
  const container = document.getElementById('celebritiesContainerPremium');
  if (!container) return;
  container.innerHTML = '';
  const initial = allFilteredCelebrities.slice(0, 12);
  initial.forEach((c) => container.appendChild(createCelebrityCard(c)));
  currentPage = 1;
  const trigger = document.getElementById('loadingTriggerPremium');
  if (trigger) {
    if (allFilteredCelebrities.length > 12) trigger.style.display = 'block';
    else trigger.style.display = 'none';
  }
}

function loadCelebrities() {
  reloadCelebritiesList();
  initInfiniteScroll();
}

function initInfiniteScroll() {
  const trigger = document.getElementById('loadingTriggerPremium');
  if (!trigger) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        !isLoading &&
        allFilteredCelebrities.length > currentPage * 12
      ) {
        isLoading = true;
        const start = currentPage * 12;
        const end = start + 12;
        const chunk = allFilteredCelebrities.slice(start, end);
        const container = document.getElementById(
          'celebritiesContainerPremium',
        );
        chunk.forEach((c) => container.appendChild(createCelebrityCard(c)));
        currentPage++;
        isLoading = false;
        if (end >= allFilteredCelebrities.length)
          trigger.style.display = 'none';
      }
    },
    { threshold: 0.1 },
  );
  observer.observe(trigger);
}

function initFilters() {
  const cats = [...new Set(celebritiesDataGlobal.map((c) => c.category))];
  const container = document.getElementById('categoryFiltersPremium');
  if (!container) return;
  container.innerHTML =
    '<button class="filter-tag-premium active" data-category="all">Все</button>';
  cats.forEach((cat) => {
    container.innerHTML += `<button class="filter-tag-premium" data-category="${cat}">${cat}</button>`;
  });
  document.querySelectorAll('.filter-tag-premium').forEach((tag) => {
    tag.addEventListener('click', () => filterByCategory(tag.dataset.category));
  });
}

function initSearch() {
  const input = document.getElementById('searchInputPremium');
  const debounced = debounce(() => {
    currentSearchTerm = input?.value.trim() || '';
    reloadCelebritiesList();
  }, 300);
  if (input) input.addEventListener('input', debounced);
}

function initSort() {
  const select = document.getElementById('sortSelectPremium');
  if (select)
    select.addEventListener('change', () => {
      currentSortBy = select.value;
      reloadCelebritiesList();
    });
}

function updateStats() {
  let totalQuotes = 0;
  celebritiesDataGlobal.forEach((c) => (totalQuotes += c.quotes.length));
  const statQuotes = document.getElementById('statQuotes');
  const statCelebs = document.getElementById('statCelebs');
  const totalQuotesStat = document.getElementById('totalQuotesStat');
  const totalCelebsStat = document.getElementById('totalCelebsStat');
  if (statQuotes) statQuotes.textContent = totalQuotes;
  if (statCelebs) statCelebs.textContent = celebritiesDataGlobal.length;
  if (totalQuotesStat) totalQuotesStat.textContent = totalQuotes;
  if (totalCelebsStat)
    totalCelebsStat.textContent = celebritiesDataGlobal.length;
}

function getQuotesByTheme(theme) {
  let count = 0;
  celebritiesDataGlobal.forEach((c) => {
    c.quotes.forEach((q) => {
      if (q.themes && q.themes.includes(theme)) count++;
    });
  });
  return count;
}

function renderCollections() {
  const container = document.getElementById('collectionsGrid');
  if (!container) return;
  const themes = ['motivation', 'love', 'wisdom', 'happiness', 'success'];
  const trans = {
    motivation: 'Мотивация',
    love: 'Любовь',
    wisdom: 'Мудрость',
    happiness: 'Счастье',
    success: 'Успех',
  };
  const icons = {
    motivation: '<i class="fas fa-chart-line"></i>',
    love: '<i class="fas fa-heart"></i>',
    wisdom: '<i class="fas fa-brain"></i>',
    happiness: '<i class="fas fa-sun"></i>',
    success: '<i class="fas fa-trophy"></i>',
  };
  container.innerHTML = '';
  themes.forEach((theme) => {
    const count = getQuotesByTheme(theme);
    const card = document.createElement('div');
    card.className = 'collection-card-premium';
    card.innerHTML = `
            <div class="collection-icon-premium">${icons[theme]}</div>
            <h3>${trans[theme]}</h3>
            <p>${count} цитат</p>
        `;
    card.addEventListener('click', () => showCollectionModal(theme));
    container.appendChild(card);
  });
}

function showCollectionModal(theme) {
  const modal = document.getElementById('collectionModalPremium');
  const body = document.getElementById('collectionModalBodyPremium');
  if (!modal || !body) return;
  const trans = {
    motivation: 'Мотивация',
    love: 'Любовь',
    wisdom: 'Мудрость',
    happiness: 'Счастье',
    success: 'Успех',
  };
  const iconsMapLocal = {
    motivation: '📈',
    love: '❤️',
    wisdom: '🧠',
    happiness: '☀️',
    success: '🏆',
  };
  const quotes = [];
  celebritiesDataGlobal.forEach((c) => {
    c.quotes.forEach((q) => {
      if (q.themes && q.themes.includes(theme)) {
        quotes.push({
          text: q.text,
          author: c.name,
          image: c.image,
          profession: c.profession,
        });
      }
    });
  });
  let html = `<div style="text-align:center;margin-bottom:2rem"><h2 style="font-family:Playfair Display">${iconsMapLocal[theme]} ${trans[theme]}</h2><p>${quotes.length} цитат</p></div><div style="display:flex;flex-direction:column;gap:1rem">`;
  quotes.forEach((q, idx) => {
    html += `
            <div style="background:var(--bg-elevated);border-radius:16px;padding:1.5rem;border-left:3px solid var(--gold)">
                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
                    <img src="${q.image}" style="width:45px;height:45px;border-radius:50%;object-fit:cover" onerror="this.src='https://via.placeholder.com/45'">
                    <div>
                        <h4 style="font-family:Playfair Display">${escapeHtml(q.author)}</h4>
                        <p style="color:var(--text-muted);font-size:0.8rem">${escapeHtml(q.profession)}</p>
                    </div>
                </div>
                <p style="font-style:italic">"${escapeHtml(q.text)}"</p>
            </div>
        `;
  });
  html += '</div>';
  body.innerHTML = html;
  modal.style.display = 'flex';
}

function loadGallery() {
  const container = document.getElementById('galleryContainerPremium');
  if (!container) return;
  container.innerHTML = '';
  celebritiesDataGlobal.forEach((celebrity) => {
    const item = document.createElement('div');
    item.className = 'gallery-item-premium';
    item.innerHTML = `
            <img src="${celebrity.image}" loading="lazy" onerror="this.src='https://via.placeholder.com/350x380?text=${encodeURIComponent(celebrity.name)}'">
            <div class="gallery-overlay-premium">
                <h3 class="gallery-name-premium">${escapeHtml(celebrity.name)}</h3>
                <span class="gallery-category-premium">${escapeHtml(celebrity.category)}</span>
            </div>
        `;
    item.addEventListener('click', () => showCelebrityQuotes(celebrity.id));
    container.appendChild(item);
  });
}

function loadTimeline() {
  const container = document.getElementById('timelineContainerPremium');
  if (!container) return;
  const sorted = [...celebritiesDataGlobal].sort(
    (a, b) => a.birthYear - b.birthYear,
  );
  container.innerHTML = '';
  sorted.forEach((celebrity) => {
    const item = document.createElement('div');
    item.className = 'timeline-item-premium';
    item.innerHTML = `
            <div class="timeline-date-premium">${celebrity.birthYear} — ${celebrity.deathYear}</div>
            <div class="timeline-content-premium">
                <h3 style="font-family:Playfair Display">${escapeHtml(celebrity.name)}</h3>
                <p style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(celebrity.profession)} • ${escapeHtml(celebrity.country)}</p>
            </div>
        `;
    container.appendChild(item);
  });
}

function showRandomFullscreenQuote() {
  const body = document.getElementById('inspireModalBodyPremium');
  if (!body) return;
  const all = [];
  celebritiesDataGlobal.forEach((c) => {
    c.quotes.forEach((q) => {
      all.push({
        text: q.text,
        author: c.name,
        img: c.image,
        profession: c.profession,
        country: c.country,
      });
    });
  });
  const random = all[Math.floor(Math.random() * all.length)];
  body.innerHTML = `
        <div style="padding:2rem">
            <i class="fas fa-quote-right" style="font-size:4rem;color:var(--gold);margin-bottom:2rem;display:inline-block"></i>
            <p style="font-size:clamp(1.5rem,5vw,2.5rem);font-family:Playfair Display;font-style:italic;line-height:1.4">"${escapeHtml(random.text)}"</p>
            <div style="margin-top:2rem;display:flex;align-items:center;justify-content:center;gap:1rem">
                <img src="${random.img}" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)" onerror="this.src='https://via.placeholder.com/70'">
                <div>
                    <div style="font-weight:600;font-size:1.2rem">${escapeHtml(random.author)}</div>
                    <div style="color:var(--text-muted)">${escapeHtml(random.profession)} • ${escapeHtml(random.country)}</div>
                </div>
            </div>
            <button id="newFullscreenQuote" style="margin-top:2rem;background:var(--gold);border:none;padding:0.7rem 1.5rem;border-radius:40px;color:#fff;font-weight:600;cursor:pointer;transition:all 0.2s">✨ Следующая</button>
        </div>
    `;
  document
    .getElementById('newFullscreenQuote')
    ?.addEventListener('click', showRandomFullscreenQuote);
}

function initParallax() {
  const parallaxBg = document.querySelector('.parallax-bg');
  if (!parallaxBg) return;
  window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });
}

function initDynamicGradient() {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / maxScroll;
    if (scrollPercent < 0.33) {
      document.body.classList.remove('gradient-2', 'gradient-3');
      document.body.classList.add('gradient-1');
    } else if (scrollPercent < 0.66) {
      document.body.classList.remove('gradient-1', 'gradient-3');
      document.body.classList.add('gradient-2');
    } else {
      document.body.classList.remove('gradient-1', 'gradient-2');
      document.body.classList.add('gradient-3');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const themeIcon = document.querySelector('#themeTogglePremium i');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  } else {
    document.documentElement.removeAttribute('data-theme');
    const themeIcon = document.querySelector('#themeTogglePremium i');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  }
  const themeBtn = document.getElementById('themeTogglePremium');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeBtn.querySelector('i').className = 'fas fa-moon';
        showToast('🌞 Светлая тема');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeBtn.querySelector('i').className = 'fas fa-sun';
        showToast('🌙 Тёмная тема');
      }
    });
  }
}

function initModals() {
  const modals = [
    'quoteModalPremium',
    'collectionModalPremium',
    'favoritesModalPremium',
    'inspireModalPremium',
  ];
  modals.forEach((id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    const close = modal.querySelector('.modal-close');
    if (close)
      close.addEventListener('click', () => (modal.style.display = 'none'));
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
  const inspire = document.getElementById('inspireBtnPremium');
  if (inspire)
    inspire.addEventListener('click', (e) => {
      e.preventDefault();
      showRandomFullscreenQuote();
      document.getElementById('inspireModalPremium').style.display = 'flex';
    });
  const favBtn = document.getElementById('favoritesBtnPremium');
  if (favBtn)
    favBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderFavoritesModal();
      document.getElementById('favoritesModalPremium').style.display = 'flex';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof celebritiesData !== 'undefined')
    celebritiesDataGlobal = celebritiesData;
  initParallax();
  initDynamicGradient();
  initTheme();
  initModals();
  initEnvelope();
  initQuiz();
  initSmoothScroll();

  const nextBtn = document.getElementById('nextQuizBtn');
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);

  if (document.getElementById('celebritiesContainerPremium')) {
    initFilters();
    initSearch();
    initSort();
    loadCelebrities();
  }
  if (document.getElementById('galleryContainerPremium')) {
    loadGallery();
    loadTimeline();
  }
  renderCollections();
  updateStats();
});
