import { useEffect, useState } from 'react';
import { ArrowUp, Mail, Moon, Phone, Sun } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

type ThemeMode = 'system' | 'light' | 'dark';

const skillGroups = [
  { title: 'Backend', items: ['Java', 'Spring Boot', 'PHP', 'FastAPI'] },
  { title: 'Frontend', items: ['ReactJS', 'REST API'] },
  { title: 'Database', items: ['MySQL', 'SQL Server'] },
  { title: 'AI', items: ['AI Agent', 'Model Integration'] },
];

const projects = [
  {
    index: '01',
    title: 'Milk E-commerce Platform',
    description: 'Built with Java and Spring Boot, this backend-driven platform exposes REST APIs for product discovery, customer ordering, and order administration. MySQL stores product, customer, and order data through a structured relational schema designed for consistency and maintainability.',
    points: ['Java and Spring Boot service layers', 'MySQL relational database design', 'REST APIs for catalog and order flows'],
    tags: ['Java', 'Spring Boot', 'MySQL'],
    github: 'https://github.com/QuanHa2004/QuanLySua',
  },
  {
    index: '02',
    title: 'Fish Store Management',
    description: 'Developed with PHP for server-side business logic and MySQL for persistent sales data. The application manages daily operations, sales records, and revenue reports, helping the store monitor performance through reliable and easy-to-read statistics.',
    points: ['PHP-based sales and revenue logic', 'MySQL queries for revenue reporting', 'End-to-end team collaboration'],
    tags: ['PHP', 'MySQL', 'Product mindset'],
    github: 'https://github.com/minhquan0802/QuanLyVuaCa',
  },
];

const contacts = [
  { label: 'Email', icon: Mail, value: 'hahongquan2004@gmail.com', href: 'mailto:hahongquan2004@gmail.com' },
  { label: 'Phone', icon: Phone, value: '0768 954 882', href: 'tel:0768954882' },
  { label: 'GitHub', icon: FaGithub, value: 'QuanHa2004', href: 'https://github.com/QuanHa2004' },
  { label: 'LinkedIn', icon: FaLinkedinIn, value: 'quan-ha-8ba20739b', href: 'https://www.linkedin.com/in/quan-ha-8ba20739b' },
];

function ThemeButton({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button className="theme-button" type="button" onClick={onToggle} aria-label={`Switch to ${nextTheme} theme`} title={`Switch to ${nextTheme} theme`}>
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  });
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const theme = themeMode === 'system' ? (media.matches ? 'dark' : 'light') : themeMode;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      setActiveTheme(theme);
    };

    applyTheme();
    localStorage.setItem('portfolio-theme', themeMode);
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, [themeMode]);

  const toggleTheme = () => setThemeMode(activeTheme === 'dark' ? 'light' : 'dark');

  return (
    <div className="site-shell">
      <header className="topbar wrap">
        <nav aria-label="Main navigation">
          <a href="#skills">Stack</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero wrap">
          <div className="hero-copy">
            <h1>Hà Hồng Quân</h1>
            <p className="hero-role">Backend Developer</p>
            <div className="objective-block">
              <p>Final-year student focused on <strong>Java</strong> and <strong>Spring Boot</strong>, aiming to build scalable, secure, and high-performance systems. Ready to learn fast, collaborate effectively, and deliver high-quality solutions in a professional engineering environment.</p>
              <div className="objective-tags"><span>Scalable</span><span>Secure</span><span>High performance</span></div>
            </div>
            <div className="actions">
              <a className="button primary" href="#projects">View projects <span>↓</span></a>
              <a className="button secondary" href="/Ha-Hong-Quan-CV.pdf" download>Download CV <span>↗</span></a>
            </div>
          </div>
          <div className="developer-visual" aria-label="Backend development technologies">
            <span className="brace">{'{'}</span>
            <div className="visual-core"><small>BUILDING WITH</small><strong>JAVA</strong><span>Spring Boot · REST API</span></div>
            <span className="brace">{'}'}</span>
            <div className="code-chip chip-one">@Service</div>
            <div className="code-chip chip-two">MySQL</div>
            <div className="code-chip chip-three">200 OK</div>
          </div>
        </section>

        <section id="skills" className="section section-bordered">
          <div className="wrap">
          <div className="section-title"><h2>Tech stack</h2></div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="wrap">
            <div className="section-title"><h2>Projects</h2></div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-heading"><span className="project-index">{project.index}</span><h3>{project.title}</h3></div>
                  <p>{project.description}</p>
                  <ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  <a className="project-link" href={project.github} target="_blank" rel="noreferrer"><FaGithub size={15} aria-hidden="true" /> View repository</a>
                  <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section section-bordered">
          <div className="wrap">
          <div className="section-title"><h2>Education & certificate</h2></div>
          <div className="profile-grid">
            <article className="profile-card">
              <span className="profile-mark">STU</span>
              <h3>Saigon Technology University</h3>
              <p>Information Technology</p>
              <div><span>GPA 3.1</span></div>
            </article>
            <article className="profile-card">
              <span className="profile-mark">EN</span>
              <h3>TOEIC — 830</h3>
              <p>Valid until May 29, 2028</p>
              <div><span>English Proficiency</span></div>
            </article>
          </div>
          </div>
        </section>

      </main>

      <div className="floating-controls">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a className="floating-contact" key={contact.label} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={`${contact.label}: ${contact.value}`} data-tooltip={`${contact.label}: ${contact.value}`}>
              <Icon size={18} aria-hidden="true" />
            </a>
          );
        })}
        <ThemeButton theme={activeTheme} onToggle={toggleTheme} />
        <a className="back-to-top" href="#home" aria-label="Back to top" title="Back to top"><ArrowUp size={19} strokeWidth={2.2} aria-hidden="true" /></a>
      </div>
    </div>
  );
}

export default App;
