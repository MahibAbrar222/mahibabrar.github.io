import './Blog.css';
import { Helmet } from 'react-helmet';

type BlogPost = {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    link: string;
};

const posts: BlogPost[] = [
    {
        title: 'Designing Delightful Developer Experiences',
        excerpt:
            'Practical heuristics for crafting APIs, CLIs, and docs that make developers smile, ship faster, and stick around.',
        date: 'Feb 18, 2026',
        readTime: '6 min read',
        tags: ['DX', 'Product', 'APIs'],
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
        link: '/blog/designing-delightful-dx',
    },
    {
        title: 'From Idea to MVP: A Weekend Build Blueprint',
        excerpt:
            'A step-by-step weekend sprint plan: scoping, technical stack picks, ruthless prioritization, and launch checklists.',
        date: 'Jan 7, 2026',
        readTime: '8 min read',
        tags: ['Startup', 'Productivity', 'Shipping'],
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
        link: '/blog/weekend-mvp-blueprint',
    },
    {
        title: 'Taming State in React Without the Bloat',
        excerpt:
            'Lightweight patterns for managing complex UI state using hooks, context boundaries, and data fetching discipline.',
        date: 'Dec 12, 2025',
        readTime: '7 min read',
        tags: ['React', 'Frontend', 'Architecture'],
        image: 'https://images.unsplash.com/photo-1526378722484-cc5c7100df08?auto=format&fit=crop&w=900&q=80',
        link: '/blog/taming-state-react',
    },
    {
        title: 'Creating Calm Interfaces with Motion',
        excerpt:
            'How to use micro-animations responsibly so your UI feels alive without turning into a distraction.',
        date: 'Nov 2, 2025',
        readTime: '5 min read',
        tags: ['UI', 'Animation', 'UX'],
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        link: '/blog/calm-interfaces-motion',
    },
];

export default function Blog() {
    return (
        <div className="blog-page">
            <Helmet>
                <title>Blog – Mahib Abrar</title>
                <meta
                    name="description"
                    content="Articles on building modern web experiences, shipping faster, and crafting delightful developer products."
                />
            </Helmet>

            <section className="blog-hero">
                <div className="blog-hero__content">
                    <p className="eyebrow">Blog &amp; Insights</p>
                    <h1>Stories on building, shipping, and designing better products.</h1>
                    <p className="lead">
                        Curated notes on frontend craft, developer experience, and product thinking—designed to be practical and
                        concise.
                    </p>
                    <div className="hero-actions">
                        <a className="cta" href="#latest">Explore articles</a>
                        <a className="ghost" href="mailto:mahibabrar123@gmail.com">Suggest a topic</a>
                    </div>
                </div>
                <div className="blog-hero__card">
                    <div className="badge">Now writing</div>
                    <h3>Upcoming: "Product velocity with tiny teams"</h3>
                    <p>Notes on balancing scope, quality, and speed without burning out.</p>
                    <div className="meta">Draft · ETA: next week</div>
                </div>
            </section>

            <section id="latest" className="blog-grid">
                {posts.map((post) => (
                    <article key={post.link} className="post-card">
                        <div className="post-media">
                            <img src={post.image} alt={post.title} loading="lazy" />
                            <div className="media-overlay" />
                        </div>
                        <div className="post-body">
                            <div className="post-top">
                                <span className="meta">{post.date}</span>
                                <span className="meta">{post.readTime}</span>
                            </div>
                            <h2>{post.title}</h2>
                            <p className="excerpt">{post.excerpt}</p>
                            <div className="tag-row">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="post-actions">
                                <a href={post.link} className="read-more">Read article</a>
                                <span className="hint">Save · Share · Discuss</span>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}