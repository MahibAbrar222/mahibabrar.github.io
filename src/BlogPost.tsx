import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';
import './Blog.css';
import { getPostBySlug, hasPostInLocale, type BlogPostEntry, type Locale } from './lib/blogPosts';
import { JsonLd } from 'react-schemaorg';
import type { BlogPosting } from 'schema-dts';

type LoadState = 'loading' | 'ready' | 'not-found';

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

function renderMarkdownBlocks(markdown: string): ReactElement[] {
    const blocks = markdown
        .split(/\n\s*\n/g)
        .map((block) => block.trim())
        .filter(Boolean);

    return blocks.map((block, index) => {
        if (block.startsWith('### ')) {
            return <h3 key={`block-${index}`}>{block.slice(4).trim()}</h3>;
        }
        if (block.startsWith('## ')) {
            return <h2 key={`block-${index}`}>{block.slice(3).trim()}</h2>;
        }
        if (block.startsWith('# ')) {
            return <h1 key={`block-${index}`}>{block.slice(2).trim()}</h1>;
        }

        const listLines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        const isBulletList = listLines.length > 0 && listLines.every((line) => line.startsWith('- '));
        if (isBulletList) {
            return (
                <ul key={`block-${index}`}>
                    {listLines.map((line, itemIndex) => (
                        <li key={`item-${itemIndex}`}>{line.slice(2).trim()}</li>
                    ))}
                </ul>
            );
        }

        return <p key={`block-${index}`}>{block}</p>;
    });
}

export default function BlogPost() {
    const { slug } = useParams();
    const location = useLocation();
    const baseSiteUrl = 'https://itsmahibabrar.github.io';
    const locale: Locale = location.pathname.startsWith('/bn/blog') ? 'bn' : 'en';
    const alternateLocale: Locale = locale === 'en' ? 'bn' : 'en';
    const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
    const [state, setState] = useState<LoadState>('loading');
    const [post, setPost] = useState<BlogPostEntry | null>(null);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setIsLanguageSwitching(false);
        }, 260);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [location.pathname]);

    useEffect(() => {
        let cancelled = false;

        async function loadPost() {
            if (!slug) {
                setState('not-found');
                setPost(null);
                return;
            }

            setState('loading');
            const foundPost = await getPostBySlug(slug, locale);

            if (cancelled) {
                return;
            }

            if (!foundPost) {
                setPost(null);
                setState('not-found');
                return;
            }

            setPost(foundPost);
            setState('ready');
        }

        loadPost();

        return () => {
            cancelled = true;
        };
    }, [slug, locale]);

    const renderedBlocks = useMemo(() => {
        if (!post) {
            return [];
        }
        return renderMarkdownBlocks(post.content);
    }, [post]);

    const pageTitle = post ? `${post.title} – Mahib Abrar` : 'Article – Mahib Abrar';
    const pageDescription = post?.metaDescription || (locale === 'bn'
        ? 'Mahib Abrar ব্লগে সর্বশেষ আর্টিকেল পড়ুন।'
        : 'Read the latest article on Mahib Abrar blog.');
    const englishPostUrl = slug && hasPostInLocale(slug, 'en') ? `${baseSiteUrl}/blog/${slug}` : undefined;
    const banglaPostUrl = slug && hasPostInLocale(slug, 'bn') ? `${baseSiteUrl}/bn/blog/${slug}` : undefined;
    const alternatePostUrl = locale === 'en' ? banglaPostUrl : englishPostUrl;
    const pageUrl = post?.canonicalUrl
        || (locale === 'bn' ? banglaPostUrl : englishPostUrl)
        || `${baseSiteUrl}${locale === 'bn' ? '/bn/blog' : '/blog'}/${slug || ''}`;
    const backPath = locale === 'bn' ? '/bn/blog' : '/blog';
    const backLabel = locale === 'bn' ? 'ব্লগে ফিরে যান' : 'Back to blog';
    const languageSwitchPath = alternatePostUrl
        ? (alternateLocale === 'bn' ? `/bn/blog/${slug}` : `/blog/${slug}`)
        : (alternateLocale === 'bn' ? '/bn/blog' : '/blog');
    const languageSwitchLabel = alternatePostUrl
        ? (locale === 'en' ? 'বাংলা পড়ুন' : 'Read in English')
        : (locale === 'en' ? 'বাংলা ব্লগ দেখুন' : 'View English blog');
    const publishedDateTime = post ? getDateTimeValue(post.date) : undefined;
    const robotsContent = state === 'not-found' ? 'noindex, nofollow' : (post?.robots || 'index, follow');
    const ogLocale = locale === 'bn' ? 'bn_BD' : 'en_US';
    const ogAlternateLocale = locale === 'bn' ? 'en_US' : 'bn_BD';
    const htmlLang = locale === 'bn' ? 'bn' : 'en';

    return (
        <div className={`blog-page blog-post-page ${locale === 'bn' ? 'blog-page--bn' : ''} ${isLanguageSwitching ? 'is-switching-locale' : ''}`}>
            <Helmet>
                <html lang={htmlLang} />
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={post?.keywords.join(', ') || 'blog, article'} />
                <meta name="author" content="Mahib Abrar" />
                <meta name="robots" content={robotsContent} />
                <link rel="canonical" href={pageUrl} />
                {englishPostUrl && <link rel="alternate" hrefLang="en" href={englishPostUrl} />}
                {banglaPostUrl && <link rel="alternate" hrefLang="bn" href={banglaPostUrl} />}
                {englishPostUrl && <link rel="alternate" hrefLang="x-default" href={englishPostUrl} />}

                <meta property="og:title" content={post?.ogTitle || pageTitle} />
                <meta property="og:description" content={post?.ogDescription || pageDescription} />
                <meta property="og:type" content={post?.ogType || 'article'} />
                <meta property="og:image" content={post?.ogImage || 'https://avatars.githubusercontent.com/u/128323013?v=4'} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:locale" content={ogLocale} />
                <meta property="og:locale:alternate" content={ogAlternateLocale} />
                {publishedDateTime && <meta property="article:published_time" content={publishedDateTime} />}

                <meta name="twitter:card" content={post?.twitterCard || 'summary_large_image'} />
                <meta name="twitter:title" content={post?.ogTitle || pageTitle} />
                <meta name="twitter:description" content={post?.ogDescription || pageDescription} />
                <meta name="twitter:image" content={post?.ogImage || 'https://avatars.githubusercontent.com/u/128323013?v=4'} />
            </Helmet>
            <JsonLd<BlogPosting>
                item={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post?.title || pageTitle,
                    "description": post?.metaDescription || pageDescription,
                    "image": post?.thumbnail,
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": pageUrl
                    },
                    "inLanguage": locale === 'bn' ? 'bn-BD' : 'en-US',
                    "author": {
                        "@type": "Person",
                        "name": "Mahib Abrar",
                        "alternateName": "Mahib",
                        "description": "Student and hobbyist software developer focused on building performance-oriented web applications, embedded systems with ESP32, and experimental AI-driven simulations.",
                        "url": "https://itsmahibabrar.github.io",
                        "image": "https://avatars.githubusercontent.com/u/128323013?v=4",
                        "jobTitle": "Student Developer",
                        "knowsAbout": [
                            "Web Development",
                            "JavaScript",
                            "ReactJS",
                            "Python",
                            "ESP32",
                            "Embedded Systems",
                            "API Design",
                            "AI Simulations"
                        ],
                        "alumniOf": {
                            "@type": "EducationalOrganization",
                            "name": "Monipur High School & College"
                        },
                        "sameAs": [
                            "https://github.com/itsmahibabrar",
                            "https://mahfil.net/channel/mahib-abrar",
                            "https://www.youtube.com/@mahibabrarofficial"
                        ]
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "ItsMahibAbrar",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://avatars.githubusercontent.com/u/128323013?v=4"
                        }
                    }
                }}
            />

            <section className="post-shell">
                <div className="post-top-bar">
                    <Link to={backPath} className="post-back-link">{backLabel}</Link>
                    <Link
                        to={languageSwitchPath}
                        className="lang-switch-btn"
                        onClick={() => setIsLanguageSwitching(true)}
                    >
                        {languageSwitchLabel}
                    </Link>
                </div>

                {state === 'loading' && (
                    <article className="post-empty-state">
                        <h1>{locale === 'bn' ? 'আর্টিকেল লোড হচ্ছে...' : 'Loading article...'}</h1>
                        <p>{locale === 'bn' ? 'অনুগ্রহ করে একটু অপেক্ষা করুন।' : 'Please wait while this article is fetched.'}</p>
                    </article>
                )}

                {state === 'not-found' && (
                    <article className="post-empty-state">
                        <h1>{locale === 'bn' ? 'আর্টিকেল পাওয়া যায়নি' : 'Article not found'}</h1>
                        <p>
                            {locale === 'bn'
                                ? 'চাহিদাকৃত পোস্টটি পাওয়া যায়নি। URL যাচাই করুন অথবা ব্লগ ইনডেক্সে ফিরে যান।'
                                : 'The requested post could not be found. Check the URL or return to the blog index.'}
                        </p>
                    </article>
                )}

                {state === 'ready' && post && (
                    <article className="post-article">
                        <header className="post-header">
                            <p className="eyebrow">{locale === 'bn' ? 'ব্লগ আর্টিকেল' : 'Blog Article'}</p>
                            <h1>{post.title}</h1>
                            <div className="post-meta-row">
                                <time dateTime={publishedDateTime}>{post.date}</time>
                                <span>{post.readTime}</span>
                            </div>
                            {post.keywords.length > 0 && (
                                <div className="post-tag-row">
                                    {post.keywords.map((keyword) => (
                                        <span key={keyword} className="post-tag">{keyword}</span>
                                    ))}
                                </div>
                            )}
                        </header>

                        <figure className="post-featured-media">
                            <img src={post.thumbnail} alt={post.title} loading="lazy" width={1200} height={630} />
                        </figure>

                        <section className="post-content">{renderedBlocks}</section>
                    </article>
                )}
            </section>
        </div>
    );
}