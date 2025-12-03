# ZeusLabs Website - robots.txt

User-agent: *
Allow: /

# Sitemap
Sitemap: https://zeuslabs.site/sitemap.xml

# Block admin pages
Disallow: /admin
Disallow: /?admin=true

# Block development files
Disallow: *.json$
Disallow: /src/
Disallow: /node_modules/

# Allow important pages
Allow: /
Allow: /services
Allow: /projects
Allow: /about
Allow: /blog
Allow: /contact

# Crawl delay (optional)
Crawl-delay: 1