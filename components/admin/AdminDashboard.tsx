"use client";

import { ChangeEvent, useMemo, useState } from "react";
import type { BlogRecord, CaseStudyRecord } from "../../lib/cms/types";

type Tab = "case-studies" | "blogs";
type FormState = Record<string, string>;

interface AdminDashboardProps {
  initialCaseStudies: CaseStudyRecord[];
  initialBlogs: BlogRecord[];
  showSecurityNotice: boolean;
}

const IMAGE_RULES = {
  maxBytes: 4 * 1024 * 1024,
  minWidth: 1200,
  minHeight: 675,
  ratio: 16 / 9,
  ratioTolerance: 0.08,
};

const emptyCaseStudy = {
  slug: "",
  client: "",
  abbr: "",
  featured: "false",
  sector: "",
  accentHex: "#007bb5",
  title: "",
  subtitle: "",
  heroImage: "",
  listImage: "",
  result: "",
  resultMetric: "",
  summary: "",
  challengeHeading: "",
  challengeContext: "",
  challengePoints: "",
  solutionHeading: "",
  solutionDescription: "",
  solutionSteps: "",
  resultMetrics: "",
  resultHighlights: "",
  services: "",
  technologies: "",
  duration: "",
  teamSize: "",
  countries: "",
  status: "draft",
};

const emptyBlog = {
  slug: "",
  featured: "false",
  title: "",
  excerpt: "",
  category: "",
  author: "",
  coverImage: "",
  readTime: "",
  publishedAt: "",
  tags: "",
  content: "",
  status: "draft",
};

const caseStudyFieldOrder = [
  "slug",
  "client",
  "abbr",
  "featured",
  "sector",
  "accentHex",
  "title",
  "subtitle",
  "heroImage",
  "listImage",
  "resultMetric",
  "result",
  "summary",
  "challengeHeading",
  "challengeContext",
  "challengePoints",
  "solutionHeading",
  "solutionDescription",
  "solutionSteps",
  "resultMetrics",
  "resultHighlights",
  "services",
  "technologies",
  "duration",
  "teamSize",
  "countries",
  "status",
];

const blogFieldOrder = [
  "slug",
  "featured",
  "title",
  "excerpt",
  "category",
  "author",
  "coverImage",
  "readTime",
  "publishedAt",
  "tags",
  "content",
  "status",
];

const longCaseStudyFields = new Set([
  "subtitle",
  "summary",
  "challengeContext",
  "challengePoints",
  "solutionDescription",
  "solutionSteps",
  "resultMetrics",
  "resultHighlights",
  "services",
  "technologies",
]);

const longBlogFields = new Set(["excerpt", "content", "tags"]);
const imageFields = new Set(["heroImage", "listImage", "coverImage"]);

function toCaseStudyForm(item: CaseStudyRecord): FormState {
  return {
    slug: item.slug,
    client: item.client,
    abbr: item.abbr,
    featured: item.featured ? "true" : "false",
    sector: item.sector,
    accentHex: item.accentHex,
    title: item.title,
    subtitle: item.subtitle,
    heroImage: item.heroImage,
    listImage: item.listImage,
    result: item.result,
    resultMetric: item.resultMetric,
    summary: item.summary,
    challengeHeading: item.challenge.heading,
    challengeContext: item.challenge.context,
    challengePoints: item.challenge.points.join("\n"),
    solutionHeading: item.solution.heading,
    solutionDescription: item.solution.description,
    solutionSteps: item.solution.steps.map((step) => `${step.num}|${step.title}|${step.desc}`).join("\n"),
    resultMetrics: item.results.metrics.map((metric) => `${metric.value}|${metric.label}|${metric.description}`).join("\n"),
    resultHighlights: item.results.highlights.join("\n"),
    services: item.services.join(", "),
    technologies: item.technologies.join(", "),
    duration: item.duration,
    teamSize: item.teamSize,
    countries: item.countries ? String(item.countries) : "",
    status: item.status,
  };
}

function toBlogForm(item: BlogRecord): FormState {
  return {
    slug: item.slug,
    featured: item.featured ? "true" : "false",
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    author: item.author,
    coverImage: item.coverImage,
    readTime: item.readTime,
    publishedAt: item.publishedAt,
    tags: item.tags.join(", "),
    content: item.content,
    status: item.status,
  };
}

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function loadImageDimensions(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      resolve({ width: image.width, height: image.height });
      URL.revokeObjectURL(objectUrl);
    };
    image.onerror = () => {
      reject(new Error("Unable to read image dimensions."));
      URL.revokeObjectURL(objectUrl);
    };
    image.src = objectUrl;
  });
}

async function validateImageFile(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Use JPG, PNG, or WEBP images.");
  }
  if (file.size > IMAGE_RULES.maxBytes) {
    throw new Error("Image must be 4MB or smaller.");
  }

  const { width, height } = await loadImageDimensions(file);
  const ratio = width / height;
  const ratioDiff = Math.abs(ratio - IMAGE_RULES.ratio);

  if (width < IMAGE_RULES.minWidth || height < IMAGE_RULES.minHeight) {
    throw new Error("Image must be at least 1200x675.");
  }
  if (ratioDiff > IMAGE_RULES.ratioTolerance) {
    throw new Error("Use an image close to 16:9 so the page layout stays stable.");
  }
}

async function uploadImage(file: File, folder: "blogs" | "case-studies") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/admin/upload-image", {
    method: "POST",
    body: formData,
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? "Unable to upload image.");
  }

  return payload.src as string;
}

function ImageField({
  label,
  value,
  folder,
  onChange,
  onError,
  onStatus,
}: {
  label: string;
  value: string;
  folder: "blogs" | "case-studies";
  onChange: (value: string) => void;
  onError: (message: string) => void;
  onStatus: (message: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      onError("");
      onStatus("");
      await validateImageFile(file);
      setUploading(true);
      const src = await uploadImage(file, folder);
      onChange(src);
      onStatus(`${label} uploaded.`);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <label className="admin-field admin-field--full">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Paste image URL or upload a file" />
      <div className="admin-media-row">
        <label className="admin-upload">
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
          <span>{uploading ? "Uploading..." : "Upload image"}</span>
        </label>
        <p className="admin-help admin-help--inline">JPG, PNG, or WEBP. Max 4MB. Minimum 1200x675. Recommended 16:9.</p>
      </div>
      {value ? (
        <div className="admin-image-preview">
          <img src={value} alt={label} />
        </div>
      ) : null}
    </label>
  );
}

export function AdminDashboard({ initialCaseStudies, initialBlogs, showSecurityNotice }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("case-studies");
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(initialCaseStudies[0]?.id ?? null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(initialBlogs[0]?.id ?? null);
  const [caseStudyForm, setCaseStudyForm] = useState<FormState>(initialCaseStudies[0] ? toCaseStudyForm(initialCaseStudies[0]) : emptyCaseStudy);
  const [blogForm, setBlogForm] = useState<FormState>(initialBlogs[0] ? toBlogForm(initialBlogs[0]) : emptyBlog);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const selectedCaseStudy = useMemo(
    () => caseStudies.find((item) => item.id === selectedCaseStudyId) ?? null,
    [caseStudies, selectedCaseStudyId]
  );
  const selectedBlog = useMemo(
    () => blogs.find((item) => item.id === selectedBlogId) ?? null,
    [blogs, selectedBlogId]
  );

  function updateCaseStudyField(key: string, value: string) {
    setCaseStudyForm((current) => ({ ...current, [key]: value }));
  }

  function updateBlogField(key: string, value: string) {
    setBlogForm((current) => ({ ...current, [key]: value }));
  }

  function pickCaseStudy(item: CaseStudyRecord) {
    setSelectedCaseStudyId(item.id);
    setCaseStudyForm(toCaseStudyForm(item));
    setMessage("");
  }

  function pickBlog(item: BlogRecord) {
    setSelectedBlogId(item.id);
    setBlogForm(toBlogForm(item));
    setMessage("");
  }

  async function saveCaseStudy() {
    setPending(true);
    setMessage("");
    const url = selectedCaseStudy ? `/api/content/case-studies/${selectedCaseStudy.id}` : "/api/content/case-studies";
    const method = selectedCaseStudy ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(caseStudyForm),
    });
    const payload = await response.json();
    setPending(false);

    if (!response.ok) {
      setMessage(payload.error ?? "Unable to save case study.");
      return;
    }

    if (selectedCaseStudy) {
      setCaseStudies(caseStudies.map((item) => item.id === payload.item.id ? payload.item : item));
    } else {
      setCaseStudies([payload.item, ...caseStudies]);
    }

    setSelectedCaseStudyId(payload.item.id);
    setCaseStudyForm(toCaseStudyForm(payload.item));
    setMessage("Case study saved.");
  }

  async function saveBlog() {
    setPending(true);
    setMessage("");
    const url = selectedBlog ? `/api/content/blogs/${selectedBlog.id}` : "/api/content/blogs";
    const method = selectedBlog ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogForm),
    });
    const payload = await response.json();
    setPending(false);

    if (!response.ok) {
      setMessage(payload.error ?? "Unable to save blog.");
      return;
    }

    if (selectedBlog) {
      setBlogs(blogs.map((item) => item.id === payload.item.id ? payload.item : item));
    } else {
      setBlogs([payload.item, ...blogs]);
    }

    setSelectedBlogId(payload.item.id);
    setBlogForm(toBlogForm(payload.item));
    setMessage("Blog saved.");
  }

  async function removeCaseStudy() {
    if (!selectedCaseStudy || !window.confirm(`Delete ${selectedCaseStudy.client}?`)) return;
    setPending(true);
    const response = await fetch(`/api/content/case-studies/${selectedCaseStudy.id}`, { method: "DELETE" });
    setPending(false);
    if (!response.ok) {
      setMessage("Unable to delete case study.");
      return;
    }
    const next = caseStudies.filter((item) => item.id !== selectedCaseStudy.id);
    setCaseStudies(next);
    setSelectedCaseStudyId(next[0]?.id ?? null);
    setCaseStudyForm(next[0] ? toCaseStudyForm(next[0]) : emptyCaseStudy);
    setMessage("Case study deleted.");
  }

  async function removeBlog() {
    if (!selectedBlog || !window.confirm(`Delete ${selectedBlog.title}?`)) return;
    setPending(true);
    const response = await fetch(`/api/content/blogs/${selectedBlog.id}`, { method: "DELETE" });
    setPending(false);
    if (!response.ok) {
      setMessage("Unable to delete blog.");
      return;
    }
    const next = blogs.filter((item) => item.id !== selectedBlog.id);
    setBlogs(next);
    setSelectedBlogId(next[0]?.id ?? null);
    setBlogForm(next[0] ? toBlogForm(next[0]) : emptyBlog);
    setMessage("Blog deleted.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <div className="admin-head">
          <div>
            <p className="admin-kicker">Content CRM</p>
            <h1>Manage case studies and blogs</h1>
            <p className="admin-subcopy">Update website content without editing code. Drafts stay hidden until published.</p>
          </div>
          <div className="admin-actions">
            <a className="button button--ghost" href="/case-studies" target="_blank" rel="noreferrer">View case studies</a>
            <a className="button button--ghost" href="/blogs" target="_blank" rel="noreferrer">View blogs</a>
            <button className="button button--primary" onClick={logout}>Logout</button>
          </div>
        </div>

        {showSecurityNotice ? (
          <p className="admin-warning">Default admin credentials are active. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` before production.</p>
        ) : null}
        {message ? <p className="admin-flash">{message}</p> : null}

        <div className="admin-tabs">
          <button className={activeTab === "case-studies" ? "is-active" : ""} onClick={() => setActiveTab("case-studies")}>Case studies</button>
          <button className={activeTab === "blogs" ? "is-active" : ""} onClick={() => setActiveTab("blogs")}>Blogs</button>
        </div>

        {activeTab === "case-studies" ? (
          <div className="admin-grid">
            <aside className="admin-list">
              <button className="admin-add" onClick={() => {
                setSelectedCaseStudyId(null);
                setCaseStudyForm(emptyCaseStudy);
                setMessage("");
              }}>+ New case study</button>
              {caseStudies.map((item) => (
                <button
                  key={item.id}
                  className={item.id === selectedCaseStudyId ? "admin-list-item is-selected" : "admin-list-item"}
                  onClick={() => pickCaseStudy(item)}
                >
                  <strong>{item.client}</strong>
                  <span>{item.featured ? `${item.status} · featured` : item.status}</span>
                </button>
              ))}
            </aside>

            <section className="admin-editor">
              <div className="admin-form-grid">
                {caseStudyFieldOrder.map((key) => {
                  const value = caseStudyForm[key] ?? "";
                  if (imageFields.has(key)) {
                    return (
                      <ImageField
                        key={key}
                        label={formatLabel(key)}
                        value={value}
                        folder="case-studies"
                        onChange={(nextValue) => updateCaseStudyField(key, nextValue)}
                        onError={setMessage}
                        onStatus={setMessage}
                      />
                    );
                  }
                  if (key === "status") {
                    return (
                      <label key={key} className="admin-field">
                        <span>{formatLabel(key)}</span>
                        <select value={value} onChange={(event) => updateCaseStudyField(key, event.target.value)}>
                          <option value="draft">draft</option>
                          <option value="published">published</option>
                        </select>
                      </label>
                    );
                  }
                  if (key === "featured") {
                    return (
                      <label key={key} className="admin-field">
                        <span>{formatLabel(key)}</span>
                        <select value={value} onChange={(event) => updateCaseStudyField(key, event.target.value)}>
                          <option value="false">standard</option>
                          <option value="true">featured hero card</option>
                        </select>
                      </label>
                    );
                  }
                  return (
                    <label key={key} className={longCaseStudyFields.has(key) ? "admin-field admin-field--full" : "admin-field"}>
                      <span>{formatLabel(key)}</span>
                      {longCaseStudyFields.has(key) ? (
                        <textarea value={value} onChange={(event) => updateCaseStudyField(key, event.target.value)} rows={key === "summary" ? 4 : 6} />
                      ) : (
                        <input value={value} onChange={(event) => updateCaseStudyField(key, event.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <p className="admin-help">Use one line per point. For steps use `01|Title|Description`. For metrics use `40%|Efficiency gain|Description`.</p>
              <div className="admin-editor-actions">
                <button className="button button--primary" disabled={pending} onClick={saveCaseStudy}>
                  {pending ? "Saving..." : "Save case study"}
                </button>
                {selectedCaseStudy ? <button className="button admin-delete" disabled={pending} onClick={removeCaseStudy}>Delete</button> : null}
              </div>
            </section>
          </div>
        ) : (
          <div className="admin-grid">
            <aside className="admin-list">
              <button className="admin-add" onClick={() => {
                setSelectedBlogId(null);
                setBlogForm(emptyBlog);
                setMessage("");
              }}>+ New blog</button>
              {blogs.map((item) => (
                <button
                  key={item.id}
                  className={item.id === selectedBlogId ? "admin-list-item is-selected" : "admin-list-item"}
                  onClick={() => pickBlog(item)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.featured ? `${item.status} · featured` : item.status}</span>
                </button>
              ))}
            </aside>

            <section className="admin-editor">
              <div className="admin-form-grid">
                {blogFieldOrder.map((key) => {
                  const value = blogForm[key] ?? "";
                  if (imageFields.has(key)) {
                    return (
                      <ImageField
                        key={key}
                        label={formatLabel(key)}
                        value={value}
                        folder="blogs"
                        onChange={(nextValue) => updateBlogField(key, nextValue)}
                        onError={setMessage}
                        onStatus={setMessage}
                      />
                    );
                  }
                  if (key === "status") {
                    return (
                      <label key={key} className="admin-field">
                        <span>{formatLabel(key)}</span>
                        <select value={value} onChange={(event) => updateBlogField(key, event.target.value)}>
                          <option value="draft">draft</option>
                          <option value="published">published</option>
                        </select>
                      </label>
                    );
                  }
                  if (key === "featured") {
                    return (
                      <label key={key} className="admin-field">
                        <span>{formatLabel(key)}</span>
                        <select value={value} onChange={(event) => updateBlogField(key, event.target.value)}>
                          <option value="false">standard</option>
                          <option value="true">featured hero card</option>
                        </select>
                      </label>
                    );
                  }
                  return (
                    <label key={key} className={longBlogFields.has(key) ? "admin-field admin-field--full" : "admin-field"}>
                      <span>{formatLabel(key)}</span>
                      {longBlogFields.has(key) ? (
                        <textarea value={value} onChange={(event) => updateBlogField(key, event.target.value)} rows={key === "content" ? 14 : 4} />
                      ) : (
                        <input value={value} onChange={(event) => updateBlogField(key, event.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <p className="admin-help">Blog content supports simple markdown-style lines like `# Heading` and `- bullet`.</p>
              <div className="admin-editor-actions">
                <button className="button button--primary" disabled={pending} onClick={saveBlog}>
                  {pending ? "Saving..." : "Save blog"}
                </button>
                {selectedBlog ? <button className="button admin-delete" disabled={pending} onClick={removeBlog}>Delete</button> : null}
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
