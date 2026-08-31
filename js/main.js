document.documentElement.classList.add("js");

const ICONS = {
  expert: `<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20M8 7h8M8 11h5"/><path d="m17.5 3 .65 1.85L20 5.5l-1.85.65-.65 1.85-.65-1.85L15 5.5l1.85-.65L17.5 3Z"/></svg>`,
  workshop: `<svg viewBox="0 0 24 24"><path d="m14.7 6.3 3-3a5 5 0 0 0-6.4 6.4l-7.1 7.1a2.12 2.12 0 0 0 3 3l7.1-7.1a5 5 0 0 0 6.4-6.4l-3 3-3-3Z"/><path d="m5.5 18.5 1-1M17 7l-1-1"/></svg>`,
  housing: `<svg viewBox="0 0 24 24"><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10M9 20v-6h6v6"/><path d="M16.5 7.5h2v3h-2z"/><path d="M12 8.5v2"/></svg>`,
  inventory: `<svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h17"/><path d="m7 15 3-4 3 2 5-7"/><path d="M18 6h2v2"/><path d="M8 19v-2M12 19v-5M16 19v-3M20 19v-7"/></svg>`,
};

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[character]));

const currentPage = document.body.dataset.page;
const navigationPage = currentPage === "project-detail" ? "projects" : currentPage;
const isNestedPage = window.location.pathname.includes("/pages/");
const resolveRoute = (route) => {
  if (!isNestedPage) return route;
  return route.startsWith("pages/") ? route.slice("pages/".length) : `../${route}`;
};

function renderNavigation(data) {
  const brand = document.querySelector("[data-brand]");
  const list = document.querySelector("[data-nav-list]");
  if (!brand || !list) return;

  brand.textContent = data.profile.brand;
  brand.href = resolveRoute("index.html");
  list.innerHTML = data.navigation.map((item) => {
    const active = item.id === navigationPage;
    return `<a data-page-link="${escapeHtml(item.id)}" class="${active ? "active" : ""}" href="${resolveRoute(item.route)}"${active ? ' aria-current="page"' : ""}>${escapeHtml(item.label)}</a>`;
  }).join("");
}

function renderFooter(data) {
  const footer = document.querySelector("[data-footer]");
  if (!footer) return;
  footer.innerHTML = `<p>© ${escapeHtml(data.profile.copyrightYear)} ${escapeHtml(data.profile.name).toUpperCase()}</p><p>${escapeHtml(data.profile.footerRole)}</p>`;
}

function renderStats(stats) {
  return stats.map((stat) => `<div><span class="stat-num">${escapeHtml(stat.value)}</span><span class="stat-label">${escapeHtml(stat.label)}</span></div>`).join("");
}

function renderSkills(skills) {
  return skills.map((skill) => `
    <article class="skill-card reveal">
      <div class="skill-icon">${escapeHtml(skill.icon)}</div>
      <div class="skill-name">${escapeHtml(skill.title)}</div>
      <div class="skill-tags">${skill.tags.map((tag) => `<span class="tag ${escapeHtml(skill.tone)}">${escapeHtml(tag)}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderProjectCard(project, showHighlights = true) {
  const highlights = showHighlights && project.highlights.length ? `
    <div class="project-highlights">
      ${project.highlights.map((highlight) => `<div class="highlight">${escapeHtml(highlight)}</div>`).join("")}
    </div>
  ` : "";
  return `
    <article class="project-card ${project.featured ? "featured" : ""} reveal" data-project="${escapeHtml(project.id)}" data-detail-href="${resolveRoute("pages/project-detail.html")}?id=${encodeURIComponent(project.id)}" role="link" tabindex="0">
      <div>
        <div class="project-visual" aria-hidden="true">
          <div class="project-icon-wrap"><div class="project-icon">${ICONS[project.icon] || ""}</div></div>
        </div>
        <div class="project-num">PROJECT ${escapeHtml(project.number)} · ${escapeHtml(project.category)}</div>
        <h3 class="project-name">${escapeHtml(project.name)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>
        <div class="project-stack">${project.stack.map((tag) => `<span class="stack-tag">${escapeHtml(tag)}</span>`).join("")}</div>
        <a class="project-detail-link" href="${resolveRoute("pages/project-detail.html")}?id=${encodeURIComponent(project.id)}">Lihat studi kasus <span aria-hidden="true">↗</span></a>
      </div>
      ${highlights}
    </article>
  `;
}

function renderDetailSection(section) {
  const parts = [];
  if (section.paragraphs) parts.push(section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join(""));
  if (section.subsections) {
    parts.push(section.subsections.map((subsection) => `<h3 class="detail-sub">${escapeHtml(subsection.title)}</h3>${(subsection.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}`).join(""));
  }
  if (section.list) parts.push(`<ul class="detail-list">${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
  if (section.stack) parts.push(`<div class="detail-stack-grid">${section.stack.map((item) => `<div class="detail-stack-item">${escapeHtml(item)}</div>`).join("")}</div>`);
  if (section.gallery) parts.push(`<div class="detail-gallery">${section.gallery.map((item, index) => `<div class="detail-gallery-item"><div class="detail-gallery-art">${escapeHtml(String(index + 1).padStart(2, "0"))}</div><span>${escapeHtml(item)}</span></div>`).join("")}</div>`);
  if (section.outcomes) parts.push(`<div class="detail-stats">${section.outcomes.map((outcome) => `<div class="detail-stat"><div class="detail-stat-value">${escapeHtml(outcome.value)}</div><div class="detail-stat-label">${escapeHtml(outcome.label)}</div></div>`).join("")}</div>`);
  return `<section class="detail-block reveal"><h2 class="detail-heading"><span class="detail-number">${escapeHtml(section.number)}</span>${escapeHtml(section.title)}</h2>${parts.join("")}</section>`;
}

function renderDetail(data) {
  const view = document.querySelector('[data-view="project-detail"]');
  if (!view) return;
  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = data.projects.find((item) => item.id === projectId);
  const detail = project && data.projectDetails[project.id];
  if (!project || !detail) {
    view.innerHTML = `<section class="page-hero"><div class="container"><div class="section-tag">PROJECT NOT FOUND</div><h1 class="section-title">Project tidak ditemukan.</h1><p class="page-hero-copy">Gunakan halaman project untuk memilih studi kasus yang tersedia.</p><div class="section-actions"><a class="btn-outline" href="${resolveRoute("pages/projects.html")}">Kembali ke Projects →</a></div></div></section>`;
    return;
  }

  const projectIndex = data.projects.findIndex((item) => item.id === project.id);
  const previous = data.projects[(projectIndex - 1 + data.projects.length) % data.projects.length];
  const next = data.projects[(projectIndex + 1) % data.projects.length];
  document.title = `${project.name} – DPB.DEV`;
  view.innerHTML = `
    <div class="detail-shell">
      <a class="detail-back" href="${resolveRoute("pages/projects.html")}">← Kembali ke semua project</a>
      <header class="detail-header">
        <div class="detail-tag-row"><span class="detail-tag">PROJECT ${escapeHtml(project.number)}</span><span class="detail-tag">${escapeHtml(project.category)}</span>${project.stack.slice(0, 3).map((tag) => `<span class="detail-tag">${escapeHtml(tag)}</span>`).join("")}</div>
        <h1>${escapeHtml(project.name)}</h1>
        <p class="detail-lede">${escapeHtml(detail.lede)}</p>
        <div class="detail-cta-row"><a class="btn-primary" href="${resolveRoute("pages/contact.html")}">Diskusikan Project</a><a class="btn-outline" href="${resolveRoute("pages/projects.html")}">Project Lainnya</a></div>
      </header>
      <div class="detail-cover reveal"><div class="detail-cover-art" data-project="${escapeHtml(project.id)}"><div class="project-icon-wrap"><div class="project-icon">${ICONS[project.icon] || ""}</div></div><span class="detail-cover-label">${escapeHtml(detail.coverLabel)}</span></div><p class="detail-cover-caption">${escapeHtml(detail.coverCaption)}</p></div>
      <div class="detail-info-grid reveal"><div class="detail-info-item"><div class="detail-info-label">Peran</div><div class="detail-info-value">${escapeHtml(detail.role)}</div></div><div class="detail-info-item"><div class="detail-info-label">Tipe</div><div class="detail-info-value">${escapeHtml(detail.type)}</div></div><div class="detail-info-item"><div class="detail-info-label">Status</div><div class="detail-info-value">${escapeHtml(detail.status)}</div></div><div class="detail-info-item"><div class="detail-info-label">Dokumentasi</div><div class="detail-info-value">${escapeHtml(detail.documentation)}</div></div></div>
      ${detail.sections.map(renderDetailSection).join("")}
      <div class="detail-project-nav"><a href="${resolveRoute("pages/project-detail.html")}?id=${encodeURIComponent(previous.id)}"><span class="detail-direction">← Sebelumnya</span>${escapeHtml(previous.name)}</a><a class="next" href="${resolveRoute("pages/project-detail.html")}?id=${encodeURIComponent(next.id)}"><span class="detail-direction">Selanjutnya →</span>${escapeHtml(next.name)}</a></div>
      <div class="detail-contact-cta"><p>Tertarik dengan pendekatan teknis di project ini?</p><a class="btn-primary" href="${resolveRoute("pages/contact.html")}">Hubungi Saya</a></div>
    </div>
  `;
}

function renderHome(data) {
  const view = document.querySelector('[data-view="home"]');
  if (!view) return;
  const copy = data.pages.home;
  const selectedProjects = data.projects.filter((project) => project.featured);
  view.innerHTML = `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-tag fade-up">${escapeHtml(copy.heroTag)}</div>
          <div class="hero"><h1 class="fade-up-2"><span class="line-1">${escapeHtml(data.profile.name.split(" ")[0])}</span><span class="line-2">${escapeHtml(data.profile.name.split(" ").slice(1).join(" "))}</span></h1></div>
          <p class="hero-desc fade-up-3">${escapeHtml(data.profile.heroDescription)}</p>
          <div class="hero-cta fade-up-4"><a class="btn-primary" href="${resolveRoute("pages/contact.html")}">Hubungi Saya</a><a class="btn-outline" href="${resolveRoute("pages/projects.html")}">Lihat Project →</a></div>
          <div class="hero-stats fade-up-4">${renderStats(data.profile.stats)}</div>
        </div>
        <div class="hero-display" aria-hidden="true"><div class="hero-panel"><div class="panel-top"><span></span><span></span><span></span></div><div class="code-line"></div><div class="code-line"></div><div class="code-line"></div><div class="code-line"></div><div class="code-caption">${escapeHtml(data.profile.heroPanelCaption)}</div></div></div>
      </div>
    </section>
    <section class="skills-section" id="skills"><div class="container"><div class="section-header reveal"><div class="section-tag">${escapeHtml(copy.skillsTag)}</div><h2 class="section-title">${escapeHtml(copy.skillsTitle)}</h2></div><div class="skills-grid">${renderSkills(data.skills)}</div></div></section>
    <section class="projects-section" id="featured-projects"><div class="container"><div class="section-header reveal"><div class="section-tag">${escapeHtml(copy.selectedTag)}</div><h2 class="section-title">${escapeHtml(copy.selectedTitle)}</h2><p class="section-intro">${escapeHtml(copy.selectedIntro)}</p></div><div class="projects-grid">${selectedProjects.map((project) => renderProjectCard(project)).join("")}</div><div class="section-actions"><a class="btn-outline" href="${resolveRoute("pages/projects.html")}">${escapeHtml(copy.selectedCta)}</a></div></div></section>
  `;
}

function renderProjects(data) {
  const view = document.querySelector('[data-view="projects"]');
  if (!view) return;
  const copy = data.pages.projects;
  view.innerHTML = `
    <section class="page-hero"><div class="container"><div class="section-tag fade-up">${escapeHtml(copy.tag)}</div><h1 class="section-title fade-up-2">${escapeHtml(copy.title)}</h1><p class="page-hero-copy fade-up-3">${escapeHtml(copy.intro)}</p></div></section>
    <section class="projects-section"><div class="container"><div class="projects-grid">${data.projects.map((project) => renderProjectCard(project)).join("")}</div></div></section>
  `;
}

function renderExperience(data) {
  const view = document.querySelector('[data-view="experience"]');
  if (!view) return;
  const copy = data.pages.experience;
  view.innerHTML = `
    <section class="page-hero"><div class="container"><div class="section-tag fade-up">${escapeHtml(copy.tag)}</div><h1 class="section-title fade-up-2">${escapeHtml(copy.title)}</h1><p class="page-hero-copy fade-up-3">${escapeHtml(copy.intro)}</p></div></section>
    <section class="experience-section"><div class="container"><div class="section-header reveal"><div class="section-tag">${escapeHtml(copy.experienceTag)}</div><h2 class="section-title">${escapeHtml(copy.experienceTitle)}</h2></div><div class="timeline">${data.experience.map((item) => `<article class="exp-card reveal"><div class="exp-date">${escapeHtml(item.period)}<br/>${escapeHtml(item.type)}</div><div><h3 class="exp-role">${escapeHtml(item.role)}</h3><div class="exp-company">${escapeHtml(item.company)}</div><ul class="exp-points">${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></div></article>`).join("")}</div></div></section>
    <section class="achievement-section"><div class="container"><div class="section-header reveal"><div class="section-tag">${escapeHtml(copy.achievementTag)}</div><h2 class="section-title">${escapeHtml(copy.achievementTitle)}</h2></div>${data.achievements.map((item) => `<article class="achievement-card reveal"><div class="achievement-badge" aria-hidden="true">${escapeHtml(item.rank)}</div><div><div class="achievement-label">${escapeHtml(item.label)}</div><h3 class="achievement-title">${escapeHtml(item.title)}<br/>${escapeHtml(item.event)}</h3><p class="achievement-sub">${escapeHtml(item.description)}</p></div></article>`).join("")}</div></section>
  `;
}

function renderContact(data) {
  const view = document.querySelector('[data-view="contact"]');
  if (!view) return;
  const copy = data.pages.contact;
  view.innerHTML = `
    <section class="page-hero"><div class="container"><div class="section-tag fade-up">${escapeHtml(copy.tag)}</div><h1 class="section-title fade-up-2">${escapeHtml(copy.title)}</h1><p class="page-hero-copy fade-up-3">${escapeHtml(copy.intro)}</p></div></section>
    <section class="contact-section"><div class="container"><div class="contact-grid"><div class="contact-info reveal"><div class="section-tag">${escapeHtml(copy.contactTag)}</div><h2 class="section-title">${escapeHtml(copy.contactTitle)}</h2><p>${escapeHtml(data.contact.intro)}</p><div class="contact-facts"><div>📍 ${escapeHtml(data.profile.location)}</div><div>🎓 ${escapeHtml(data.profile.education)}</div><div>💼 ${escapeHtml(data.profile.availability)}</div></div></div><div class="contact-links reveal">${data.contact.links.map((link) => `<a class="contact-link" href="${escapeHtml(link.href)}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ""}><span class="contact-link-icon">${escapeHtml(link.number)}</span><span class="contact-link-label">${escapeHtml(link.label)}</span></a>`).join("")}<div class="contact-note">${escapeHtml(data.contact.note)}</div></div></div></div></section>
  `;
}

function initialiseInteractions() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "CLOSE" : "MENU";
    });
    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "MENU";
    }));
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--rotate-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 4}deg`);
        card.style.setProperty("--rotate-x", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 4}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--rotate-x");
        card.style.removeProperty("--rotate-y");
      });
    });
  }

  document.querySelectorAll(".project-card[data-detail-href]").forEach((card) => {
    const openDetail = () => {
      window.location.href = card.dataset.detailHref;
    };
    card.addEventListener("click", (event) => {
      if (!event.target.closest("a")) openDetail();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail();
      }
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

async function boot() {
  try {
    const data = await window.PortfolioData.getPortfolioData();
    const pageData = data.pages[currentPage];
    document.title = pageData?.title || data.profile.name;
    const description = document.querySelector('meta[name="description"]');
    if (description && pageData?.description) description.setAttribute("content", pageData.description);
    renderNavigation(data);
    renderFooter(data);
    renderHome(data);
    renderProjects(data);
    renderExperience(data);
    renderContact(data);
    renderDetail(data);
    initialiseInteractions();
  } catch (error) {
    console.error(error);
    const view = document.querySelector("[data-page-root]");
    if (view) view.innerHTML = `<section class="page-hero"><div class="container"><div class="section-tag">DATA ERROR</div><h1 class="section-title">Konten belum dapat dimuat.</h1><p class="page-hero-copy">${escapeHtml(error.message)}</p></div></section>`;
  }
}

boot();