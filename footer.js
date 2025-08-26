// Footer.js - Dynamic footer generator for Wiki Game pages
// Usage: Include this script and call generateFooter() to create a consistent footer across all pages

// Footer configuration
const FOOTER_CONFIG = {
  copyright: {
    text: "© 2024 WikiHop. All rights reserved.",
    description: "Navigate through your favorite wikis in this addictive link-following minigame."
  },
  links: {
    twitter: {
      url: "https://twitter.com/spr3adsh33t",
      text: "Feedback",
      icon: "X"
    },
    buymeacoffee: {
      url: "https://buymeacoffee.com/spr3adsh33t",
      text: "Buy Me a Coffee",
      icon: "☕"
    },
    terms: {
      url: "/terms",
      text: "Terms of Service",
      icon: "📋"
    },
    privacy: {
      url: "/privacy",
      text: "Privacy Policy",
      icon: "🔒"
    }
  }
};

// Generate the footer HTML
function generateFooter() {
  const footerHTML = `
    <footer class="bg-slate-800 border-t border-slate-700 mt-16">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Copyright and Description -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-3">
              <div class="text-2xl">🎯</div>
              <div>
                <h3 class="text-lg font-bold text-white">WikiHop</h3>
                <p class="text-sm text-slate-400">${FOOTER_CONFIG.copyright.description}</p>
              </div>
            </div>
            <p class="text-sm text-slate-400">${FOOTER_CONFIG.copyright.text}</p>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="text-sm font-semibold text-slate-300 mb-3">Feedback & Support</h4>
            <div class="space-y-2">
              <a href="${FOOTER_CONFIG.links.twitter.url}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors">
                <span>${FOOTER_CONFIG.links.twitter.icon}</span>
                <span>${FOOTER_CONFIG.links.twitter.text}</span>
              </a>
              <a href="${FOOTER_CONFIG.links.buymeacoffee.url}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors">
                <span>${FOOTER_CONFIG.links.buymeacoffee.icon}</span>
                <span>${FOOTER_CONFIG.links.buymeacoffee.text}</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="border-t border-slate-700 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div class="text-xs text-slate-500 mb-2 sm:mb-0">
            Made with ❤️ for the gaming community
          </div>
          <div class="flex space-x-4">
            <a href="${FOOTER_CONFIG.links.terms.url}" 
               class="text-xs text-slate-400 hover:text-white transition-colors">
              ${FOOTER_CONFIG.links.terms.icon} ${FOOTER_CONFIG.links.terms.text}
            </a>
            <a href="${FOOTER_CONFIG.links.privacy.url}" 
               class="text-xs text-slate-400 hover:text-white transition-colors">
              ${FOOTER_CONFIG.links.privacy.icon} ${FOOTER_CONFIG.links.privacy.text}
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
  
  return footerHTML;
}

// Generate a compact footer for mobile
function generateCompactFooter() {
  const footerHTML = `
    <footer class="bg-slate-800 border-t border-slate-700 mt-8">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- Compact Layout -->
        <div class="text-center mb-4">
          <div class="flex items-center justify-center space-x-2 mb-2">
            <div class="text-xl"><img src="images/logo.avif" alt="Wiki Game Logo" class="w-10 h-10"></div>
            <h3 class="text-lg font-bold text-white">WikiHop</h3>
          </div>
          <p class="text-xs text-slate-400 mb-3">${FOOTER_CONFIG.copyright.description}</p>
          <p class="text-xs text-slate-500">${FOOTER_CONFIG.copyright.text}</p>
        </div>
        
        <!-- Compact Links -->
        <div class="flex flex-wrap justify-center gap-4 mb-4">
          <a href="${FOOTER_CONFIG.links.twitter.url}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors">
            <span>${FOOTER_CONFIG.links.twitter.icon}</span>
            <span>${FOOTER_CONFIG.links.twitter.text}</span>
          </a>
          <a href="${FOOTER_CONFIG.links.buymeacoffee.url}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors">
            <span>${FOOTER_CONFIG.links.buymeacoffee.icon}</span>
            <span>${FOOTER_CONFIG.links.buymeacoffee.text}</span>
          </a>
        </div>
        
        <!-- Legal Links -->
        <div class="flex justify-center space-x-4 text-xs text-slate-500">
          <a href="${FOOTER_CONFIG.links.terms.url}" 
             class="hover:text-white transition-colors">
            ${FOOTER_CONFIG.links.terms.text}
          </a>
          <a href="${FOOTER_CONFIG.links.privacy.url}" 
             class="hover:text-white transition-colors">
            ${FOOTER_CONFIG.links.privacy.text}
          </a>
        </div>
      </div>
    </footer>
  `;
  
  return footerHTML;
}

// Insert footer into the page
function insertFooter(useCompact = false) {
  const footerHTML = useCompact ? generateCompactFooter() : generateFooter();
  
  // Insert at the end of the body
  const body = document.body;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = footerHTML;
  
  // Insert the footer as the last child of body
  body.appendChild(tempDiv.firstElementChild);
}

// Auto-detect screen size and insert appropriate footer
function autoInsertFooter() {
  const isMobile = window.innerWidth < 768;
  insertFooter(isMobile);
  
  // Re-insert footer on window resize
  window.addEventListener('resize', () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.remove();
    }
    const newIsMobile = window.innerWidth < 768;
    insertFooter(newIsMobile);
  });
}

// Utility function to update footer links
function updateFooterLinks(newLinks) {
  Object.assign(FOOTER_CONFIG.links, newLinks);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateFooter,
    generateCompactFooter,
    insertFooter,
    autoInsertFooter,
    updateFooterLinks,
    FOOTER_CONFIG
  };
}

// Auto-initialize if script is loaded directly
if (typeof document !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInsertFooter);
  } else {
    autoInsertFooter();
  }
}
