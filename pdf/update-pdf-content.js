#!/usr/bin/env node

/**
 * PDF Content Updater
 *
 * This script automatically updates the PDF-exportable HTML version
 * by parsing content from the main index.html file.
 *
 * Usage:
 *   node update-pdf-content.js
 *
 * The script will:
 * 1. Parse the main index.html for project and experience content
 * 2. Extract data-expand-content attributes and expand them
 * 3. Update the PDF version with all content visible
 * 4. Preserve the PDF-friendly formatting
 */

const fs = require('fs');
const path = require('path');

// File paths
const MAIN_HTML = path.join(__dirname, '..', 'index.html');
const PDF_HTML = path.join(__dirname, 'index.html');

/**
 * Parse expand content JSON from data attribute
 */
function parseExpandContent(dataAttr) {
    try {
        return JSON.parse(dataAttr);
    } catch (err) {
        console.error('Error parsing expand content:', err);
        return null;
    }
}

/**
 * Extract project cards from main HTML
 */
function extractProjects(html) {
    const projects = [];
    const projectRegex = /<div class="project-card"[^>]*?data-expand-content='([^']*?)'[^>]*?>([\s\S]*?)<\/div>\s*(?=<div class="project-card"|<\!--|<\/div>\s*<\/div>\s*<\/section>)/g;

    let match;
    while ((match = projectRegex.exec(html)) !== null) {
        const expandContent = match[1];
        const cardContent = match[2];

        // Extract title
        const titleMatch = cardContent.match(/<h3 class="project-title">(.*?)<\/h3>/);
        const title = titleMatch ? titleMatch[1] : 'Untitled Project';

        // Extract description
        const descMatch = cardContent.match(/<p class="project-description">([\s\S]*?)<\/p>/);
        const description = descMatch ? descMatch[1].trim() : '';

        // Extract tags
        const tagsMatch = cardContent.match(/<div class="project-tags">([\s\S]*?)<\/div>/);
        const tags = [];
        if (tagsMatch) {
            const tagRegex = /<span class="tag">(.*?)<\/span>/g;
            let tagMatch;
            while ((tagMatch = tagRegex.exec(tagsMatch[1])) !== null) {
                tags.push(tagMatch[1]);
            }
        }

        // Parse expanded content
        const expanded = parseExpandContent(expandContent);

        projects.push({
            title,
            description,
            tags,
            expanded
        });
    }

    return projects;
}

/**
 * Extract experience items from main HTML
 */
function extractExperience(html) {
    const experiences = [];
    const expRegex = /<div class="experience-item">([\s\S]*?)<\/div>\s*(?=<\!--|<div class="experience-item"|<\/div>\s*<\/div>\s*<\/section>)/g;

    let match;
    while ((match = expRegex.exec(html)) !== null) {
        const content = match[1];

        // Extract date
        const dateMatch = content.match(/<span[^>]*?>(.*?)<\/span>/);
        const date = dateMatch ? dateMatch[1] : '';

        // Extract title
        const titleMatch = content.match(/<h3 class="experience-title">(.*?)<\/h3>/);
        const title = titleMatch ? titleMatch[1] : '';

        // Extract company
        const companyMatch = content.match(/<h4 class="experience-company">(.*?)<\/h4>/);
        const company = companyMatch ? companyMatch[1] : '';

        // Extract description items
        const descMatch = content.match(/<ul class="experience-description">([\s\S]*?)<\/ul>/);
        const items = [];
        if (descMatch) {
            const itemRegex = /<li>(.*?)<\/li>/g;
            let itemMatch;
            while ((itemMatch = itemRegex.exec(descMatch[1])) !== null) {
                items.push(itemMatch[1]);
            }
        }

        // Extract tags
        const tagsMatch = content.match(/<div class="experience-tags">([\s\S]*?)<\/div>/);
        const tags = [];
        if (tagsMatch) {
            const tagRegex = /<span class="tag">(.*?)<\/span>/g;
            let tagMatch;
            while ((tagMatch = tagRegex.exec(tagsMatch[1])) !== null) {
                tags.push(tagMatch[1]);
            }
        }

        experiences.push({
            date,
            title,
            company,
            items,
            tags
        });
    }

    return experiences;
}

/**
 * Generate project HTML for PDF
 */
function generateProjectHTML(project) {
    let html = `
            <!-- PROJECT: ${project.title} -->
            <div class="project-expanded">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-summary">
                    <p>
                        ${project.description}
                    </p>
                    <div class="project-tags">
`;

    // Add tags
    project.tags.forEach(tag => {
        html += `                        <span class="tag">${tag}</span>\n`;
    });

    html += `                    </div>
                </div>
`;

    // Process expanded content
    if (project.expanded && Array.isArray(project.expanded)) {
        let hasDetails = false;
        let mediaItems = [];

        project.expanded.forEach(item => {
            if (typeof item === 'object' && item.type === 'text') {
                // Text content - add as details
                if (!hasDetails) {
                    html += `                <div class="project-details">\n`;
                    hasDetails = true;
                }
                // Strip HTML tags from content and add
                const cleanContent = item.content
                    .replace(/<h3>/g, '<h4>')
                    .replace(/<\/h3>/g, '</h4>');
                html += `                    ${cleanContent}\n`;
            } else if (typeof item === 'object' && item.src) {
                // Media with caption
                mediaItems.push(item);
            } else if (typeof item === 'string') {
                // Direct path to media
                mediaItems.push({ src: item });
            }
        });

        if (hasDetails) {
            html += `                </div>\n`;
        }

        // Add media section
        if (mediaItems.length > 0) {
            html += `                <div class="project-media">\n`;
            mediaItems.forEach(media => {
                const isVideo = media.src.match(/\.(mp4|mov|avi)$/i);
                if (isVideo) {
                    html += `                    <div class="media-item">\n`;
                    html += `                        <div class="media-note">[Video: ${path.basename(media.src)}${media.text ? ' - ' + media.text : ''}]</div>\n`;
                    html += `                        <p class="media-path">${media.src}</p>\n`;
                    html += `                    </div>\n\n`;
                } else {
                    html += `                    <div class="media-item">\n`;
                    html += `                        <img src="../${media.src}" alt="${media.text || 'Project image'}" class="project-image">\n`;
                    if (media.text) {
                        html += `                        <p class="media-caption">${media.text}</p>\n`;
                    }
                    html += `                    </div>\n`;
                }
            });
            html += `                </div>\n`;
        }
    }

    html += `            </div>\n`;

    return html;
}

/**
 * Generate experience HTML for PDF
 */
function generateExperienceHTML(exp) {
    let html = `
            <!-- EXPERIENCE: ${exp.title} -->
            <div class="experience-item">
                <div class="experience-header">
                    <h3 class="experience-title">${exp.title}</h3>
                    <span class="experience-date">${exp.date}</span>
                </div>
                <h4 class="experience-company">${exp.company}</h4>
                <ul class="experience-description">
`;

    exp.items.forEach(item => {
        html += `                    <li>${item}</li>\n`;
    });

    html += `                </ul>
                <div class="experience-tags">
`;

    exp.tags.forEach(tag => {
        html += `                    <span class="tag">${tag}</span>\n`;
    });

    html += `                </div>
            </div>
`;

    return html;
}

/**
 * Main update function
 */
function updatePDFContent() {
    console.log('Reading main HTML file...');
    const mainHTML = fs.readFileSync(MAIN_HTML, 'utf-8');

    console.log('Extracting projects...');
    const projects = extractProjects(mainHTML);
    console.log(`Found ${projects.length} projects`);

    console.log('Extracting experience items...');
    const experiences = extractExperience(mainHTML);
    console.log(`Found ${experiences.length} experience items`);

    console.log('Reading PDF template...');
    let pdfHTML = fs.readFileSync(PDF_HTML, 'utf-8');

    // Generate projects HTML
    let projectsHTML = '';
    projects.forEach(project => {
        projectsHTML += generateProjectHTML(project);
    });

    // Generate experience HTML
    let experienceHTML = '';
    experiences.forEach(exp => {
        experienceHTML += generateExperienceHTML(exp);
    });

    // Replace content in PDF HTML
    console.log('Updating PDF HTML with extracted content...');

    // Replace projects section
    const projectsPattern = /(<!-- PROJECT:.*?-->[\s\S]*?<\/div>\s*){1,}/;
    pdfHTML = pdfHTML.replace(
        /<!-- PROJECT:[\s\S]*?(?=<\/div>\s*<\/section>)/,
        projectsHTML.trim() + '\n\n        '
    );

    // Replace experience section
    pdfHTML = pdfHTML.replace(
        /<!-- EXPERIENCE:[\s\S]*?(?=<\/div>\s*<\/section>)/,
        experienceHTML.trim() + '\n\n        '
    );

    // Write updated PDF HTML
    console.log('Writing updated PDF HTML...');
    fs.writeFileSync(PDF_HTML, pdfHTML, 'utf-8');

    console.log('✓ PDF content updated successfully!');
    console.log('\nTo generate PDF:');
    console.log('1. Open pdf/index.html in your browser');
    console.log('2. Press Ctrl+P (Cmd+P on Mac)');
    console.log('3. Select "Save as PDF"');
    console.log('4. Adjust settings as needed and save');
}

// Run the update
try {
    updatePDFContent();
} catch (err) {
    console.error('Error updating PDF content:', err);
    process.exit(1);
}
