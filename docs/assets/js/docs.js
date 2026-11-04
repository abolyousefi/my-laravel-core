/**
 * My Laravel Core - Documentation Script Controller
 */

(function () {
    'use strict';

    let currentSectionId = "intro";

    // Initialize Theme
    function initTheme() {
        const savedTheme = localStorage.getItem('core_docs_theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);

        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('core_docs_theme', theme);
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa fa-sun text-warning' : 'fa fa-moon';
        }
    }

    // Build Sidebar Navigation
    function buildSidebar() {
        const container = document.getElementById('sidebar-nav');
        if (!container || !window.DOCS_SECTIONS) return;

        let html = '';
        let currentCategory = '';

        window.DOCS_SECTIONS.forEach(sec => {
            if (sec.category !== currentCategory) {
                currentCategory = sec.category;
                html += `<div class="nav-group-title">${currentCategory}</div>`;
            }

            html += `
                <a href="#${sec.id}" class="sidebar-nav-link ${sec.id === currentSectionId ? 'active' : ''}" data-target="${sec.id}">
                    <i class="fa ${sec.icon}"></i>
                    <span>${sec.title}</span>
                </a>
            `;
        });

        container.innerHTML = html;

        // Click handlers
        container.querySelectorAll('.sidebar-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.dataset.target;
                loadSection(target);
                window.location.hash = target;

                // Close mobile sidebar if open
                document.getElementById('docs-sidebar')?.classList.remove('show');
            });
        });
    }

    // Load Section Content
    function loadSection(id, anchorId = null) {
        const sec = window.DOCS_SECTIONS.find(s => s.id === id) || window.DOCS_SECTIONS[0];
        if (!sec) return;

        currentSectionId = sec.id;

        // Update active class in sidebar
        document.querySelectorAll('.sidebar-nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.target === sec.id);
        });

        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = sec.content;

            // Bind in-page Quick-Jump Table of Contents pills
            mainContent.querySelectorAll('.toc-jump-pill').forEach(pill => {
                pill.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = pill.getAttribute('href') || '';
                    const targetAnchor = href.replace(/^#/, '');
                    scrollToHeading(targetAnchor);
                });
            });

            if (anchorId) {
                setTimeout(() => scrollToHeading(anchorId), 60);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    function scrollToHeading(anchorId) {
        const el = document.getElementById(anchorId);
        if (!el) return;
        const headerOffset = 84;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
        });
        el.classList.add('heading-highlight-pulse');
        setTimeout(() => el.classList.remove('heading-highlight-pulse'), 2200);
    }

    // Copy to clipboard helper
    window.copyCode = function (button) {
        const codeBox = button.closest('.code-box');
        if (!codeBox) return;

        const code = codeBox.querySelector('pre code')?.innerText || '';
        navigator.clipboard.writeText(code).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fa fa-check text-success"></i> کپی شد!';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        });
    };

    // Quick Search & Modal (Deep Chapter + Subsection Search)
    function initSearch() {
        const modal = document.getElementById('search-modal');
        const searchInput = document.getElementById('search-input');
        const resultsList = document.getElementById('search-results');
        const openBtn = document.getElementById('btn-open-search');

        // Build deep heading index once
        const headingIndex = [];
        const headingRegex = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
        (window.DOCS_SECTIONS || []).forEach(sec => {
            let match;
            while ((match = headingRegex.exec(sec.content)) !== null) {
                const rawText = match[3].replace(/<[^>]+>/g, '').trim();
                if (rawText) {
                    headingIndex.push({
                        sectionId: sec.id,
                        sectionTitle: sec.title,
                        icon: sec.icon,
                        anchorId: match[2],
                        headingTitle: rawText
                    });
                }
            }
        });

        function openSearch() {
            if (!modal) return;
            modal.style.display = 'flex';
            searchInput.value = '';
            searchInput.focus();
            renderSearchResults('');
        }

        function closeSearch() {
            if (!modal) return;
            modal.style.display = 'none';
        }

        openBtn?.addEventListener('click', openSearch);

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) closeSearch();
        });

        // Key shortcuts (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openSearch();
            }
            if (e.key === 'Escape') {
                closeSearch();
            }
        });

        searchInput?.addEventListener('input', (e) => {
            renderSearchResults(e.target.value.trim());
        });

        function renderSearchResults(query) {
            if (!resultsList) return;
            if (!query) {
                resultsList.innerHTML = '<li class="p-3 text-muted text-center small">نام کامپوننت، تابع کمکی، تریت یا کلاس را جستجو کنید (مثال: x-plate-input, stringMaskFormatter, SelectController, DeleteDependency)...</li>';
                return;
            }

            const q = query.toLowerCase();
            const results = [];

            // 1. Exact/partial heading matches (high priority)
            headingIndex.forEach(h => {
                if (h.headingTitle.toLowerCase().includes(q)) {
                    results.push({
                        sectionId: h.sectionId,
                        anchorId: h.anchorId,
                        icon: h.icon,
                        title: h.headingTitle,
                        subtitle: `${h.sectionTitle}`
                    });
                }
            });

            // 2. Full-text section matches
            window.DOCS_SECTIONS.forEach(sec => {
                const titleMatch = sec.title.toLowerCase().includes(q);
                const contentMatch = sec.content.toLowerCase().includes(q);

                if (titleMatch || contentMatch) {
                    results.push({
                        sectionId: sec.id,
                        anchorId: null,
                        icon: sec.icon,
                        title: sec.title,
                        subtitle: sec.category
                    });
                }
            });

            if (results.length === 0) {
                resultsList.innerHTML = '<li class="p-3 text-muted text-center small">موردی یافت نشد.</li>';
                return;
            }

            const topResults = results.slice(0, 35);

            resultsList.innerHTML = topResults.map(m => `
                <li class="search-result-item" data-target="${m.sectionId}" data-anchor="${m.anchorId || ''}">
                    <i class="fa ${m.icon} text-primary"></i>
                    <div>
                        <div class="fw-semibold">${m.title}</div>
                        <small class="text-muted">${m.subtitle}</small>
                    </div>
                </li>
            `).join('');

            resultsList.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const target = item.dataset.target;
                    const anchor = item.dataset.anchor || null;
                    loadSection(target, anchor);
                    window.location.hash = target;
                    closeSearch();
                });
            });
        }
    }

    // Mobile Sidebar Drawer Toggle
    function initMobileToggle() {
        const toggleBtn = document.getElementById('mobile-sidebar-toggle');
        const sidebar = document.getElementById('docs-sidebar');

        toggleBtn?.addEventListener('click', () => {
            sidebar?.classList.toggle('show');
        });
    }

    // Init App
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        buildSidebar();
        initSearch();
        initMobileToggle();

        // Check hash
        const hash = window.location.hash.replace(/^#/, '');
        if (hash) {
            loadSection(hash);
        } else {
            loadSection('intro');
        }
    });

})();
