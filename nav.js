// ============================================================
// 文件：nav.js（v4.0）
// 功能：导航栏注入 + 页面高亮 + 深色模式适配
// 包含：首页 | 图片 | 攻略 | 我的（指向 mine.html）
// ============================================================

document.addEventListener("DOMContentLoaded", function() {
    var placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    // ---------- 注入导航栏 HTML ----------
    placeholder.innerHTML = `
        <style>
            /* ===== 导航栏基础样式（使用 CSS 变量适配深色模式） ===== */
            :root {
                --nav-bg: #4a5568;
                --nav-text: #e2e8f0;
                --nav-text-hover: #63b3ed;
                --nav-search-bg: rgba(255, 255, 255, 0.15);
                --nav-search-placeholder: #cbd5e0;
                --nav-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            [data-theme="dark"] {
                --nav-bg: #1a1a2e;
                --nav-text: #c0c8d8;
                --nav-text-hover: #7ab8ff;
                --nav-search-bg: rgba(255, 255, 255, 0.08);
                --nav-search-placeholder: #888;
                --nav-shadow: 0 2px 4px rgba(0,0,0,0.4);
            }

            .navbar {
                background-color: var(--nav-bg);
                width: 100%;
                height: 60px;
                box-shadow: var(--nav-shadow);
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1000;
                transition: background-color 0.4s ease, box-shadow 0.4s ease;
            }
            .nav-container {
                width: 60%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .nav-logo {
                color: #ffffff;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                white-space: nowrap;
                user-select: none;
                transition: color 0.3s;
            }
            .nav-logo:hover {
                color: #63b3ed;
            }
            .nav-links {
                display: flex;
                gap: 130px;
            }
            .nav-item {
                text-decoration: none;
                color: var(--nav-text);
                font-size: 16px;
                transition: color 0.3s;
                cursor: pointer;
                background: none;
                border: none;
                font-family: inherit;
                position: relative;
            }
            .nav-item:hover,
            .nav-item.active {
                color: var(--nav-text-hover);
                font-weight: 500;
            }
            .nav-item.active::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 100%;
                height: 2px;
                background: var(--nav-text-hover);
                border-radius: 2px;
            }
            .nav-search {
                position: relative;
                display: flex;
                align-items: center;
            }
            .nav-search input {
                background-color: var(--nav-search-bg);
                border: none;
                border-radius: 20px;
                padding: 8px 15px 8px 35px;
                color: #fff;
                outline: none;
                font-size: 14px;
                width: 180px;
                transition: background-color 0.3s;
            }
            .nav-search input::placeholder {
                color: var(--nav-search-placeholder);
            }
            .nav-search input:focus {
                background-color: rgba(255, 255, 255, 0.25);
            }
            .search-icon {
                position: absolute;
                left: 12px;
                width: 14px;
                height: 14px;
                fill: var(--nav-search-placeholder);
                pointer-events: none;
            }
            .page-content {
                padding-top: 80px !important;
            }

            /* ===== 深色模式额外适配 ===== */
            [data-theme="dark"] .nav-logo {
                color: #8bb8ff;
            }
            [data-theme="dark"] .nav-search input {
                color: #e0e8f0;
            }
            [data-theme="dark"] .nav-search input:focus {
                background-color: rgba(255, 255, 255, 0.15);
            }

            /* ===== 响应式 ===== */
            @media (max-width: 1024px) {
                .nav-container { width: 80%; }
                .nav-links { gap: 60px; }
            }
            @media (max-width: 768px) {
                .nav-container { width: 94%; }
                .nav-links { gap: 20px; }
                .nav-links .nav-item { font-size: 14px; }
                .nav-search input { width: 120px; font-size: 12px; padding: 6px 10px 6px 30px; }
                .search-icon { width: 12px; height: 12px; left: 10px; }
                .nav-logo { font-size: 16px; }
            }
            @media (max-width: 480px) {
                .nav-links { gap: 12px; }
                .nav-links .nav-item { font-size: 12px; }
                .nav-search input { width: 90px; font-size: 11px; padding: 5px 8px 5px 26px; }
                .search-icon { width: 10px; height: 10px; left: 8px; }
                .nav-logo { font-size: 14px; }
                .nav-container { gap: 6px; }
            }
        </style>

        <nav class="navbar">
            <div class="nav-container">
                <!-- Logo -->
                <div class="nav-logo" onclick="location.href='index.html'">MyNav</div>

                <!-- 导航菜单（四个页面完整关联） -->
                <div class="nav-links">
                    <a class="nav-item" href="index.html" id="nav-home">首页</a>
                    <a class="nav-item" href="images.html" id="nav-images">图片</a>
                    <a class="nav-item" href="guides.html" id="nav-strategy">攻略</a>
                    <a class="nav-item" href="mine.html" id="nav-mine">我的</a>  <!-- ✅ 已指向 mine.html -->
                </div>

                <!-- 搜索框 -->
                <div class="nav-search">
                    <svg class="search-icon" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <input type="text" placeholder="搜索本页内容..." id="navSearchInput">
                </div>
            </div>
        </nav>
    `;

    // ---------- 自动高亮当前页面（含 mine.html） ----------
    const path = window.location.pathname;
    const page = path.split("/").pop();

    const homeLink = document.getElementById('nav-home');
    const imagesLink = document.getElementById('nav-images');
    const strategyLink = document.getElementById('nav-strategy');
    const mineLink = document.getElementById('nav-mine');

    // 清除所有激活状态
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    // 根据当前页面高亮对应的导航项
    if (page === 'index.html' || page === '') {
        if (homeLink) homeLink.classList.add('active');
    } else if (page === 'images.html') {
        if (imagesLink) imagesLink.classList.add('active');
    } else if (page === 'guides.html') {
        if (strategyLink) strategyLink.classList.add('active');
    } else if (page === 'mine.html') {
        if (mineLink) mineLink.classList.add('active');  // ✅ “我的”页面高亮
    } else {
        // 其他未知页面默认高亮首页
        if (homeLink) homeLink.classList.add('active');
    }

    // ---------- 搜索筛选功能（各页面通用） ----------
    const searchInput = document.getElementById('navSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const keyword = e.target.value.trim().toLowerCase();
            const currentPage = window.location.pathname.split('/').pop();

            if (currentPage === 'index.html' || currentPage === '') {
                // 首页：筛选链接卡片
                const cards = document.querySelectorAll('#linkContainer .link-card');
                cards.forEach(card => {
                    card.style.display = card.textContent.toLowerCase().includes(keyword) ? '' : 'none';
                });
                const favCards = document.querySelectorAll('#quickLinksContainer .quick-link-card');
                favCards.forEach(card => {
                    card.style.display = card.textContent.toLowerCase().includes(keyword) ? '' : 'none';
                });
            } else if (currentPage === 'images.html') {
                // 图片页：按 alt 筛选
                const items = document.querySelectorAll('#linkContainer .gallery-item');
                items.forEach(item => {
                    const img = item.querySelector('img');
                    const alt = img ? img.alt.toLowerCase() : '';
                    item.style.display = alt.includes(keyword) ? '' : 'none';
                });
            } else if (currentPage === 'guides.html') {
                // 攻略页：筛选角色卡片 + 自动展开匹配分类
                const cards = document.querySelectorAll('#linkContainer .guide-card');
                cards.forEach(card => {
                    card.style.display = card.textContent.toLowerCase().includes(keyword) ? '' : 'none';
                });
                const categories = document.querySelectorAll('#linkContainer .accordion-category');
                categories.forEach(cat => {
                    const title = cat.querySelector('.category-title');
                    if (title && title.textContent.toLowerCase().includes(keyword)) {
                        cat.style.display = '';
                        cat.classList.add('active');
                        cat.querySelectorAll('.guide-card').forEach(c => c.style.display = '');
                        return;
                    }
                    const innerCards = cat.querySelectorAll('.guide-card');
                    let hasMatch = false;
                    innerCards.forEach(c => {
                        if (c.textContent.toLowerCase().includes(keyword)) {
                            c.style.display = '';
                            hasMatch = true;
                        } else {
                            c.style.display = 'none';
                        }
                    });
                    cat.style.display = hasMatch ? '' : 'none';
                    if (hasMatch) cat.classList.add('active');
                });
            }
            // mine.html 页面的搜索可以留空或后续扩展
        });
    }

    // ---------- 同步深色模式状态 ----------
    function syncTheme() {
        const theme = localStorage.getItem('myTheme') || 'light';
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
    syncTheme();

    // 监听其他页面触发的深色模式变化
    window.addEventListener('storage', function(e) {
        if (e.key === 'myTheme') {
            syncTheme();
        }
    });

    console.log('🧭 导航栏已加载 (v4.0)');
    console.log('📌 四个页面已关联: 首页 | 图片 | 攻略 | 我的');
});