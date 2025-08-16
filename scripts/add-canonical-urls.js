/**
 * Script to add canonical URLs to all pages
 * Run with: node scripts/add-canonical-urls.js
 */

const fs = require('fs');
const path = require('path');

// Base URL for canonical URLs
const BASE_URL = 'https://www.pestcontrol99.com';

// Function to add canonical URL to a file
function addCanonicalUrl(filePath, urlPath) {
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file already has a canonical URL
    if (content.includes('alternates: {') && content.includes('canonical:')) {
      console.log(`Canonical URL already exists in ${filePath}`);
      return;
    }
    
    // Check if the file has metadata
    if (!content.includes('export const metadata')) {
      console.log(`No metadata found in ${filePath}`);
      return;
    }
    
    // Find the end of the metadata object
    const metadataEndIndex = content.indexOf('};', content.indexOf('export const metadata'));
    if (metadataEndIndex === -1) {
      console.log(`Could not find metadata end in ${filePath}`);
      return;
    }
    
    // Create the canonical URL string
    const canonicalUrlString = `  alternates: {
    canonical: "${BASE_URL}${urlPath}",
  },
`;
    
    // Insert the canonical URL before the end of the metadata object
    const updatedContent = [
      content.slice(0, metadataEndIndex),
      canonicalUrlString,
      content.slice(metadataEndIndex)
    ].join('');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Added canonical URL to ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Function to process a directory recursively
function processDirectory(dirPath, urlPrefix = '') {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (['node_modules', '.next', 'public', 'scripts'].includes(item)) {
        continue;
      }
      
      // For directories like [slug], we need special handling
      if (item.startsWith('[') && item.endsWith(']')) {
        // For dynamic routes, we'll process the files but not add canonical URLs automatically
        processDirectory(itemPath, `${urlPrefix}/${item}`);
      } else {
        processDirectory(itemPath, `${urlPrefix}/${item}`);
      }
    } else if (item === 'page.tsx' || item === 'layout.tsx') {
      // For page.tsx or layout.tsx files, add canonical URL
      // For the root page, use empty string as the URL path
      const urlPath = urlPrefix === '' ? '' : urlPrefix;
      addCanonicalUrl(itemPath, urlPath);
    }
  }
}

// Start processing from the app directory
const appDir = path.join(__dirname, '..', 'src', 'app');
processDirectory(appDir);

console.log('Finished adding canonical URLs');