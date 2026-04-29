import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NarrativeBackdrop } from "../../../components/NarrativeBackdrop";
import { getBlogBySlug, getBlogs } from "../../../lib/cms/store";

export const dynamic = "force-dynamic";

function renderBlogContent(content: string) {
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.map((line, index) => {
    if (line.startsWith("# ")) return { type: "heading", value: line.slice(2), key: `${line}-${index}` };
    if (line.startsWith("- ")) return { type: "bullet", value: line.slice(2), key: `${line}-${index}` };
    return { type: "paragraph", value: line, key: `${line}-${index}` };
  });
}

function formatPublishedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const parts = renderBlogContent(blog.content);
  const related = (await getBlogs("public")).filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <main className="content-page">
      <NarrativeBackdrop variant="home" />
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/blogs">Blogs</Link>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an Expert
        </Link>
      </header>

      <article className="shell article-shell">
        <section className="story-hero story-hero--blog">
          <div className="story-hero__copy">
            <Link href="/blogs" className="article-back">Back to blogs</Link>
            <div className="content-card__meta">
              <span>{blog.category}</span>
              <span>{blog.author}</span>
              <span>{blog.readTime}</span>
            </div>
            <h1>{blog.title}</h1>
            <p className="story-hero__lede">{blog.excerpt}</p>
            <div className="story-hero__facts">
              <span>Published: {formatPublishedDate(blog.publishedAt)}</span>
              {blog.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="story-hero__media">
            <Image src={blog.coverImage} alt={blog.title} fill sizes="(max-width: 900px) 100vw, 48vw" style={{ objectFit: "cover" }} priority />
          </div>
        </section>

        <section className="story-panel story-panel--article">
          <div className="article-body">
            {parts.map((item) => {
              if (item.type === "heading") return <h2 key={item.key}>{item.value}</h2>;
              if (item.type === "bullet") {
                return (
                  <ul key={item.key} className="story-list">
                    <li>{item.value}</li>
                  </ul>
                );
              }
              return <p key={item.key}>{item.value}</p>;
            })}
          </div>
        </section>

        {related.length ? (
          <section className="story-panel">
            <div className="section-line">
              <div>
                <p className="cs-eyebrow">Keep Reading</p>
                <h2>Related articles</h2>
              </div>
              <Link href="/blogs" className="button button--ghost">See all</Link>
            </div>
            <div className="content-grid content-grid--nested">
              {related.map((item) => (
                <article key={item.id} className="content-card">
                  <div className="content-card__visual">
                    <Image src={item.coverImage} alt={item.title} fill sizes="(max-width: 900px) 100vw, 30vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="content-card__meta">
                    <span>{item.category}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <Link href={`/blogs/${item.slug}`} className="button button--ghost">Read article</Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
