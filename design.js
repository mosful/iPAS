/* 共用圖示、首頁試答與一次性的章節進場，沿用既有練習狀態。 */
(() => {
  const paths = {
    home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    edit: '<path d="M12 4H4v16h16v-8M10 14l1-4 9-9 3 3-9 9Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    repeat: '<path d="M3 9a9 9 0 0 1 15-5l3 3M21 3v4h-4M21 15a9 9 0 0 1-15 5l-3-3M3 21v-4h4"/>',
    book: '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
    folder: '<path d="M3 6h6l2 3h10v11H3ZM3 6V4h6l2 2h10v3"/>',
    message: '<path d="M4 4h16v12H9l-5 5Z"/><path d="M8 8h8M8 12h5"/>',
    settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/>',
    moon: '<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1 1M18 18l1 1M5 19l1-1M18 6l1-1"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>'
  };
  function installIcons() {
    const library = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    library.classList.add('icon-library');
    library.setAttribute('aria-hidden', 'true');
    library.innerHTML = Object.entries(paths).map(([name, path]) => `<symbol id="icon-${name}" viewBox="0 0 24 24">${path}</symbol>`).join('');
    document.body.prepend(library);
  }

  window.showQuestionBank = name => {
    document.querySelectorAll('.bank-tab').forEach(tab => {
      const active = tab.id === `bank-tab-${name}`;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('.bank-panel').forEach(panel => {
      panel.hidden = panel.id !== `bank-${name}`;
    });
  };

  function initBankKeyboard() {
    const tabs = [...document.querySelectorAll('.bank-tab')];
    tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      window.showQuestionBank(tabs[next].id.replace('bank-tab-', ''));
      tabs[next].focus();
    }));
  }

  window.enhanceStudyNavigation = root => {
    const tabs = [...root.querySelectorAll('.stab-btn')];
    if (!tabs.length || root.querySelector('.study-mobile-nav')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'study-mobile-nav';
    const label = document.createElement('label');
    label.htmlFor = 'study-chapter-select';
    label.textContent = '選擇重點章節';
    const select = document.createElement('select');
    select.id = 'study-chapter-select';
    select.name = 'study_chapter';
    tabs.forEach(button => {
      const id = button.getAttribute('onclick').match(/switchTab\('([^']+)'/)[1];
      button.dataset.studyId = id;
      const option = document.createElement('option');
      option.value = id;
      option.textContent = button.textContent.trim();
      option.selected = button.classList.contains('active');
      select.append(option);
      button.addEventListener('click', () => { select.value = id; });
    });
    select.addEventListener('change', () => switchTab(select.value, tabs.find(button => button.dataset.studyId === select.value)));
    wrapper.append(label, select);
    root.querySelector('.study-tab-nav').before(wrapper);
  };

  function initHomeSample() {
    const question = QB_ALL.find(q => q.src === 'official_115_3' && q.q.length < 100 && q.opts.every(option => option.length < 32)) || QB_ALL[0];
    const letters = ['A', 'B', 'C', 'D'];
    const container = document.getElementById('sample-options');
    document.getElementById('sample-source').textContent = question.src === 'official_115_3' ? '115 年第三次官方試題' : '題庫實際試題';
    document.getElementById('sample-question').textContent = question.q;
    container.replaceChildren(...question.opts.map((text, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sample-option';
      button.setAttribute('aria-pressed', 'false');
      const letter = document.createElement('span');
      letter.textContent = letters[index];
      const label = document.createElement('span');
      label.textContent = text;
      button.append(letter, label);
      button.addEventListener('click', () => {
        if (container.dataset.answered) return;
        container.dataset.answered = 'true';
        const buttons = [...container.children];
        buttons[question.ans].classList.add('correct');
        if (index !== question.ans) button.classList.add('incorrect');
        buttons.forEach((option, selected) => {
          option.setAttribute('aria-pressed', String(selected === index));
          option.setAttribute('aria-disabled', 'true');
        });
        const feedback = document.getElementById('sample-feedback');
        feedback.textContent = `${index === question.ans ? '答對了。' : `正確答案是 ${letters[question.ans]}。`} ${question.exp.replace(/<[^>]*>/g, '')} 這一題是試答，不會計入練習紀錄。`;
      });
      return button;
    }));
  }

  function refreshHomeProgress() {
    const progress = document.getElementById('home-progress');
    if (!progress || !S.totalDone) return;
    const accuracy = Math.round(S.totalCorrect / S.totalDone * 100);
    progress.textContent = `你已完成 ${S.totalDone} 題，答對率 ${accuracy}%。錯題本收錄 ${S.wrongIds.length} 題，隨時可以接著複習。`;
  }

  function initMotion() {
    const elements = document.querySelectorAll('#page-home .reveal, #page-home .qb-exam-card, #page-home .faq-item');
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 40px', threshold: .08 }) : null;
    elements.forEach(element => {
      element.classList.add('reveal');
      if (observer) observer.observe(element);
      else element.classList.add('is-visible');
    });
  }

  function init() {
    installIcons();
    initHomeSample();
    initBankKeyboard();
    refreshHomeProgress();
    initMotion();
    document.querySelector('.btn-home')?.setAttribute('aria-label', '回到首頁');
    document.querySelectorAll('.theme-opt').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
    new MutationObserver(() => {
      document.querySelectorAll('.theme-opt').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
      const theme = document.documentElement.getAttribute('data-theme');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#191d1a' : '#eeecea');
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    new MutationObserver(refreshHomeProgress).observe(document.getElementById('s-done'), { childList: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
