import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import './Blog.css';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { getAllPostSummaries, type Locale } from './lib/blogPosts';

function getDateTimeValue(date: string): string | undefined {
    const nativeParsed = Date.parse(date);
    if (!Number.isNaN(nativeParsed)) {
        return new Date(nativeParsed).toISOString();
    }

    const dmyMatch = date.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (!dmyMatch) {
        return undefined;
    }

    const [, dd, mm, yyyy] = dmyMatch;
    const parsed = Date.parse(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}T00:00:00Z`);
    if (Number.isNaN(parsed)) {
        return undefined;
    }

    return new Date(parsed).toISOString();
}

export default function Blog() {
    const location = useLocation();
    const locale: Locale = location.pathname.startsWith('/bn/blog') ? 'bn' : 'en';
    const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setIsLanguageSwitching(false);
        }, 260);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [location.pathname]);

    const posts = useMemo(() => getAllPostSummaries(locale), [locale]);

    const englishBlogUrl = 'https://itsmahibabrar.github.io/blog';
    const banglaBlogUrl = 'https://itsmahibabrar.github.io/bn/blog';
    const currentUrl = locale === 'bn' ? banglaBlogUrl : englishBlogUrl;
    const pageTitle = locale === 'bn' ? 'ব্লগ - Mahib Abrar' : 'Blog - Mahib Abrar';
    const pageDescription = locale === 'bn'
        ? 'ওয়েব ডেভেলপমেন্ট, প্রোডাক্ট ডিজাইন এবং ডেভেলপার এক্সপেরিয়েন্স নিয়ে সংক্ষিপ্ত আর ব্যবহারিক লেখা।'
        : 'Articles on building modern web experiences, shipping faster, and crafting delightful developer products.';
    const languageSwitchPath = locale === 'en' ? '/bn/blog' : '/blog';
    const languageSwitchLabel = locale === 'en' ? 'বাংলা পড়ুন' : 'Read in English';
    const ogLocale = locale === 'bn' ? 'bn_BD' : 'en_US';
    const ogAlternateLocale = locale === 'bn' ? 'en_US' : 'bn_BD';
    const htmlLang = locale === 'bn' ? 'bn' : 'en';

    return (
        <div className={`blog-page ${locale === 'bn' ? 'blog-page--bn' : ''} ${isLanguageSwitching ? 'is-switching-locale' : ''}`}>
            <Helmet>
                <html lang={htmlLang} />
                <title>{pageTitle}</title>
                <meta
                    name="description"
                    content={pageDescription}
                />

                {/* SEO */}
                <meta
                    name="keywords"
                    content="Mahib Abrar, blog, web development, frontend, developer experience, product design, performance, accessibility"
                />
                <meta name="author" content="Mahib Abrar" />
                {/* Open Graph */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content="https://avatars.githubusercontent.com/u/128323013?v=4" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:locale" content={ogLocale} />
                <meta property="og:locale:alternate" content={ogAlternateLocale} />
                <link rel="canonical" href={currentUrl} />
                <link rel="alternate" hrefLang="en" href={englishBlogUrl} />
                <link rel="alternate" hrefLang="bn" href={banglaBlogUrl} />
                <link rel="alternate" hrefLang="x-default" href={englishBlogUrl} />
            </Helmet>

            <div className="blog-toolbar">
                <Link
                    to={languageSwitchPath}
                    className="lang-switch-btn"
                    onClick={() => setIsLanguageSwitching(true)}
                >
                    {languageSwitchLabel}
                </Link>
            </div>

            <section className="blog-hero">
                <div className="blog-hero__content">
                    <p className="eyebrow">{locale === 'bn' ? 'ব্লগ ও নোটস' : 'Blog and Insights'}</p>
                    <h1>{locale === 'bn' ? 'ওয়েব, প্রোডাক্ট আর শেখার যাত্রা নিয়ে গল্প' : 'Stories on building products and better web experiences'}</h1>
                    <p className="lead">
                        {locale === 'bn'
                            ? 'ফ্রন্টএন্ড, ডেভেলপার এক্সপেরিয়েন্স আর প্র্যাকটিক্যাল শেখার ছোট ছোট লেখা।'
                            : 'Curated notes on frontend craft, developer experience, and product thinking, designed to stay practical and concise.'}
                    </p>
                    <div className="hero-actions">
                        <a className="blog-cta" href="#latest">{locale === 'bn' ? 'আর্টিকেল পড়ুন' : 'Explore articles'}</a>
                        <a className="blog-ghost" href="mailto:mahibabrar123@gmail.com">{locale === 'bn' ? 'বিষয় সাজেস্ট করুন' : 'Suggest a topic'}</a>
                    </div>
                </div>
                <div className="blog-hero__card">
                    <div className="badge">{locale === 'bn' ? 'চলমান লেখা' : 'Now writing'}</div>
                    <h3>Upcoming: "First Journey into esp32 Development"</h3>
                    <p>
                        {locale === 'bn'
                            ? 'ESP32 নিয়ে শুরু করার অভিজ্ঞতা, ভুল, শেখা আর বাস্তব নোট।'
                            : 'Notes from my first hands-on ESP32 journey, including mistakes, wins, and practical takeaways.'}
                    </p>
                    <div className="post-meta">{locale === 'bn' ? 'ড্রাফট - সময়: শীঘ্রই' : 'Draft - ETA: soon'}</div>
                </div>
            </section>

            <section id="latest" className="blog-grid">
                {posts.length === 0 && (
                    <article className="post-empty-state">
                        <h2>{locale === 'bn' ? 'এখনও কোনো পোস্ট প্রকাশিত হয়নি' : 'No posts published yet'}</h2>
                    </article>
                )}
                {posts.map((post, index) => {
                    const animationStyle: CSSProperties = {
                        animationDelay: `${index * 70}ms`,
                    };
                    const dateTimeValue = getDateTimeValue(post.date);

                    return (
                    <article key={post.link} className="post-card" style={animationStyle}>
                        <div className="post-media">
                            <img src={post.thumbnail} alt={post.title} loading="lazy" width={1200} height={630} />
                            <div className="media-overlay" />
                        </div>
                        <div className="post-body">
                            <div className="post-top">
                                <time className="post-meta" dateTime={dateTimeValue}>{post.date}</time>
                                <span className="post-meta">{post.readTime}</span>
                            </div>
                            <h2>{post.title}</h2>
                            <p className="excerpt">{post.excerpt}</p>
                            <div className="post-tag-row">
                                {post.keywords.slice(0, 4).map((tag) => (
                                    <span key={tag} className="post-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="post-actions">
                                <Link to={post.link} className="read-more">
                                    {locale === 'bn' ? 'আরও পড়ুন' : 'Read article'}
                                </Link>
                                <span className="hint">{locale === 'bn' ? 'পড়ুন · শেয়ার করুন · আলোচনা করুন' : 'Save - Share - Discuss'}</span>
                            </div>
                        </div>
                    </article>
                    );
                })}
            </section>
        </div>
    );
}