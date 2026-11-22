export const THEME_STORAGE_KEY = "nexus-theme";
export const THEME_CHANGE_EVENT = "nexus-theme-change";

// Runs in <head> before the page is painted, so there is no light-to-dark flash.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t==="dark"||((t===null||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;