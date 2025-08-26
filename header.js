// Header.js - Dynamic header generator for Wiki Game pages
// Usage: Include this script and call generateHeader() to create a consistent header across all pages

const WIKI_GAMES = {
  'osrs': {
    name: 'Old School RuneScape',
    shortName: 'OSRS',
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    icon: '⚔️',
    description: 'Navigate through the OSRS Wiki'
  },
  'poe': {
    name: 'Path of Exile',
    shortName: 'PoE',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    icon: '🔥',
    description: 'Navigate through the Path of Exile Wiki'
  },
  'minecraft': {
    name: 'Minecraft',
    shortName: 'MC',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
    icon: '⛏️',
    description: 'Navigate through the Minecraft Wiki'
  },
  'terraria': {
    name: 'Terraria',
    shortName: 'Terraria',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-600',
    icon: '🏗️',
    description: 'Navigate through the Terraria Wiki'
  },
  'fandom': {
    name: 'Fandom',
    shortName: 'Fandom',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    icon: '🌐',
    description: 'Navigate through Fandom Wikis'
  },
  'wiki-gg': {
    name: 'Wiki.gg',
    shortName: 'Wiki.gg',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    icon: '🎮',
    description: 'Navigate through Wiki.gg'
  }
};

// Get current page identifier from URL or page title
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop().replace('.html', '');
  return filename in WIKI_GAMES ? filename : 'osrs'; // default fallback
}

// Generate the header HTML
function generateHeader() {
  const currentPage = getCurrentPage();
  const currentGame = WIKI_GAMES[currentPage];
  
  const headerHTML = `
    <header class="mb-4 bg-slate-800 border-b border-slate-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <!-- Main Header Row -->
        <div class="flex items-center justify-between">
          <!-- Logo and Title -->
          <a href="/">
            <div class="flex items-center space-x-3">
              <img src="images/logo.avif" alt="Wiki Game Logo" class="w-10 h-10">
            <div>
              <h1 class="text-2xl font-bold text-white">Wiki Game</h1>
              <p class="text-sm text-slate-400">Navigate through your favorite wikis in this addictive link-following minigame.</p>
            </div>
            </div>
          </a>
          
          <!-- Current Game Badge and Home Link -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-2xl">${currentGame.icon}</span>
              <div class="text-right">
                <div class="text-lg font-semibold ${currentGame.color}">${currentGame.name}</div>
                <div class="text-xs text-slate-400">Current Game</div>
              </div>
            </div>
            <a href="/" class="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200">
              <span class="text-lg">🏠</span>
              <span class="hidden sm:inline">Home</span>
              <span class="sm:hidden">Home</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
  
  return headerHTML;
}

// Generate a mobile-friendly header (alternative version)
function generateMobileHeader() {
  const currentPage = getCurrentPage();
  const currentGame = WIKI_GAMES[currentPage];
  
  const headerHTML = `
    <header class="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <!-- Compact Header -->
        <div class="flex items-center justify-between">
          <!-- Logo and Title -->
          <div class="flex items-center space-x-2">
            <div class="text-2xl">🎯</div>
            <div>
              <h1 class="text-lg font-bold text-white">Wiki Game</h1>
              <p class="text-xs text-slate-400">${currentGame.name}</p>
            </div>
          </div>
          
          <!-- Game Icon and Home Link -->
          <div class="flex items-center space-x-2">
            <div class="text-2xl">${currentGame.icon}</div>
            <a href="/" class="flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200">
              <span>🏠</span>
              <span class="hidden xs:inline">Home</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
  
  return headerHTML;
}

// Insert header into the page
function insertHeader(useMobile = false) {
  const headerHTML = useMobile ? generateMobileHeader() : generateHeader();
  
  // Insert at the beginning of the body
  const body = document.body;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = headerHTML;
  
  // Insert the header as the first child of body
  body.insertBefore(tempDiv.firstElementChild, body.firstChild);
  
  // Adjust main content padding to account for header
  const main = document.querySelector('main');
  if (main) {
    main.classList.add('pt-0'); // Remove top padding since header handles spacing
  }
}

// Auto-detect screen size and insert appropriate header
function autoInsertHeader() {
  const isMobile = window.innerWidth < 768;
  insertHeader(isMobile);
  
  // Re-insert header on window resize
  window.addEventListener('resize', () => {
    const header = document.querySelector('header');
    if (header) {
      header.remove();
    }
    const newIsMobile = window.innerWidth < 768;
    insertHeader(newIsMobile);
  });
}

// Utility function to get current game info
function getCurrentGameInfo() {
  const currentPage = getCurrentPage();
  return WIKI_GAMES[currentPage];
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateHeader,
    generateMobileHeader,
    insertHeader,
    autoInsertHeader,
    getCurrentGameInfo,
    WIKI_GAMES
  };
}

// Auto-initialize if script is loaded directly
if (typeof document !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInsertHeader);
  } else {
    autoInsertHeader();
  }
}
