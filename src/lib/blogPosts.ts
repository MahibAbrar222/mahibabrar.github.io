type RawFrontmatter = Record<string, string>;

export type Locale = 'en' | 'bn';

export type BlogPostSummary = {
    slug: string;
    locale: Locale;
    title: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogType: string;
    ogImage: string;
    thumbnail: string;
    twitterCard: string;
    robots: string;
    excerpt: string;
    readTime: string;
    date: string;
    link: string;
};

export type BlogPostEntry = BlogPostSummary & {
    content: string;
};

const eagerPostModules = import.meta.glob('../blogs/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

function stripOuterQuotes(value: string): string {
    const trimmed = value.trim();
    if (trimmed.length >= 2) {
        const first = trimmed[0];
        const last = trimmed[trimmed.length - 1];
        if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
            return trimmed.slice(1, -1).trim();
        }
    }
    return trimmed;
}

function parseFrontmatterBlock(block: string): RawFrontmatter {
    const result: RawFrontmatter = {};
    const lines = block.split('\n');

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            continue;
        }

        const separatorIndex = trimmed.indexOf(':');
        if (separatorIndex === -1) {
            continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const value = trimmed.slice(separatorIndex + 1).trim();
        if (!key) {
            continue;
        }

        result[key] = stripOuterQuotes(value);
    }

    return result;
}

function parseMarkdownFile(raw: string): { frontmatter: RawFrontmatter; body: string } {
    const frontmatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!frontmatterMatch) {
        return { frontmatter: {}, body: raw.trim() };
    }

    const frontmatter = parseFrontmatterBlock(frontmatterMatch[1]);
    const body = raw.slice(frontmatterMatch[0].length).trim();

    return { frontmatter, body };
}

function toPlainText(markdown: string): string {
    return markdown
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/^>\s?/gm, '')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/[*_~]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function estimateReadTime(content: string): string {
    const words = toPlainText(content).split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

function deriveExcerpt(content: string): string {
    const excerpt = toPlainText(content);
    if (excerpt.length <= 170) {
        return excerpt;
    }
    return `${excerpt.slice(0, 167).trim()}...`;
}

function parseKeywords(rawKeywords: string | undefined): string[] {
    if (!rawKeywords) {
        return [];
    }

    return rawKeywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean);
}

function toAbsoluteUrl(url: string): string {
    if (/^https?:\/\//i.test(url)) {
        return url;
    }

    if (url.startsWith('/')) {
        return `https://itsmahibabrar.github.io${url}`;
    }

    return `https://itsmahibabrar.github.io/${url}`;
}

function parseDateForSort(date: string): number {
    const trimmed = date.trim();
    if (!trimmed) {
        return 0;
    }

    const nativeParsed = Date.parse(trimmed);
    if (!Number.isNaN(nativeParsed)) {
        return nativeParsed;
    }

    const dmyMatch = trimmed.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (dmyMatch) {
        const [, dd, mm, yyyy] = dmyMatch;
        const normalizedDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
        const parsed = Date.parse(normalizedDate);
        return Number.isNaN(parsed) ? 0 : parsed;
    }

    return 0;
}

function extractSlugAndLocaleFromPath(modulePath: string): { slug: string; locale: Locale } | null {
    const match = modulePath.match(/\/([^/?]+)\.md$/);
    if (!match) {
        return null;
    }

    const fileName = match[1];
    if (fileName.endsWith('-bn')) {
        return { slug: fileName.slice(0, -3), locale: 'bn' };
    }

    return { slug: fileName, locale: 'en' };
}

function createPostEntry(modulePath: string, rawMarkdown: string): BlogPostEntry | null {
    const slugAndLocale = extractSlugAndLocaleFromPath(modulePath);
    if (!slugAndLocale) {
        return null;
    }

    const { slug, locale } = slugAndLocale;

    const { frontmatter, body } = parseMarkdownFile(rawMarkdown);
    const title = frontmatter.title || slug.replace(/-/g, ' ');
    const metaDescription = frontmatter.meta_description || deriveExcerpt(body);
    const keywords = parseKeywords(frontmatter.keywords);
    const canonicalUrl = frontmatter.canonical_url
        || `https://itsmahibabrar.github.io${locale === 'bn' ? '/bn/blog' : '/blog'}/${slug}`;
    const ogTitle = frontmatter.og_title || title;
    const ogDescription = frontmatter.og_description || metaDescription;
    const ogType = frontmatter.og_type || 'article';
    const thumbnail = frontmatter.thumbnail || frontmatter.og_image || 'https://avatars.githubusercontent.com/u/128323013?v=4';
    const ogImage = toAbsoluteUrl(frontmatter.og_image || thumbnail);
    const twitterCard = frontmatter.twitter_card || 'summary_large_image';
    const robots = frontmatter.robots || 'index, follow';
    const date = frontmatter.date || 'Recently published';

    return {
        slug,
        locale,
        title,
        metaDescription,
        keywords,
        canonicalUrl,
        ogTitle,
        ogDescription,
        ogType,
        ogImage,
        thumbnail,
        twitterCard,
        robots,
        excerpt: deriveExcerpt(body),
        readTime: estimateReadTime(body),
        date,
        link: locale === 'bn' ? `/bn/blog/${slug}` : `/blog/${slug}`,
        content: body,
    };
}

export function getAllPostSummaries(locale?: Locale): BlogPostSummary[] {
    const posts = Object.entries(eagerPostModules)
        .map(([modulePath, rawMarkdown]) => createPostEntry(modulePath, rawMarkdown))
        .filter((post): post is BlogPostEntry => post !== null)
        .filter((post) => !locale || post.locale === locale)
        .map((post) => {
            const { content, ...summary } = post;
            void content;
            return summary;
        })
        .sort((a, b) => {
            const bDate = parseDateForSort(b.date);
            const aDate = parseDateForSort(a.date);

            if (bDate !== aDate) {
                return bDate - aDate;
            }

            return a.title.localeCompare(b.title);
        });

    return posts;
}

export async function getPostBySlug(slug: string, locale: Locale = 'en'): Promise<BlogPostEntry | null> {
    const targetSuffix = locale === 'bn' ? `/${slug}-bn.md` : `/${slug}.md`;
    const moduleEntry = Object.entries(eagerPostModules).find(([modulePath]) => modulePath.endsWith(targetSuffix));
    if (!moduleEntry) {
        return null;
    }

    const [modulePath, rawMarkdown] = moduleEntry;
    return createPostEntry(modulePath, rawMarkdown);
}

export function hasPostInLocale(slug: string, locale: Locale): boolean {
    const targetSuffix = locale === 'bn' ? `/${slug}-bn.md` : `/${slug}.md`;
    return Object.keys(eagerPostModules).some((modulePath) => modulePath.endsWith(targetSuffix));
}