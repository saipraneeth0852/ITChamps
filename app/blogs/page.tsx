import Image from "next/image";
import Link from "next/link";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";
import { getBlogs } from "../../lib/cms/store";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getBlogs("public");
  const featured = blogs.find((blog) => blog.featured) ?? blogs[0];
  const categories = new Set(blogs.map((blog) => blog.category)).size;
  const taggedStories = blogs.filter((blog) => blog.tags.length >= 3).length;

  return (
    <main className="content-page blogs-page">
      <NarrativeBackdrop variant="home" />
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/blogs" aria-current="page">Blogs</Link>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an Expert
        </Link>
      </header>

      <section className="shell content-hero blogs-hero-compact">
        <div className="content-hero__copy">
          <p className="cs-eyebrow">Blogs</p>
          <h1>SAP & Enterprise Technology Insights</h1>
          <p>Strategic guidance, implementation playbooks, and operational best practices. Read our latest articles on S/4HANA, payroll, automation, and digital transformation.</p>
          <div className="case-studies-hero-support">
            <div className="case-studies-intro__stats blogs-intro__stats">
              <div>
                <strong>{blogs.length}</strong>
                <span>Published articles</span>
              </div>
              <div>
                <strong>{categories}</strong>
                <span>Content tracks</span>
              </div>
              <div>
                <strong>{taggedStories}</strong>
                <span>Multi-tag articles</span>
              </div>
            </div>
            <div className="case-studies-hero-notes">
              <div>
                <strong>What you will find</strong>
                <ul>
                  <li>S/4HANA implementation and governance guidance</li>
                  <li>Payroll, AMS, automation, and BTP playbooks</li>
                  <li>Practical lessons tied to execution outcomes</li>
                </ul>
              </div>
              <Link href="#all-blogs" className="button button--ghost">Browse all blogs</Link>
            </div>
          </div>
        </div>
        {featured ? (
          <article className="case-studies-hero-card blogs-hero-card">
            <div className="case-studies-hero-card__image">
              <Image src={featured.coverImage} alt={featured.title} fill sizes="(max-width: 900px) 100vw, 36vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="case-studies-hero-card__body">
              <p className="cs-eyebrow">Featured Article</p>
              <div className="content-card__meta">
                <span>{featured.category}</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="case-studies-hero-card__title">{featured.title}</h2>
              <p className="case-studies-hero-card__summary">{featured.excerpt}</p>
              <div className="content-card__tags">
                {featured.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <Link href={`/blogs/${featured.slug}`} className="button button--primary">Open featured article</Link>
            </div>
          </article>
        ) : null}
      </section>

      <section id="all-blogs" className="shell case-studies-catalog">
        <div className="section-line section-line--catalog">
          <div className="case-studies-catalog__heading">
            <p className="cs-eyebrow">All Blogs</p>
            <h2>Browse by strategy, implementation, and operating model topic.</h2>
          </div>
          <p className="case-studies-catalog__note">Each card opens into a dedicated article page with structured copy, cover media, and related reading.</p>
        </div>

        {blogs.length ? (
          <div className="content-grid blogs-grid">
            {blogs.filter((blog) => blog.id !== featured?.id).map((blog) => (
              <article key={blog.id} className="content-card content-card--blog">
                <div className="content-card__visual">
                  <Image src={blog.coverImage} alt={blog.title} fill sizes="(max-width: 900px) 100vw, 32vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="content-card__meta">
                  <span>{blog.category}</span>
                  <span>{blog.readTime}</span>
                </div>
                <h2 className="blog-card__title">{blog.title}</h2>
                <p className="blog-card__summary">{blog.excerpt}</p>
                <div className="content-card__detail-row">
                  <span>{blog.author}</span>
                  <span>{blog.publishedAt}</span>
                </div>
                <div className="content-card__tags">
                  {blog.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <Link href={`/blogs/${blog.slug}`} className="button button--ghost">Read article</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="content-empty">
            <h2>No published blogs yet.</h2>
            <p>Use the admin dashboard to publish your first article.</p>
          </div>
        )}
      </section>
    </main>
  );
}
