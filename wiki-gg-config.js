// Wiki.gg Configuration File
// Simple configuration for different wikis

const WIKI_GG_CONFIG = {
  // Available wiki configurations
  wikis: {
    'derail-valley': {
      name: 'Derail Valley',
      api: 'https://wiki.gg/api.php',
      site: 'https://wiki.gg'
    },
    
    'satisfactory': {
      name: 'Satisfactory',
      api: 'https://satisfactory.wiki.gg/api.php',
      site: 'https://satisfactory.wiki.gg'
    },
    
    'factorio': {
      name: 'Factorio',
      api: 'https://wiki.factorio.com/api.php',
      site: 'https://wiki.factorio.com'
    },
    
    'dyson-sphere-program': {
      name: 'Dyson Sphere Program',
      api: 'https://dyson-sphere-program.wiki.gg/api.php',
      site: 'https://dyson-sphere-program.wiki.gg'
    },
    
    'oxygen-not-included': {
      name: 'Oxygen Not Included',
      api: 'https://oxygennotincluded.fandom.com/api.php',
      site: 'https://oxygennotincluded.fandom.com'
    },
    
    'rimworld': {
      name: 'RimWorld',
      api: 'https://rimworldwiki.com/api.php',
      site: 'https://rimworldwiki.com'
    },
    
    'kenshi': {
      name: 'Kenshi',
      api: 'https://kenshi.fandom.com/api.php',
      site: 'https://kenshi.fandom.com'
    },
    
    'project-zomboid': {
      name: 'Project Zomboid',
      api: 'https://pzwiki.net/api.php',
      site: 'https://pzwiki.net'
    },
    
    'valheim': {
      name: 'Valheim',
      api: 'https://valheim.fandom.com/api.php',
      site: 'https://valheim.fandom.com'
    },
    
    'vintage-story': {
      name: 'Vintage Story',
      api: 'https://wiki.vintagestory.at/api.php',
      site: 'https://wiki.vintagestory.at'
    }
  }
};

// Get current wiki configuration from URL path
function getCurrentWikiConfig() {
  const path = window.location.pathname;
  const pathSegments = path.split('/').filter(segment => segment.length > 0);
  
  // Look for wiki key in the path segments
  let wikiKey = 'derail-valley'; // default
  
  // Check if we're in a wiki-gg path and extract the wiki name
  if (pathSegments.includes('wiki-gg')) {
    const wikiIndex = pathSegments.indexOf('wiki-gg');
    if (wikiIndex !== -1 && wikiIndex + 1 < pathSegments.length) {
      const potentialWikiKey = pathSegments[wikiIndex + 1];
      if (WIKI_GG_CONFIG.wikis[potentialWikiKey]) {
        wikiKey = potentialWikiKey;
      }
    }
  }
  
  // Return the specific wiki config if it exists, otherwise return default
  return WIKI_GG_CONFIG.wikis[wikiKey] || WIKI_GG_CONFIG.wikis['derail-valley'];
}

// Get all available wiki configurations
function getAllWikiConfigs() {
  return WIKI_GG_CONFIG.wikis;
}

// Update page elements with current wiki configuration
function updatePageWithWikiConfig(config) {
  // Update page title
  document.title = `${config.name} Wiki Game – srcdoc embed`;
  
  // Update attribution text
  const attributionElement = document.querySelector('p.text-slate-400');
  if (attributionElement) {
    attributionElement.textContent = `Content © ${config.name} Wiki contributors (CC BY-SA).`;
  }
  
  // Update destination info title if it exists
  const destTitleElement = document.querySelector('#destinationInfo h2');
  if (destTitleElement) {
    destTitleElement.textContent = 'Target Page:';
  }
  
  console.log(`Loaded ${config.name} Wiki configuration`);
}

// Generate wiki selection dropdown HTML
function generateWikiSelector() {
  const currentConfig = getCurrentWikiConfig();
  const allConfigs = getAllWikiConfigs();
  
  let html = `
    <div class="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
      <h3 class="text-lg font-semibold text-blue-400 mb-3">Select Wiki</h3>
      <select id="wikiSelector" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
  `;
  
  Object.entries(allConfigs).forEach(([key, config]) => {
    const isSelected = key === getCurrentWikiKey();
    html += `
      <option value="${key}" ${isSelected ? 'selected' : ''}>
        ${config.name}
      </option>
    `;
  });
  
  html += `
      </select>
      <p class="text-xs text-slate-400 mt-2">Navigate through the ${currentConfig.name} Wiki</p>
    </div>
  `;
  
  return html;
}

// Get current wiki key from URL path
function getCurrentWikiKey() {
  const path = window.location.pathname;
  const pathSegments = path.split('/').filter(segment => segment.length > 0);
  
  // Look for wiki key in the path segments
  if (pathSegments.includes('wiki-gg')) {
    const wikiIndex = pathSegments.indexOf('wiki-gg');
    if (wikiIndex !== -1 && wikiIndex + 1 < pathSegments.length) {
      const potentialWikiKey = pathSegments[wikiIndex + 1];
      if (WIKI_GG_CONFIG.wikis[potentialWikiKey]) {
        return potentialWikiKey;
      }
    }
  }
  
  return 'derail-valley'; // default
}

// Change to a different wiki
function changeWiki(wikiKey) {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
  
  // Find the wiki-gg segment and replace the next segment with the new wiki
  if (pathSegments.includes('wiki-gg')) {
    const wikiIndex = pathSegments.indexOf('wiki-gg');
    if (wikiIndex !== -1) {
      // Replace the wiki name in the path
      pathSegments[wikiIndex + 1] = wikiKey;
      
      // Reconstruct the URL
      const newPath = '/' + pathSegments.join('/');
      const url = new URL(window.location);
      url.pathname = newPath;
      
      // Clear game parameters when changing wikis
      url.searchParams.delete('start');
      url.searchParams.delete('target');
      
      window.location.href = url.toString();
      return;
    }
  }
  
  // Fallback: construct a new path
  const newPath = `/wiki-gg/${wikiKey}`;
  const url = new URL(window.location);
  url.pathname = newPath;
  url.searchParams.delete('start');
  url.searchParams.delete('target');
  
  window.location.href = url.toString();
}

// Initialize wiki selector functionality
function initializeWikiSelector() {
  const selector = document.getElementById('wikiSelector');
  if (selector) {
    selector.addEventListener('change', (e) => {
      changeWiki(e.target.value);
    });
  }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WIKI_GG_CONFIG,
    getCurrentWikiConfig,
    getAllWikiConfigs,
    updatePageWithWikiConfig,
    generateWikiSelector,
    getCurrentWikiKey,
    changeWiki,
    initializeWikiSelector
  };
}

// Auto-initialize if script is loaded directly
if (typeof document !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const config = getCurrentWikiConfig();
      updatePageWithWikiConfig(config);
    });
  } else {
    const config = getCurrentWikiConfig();
    updatePageWithWikiConfig(config);
  }
}
