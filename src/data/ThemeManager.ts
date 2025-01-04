import {
  readDir,
  BaseDirectory,
  mkdir,
  open,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import { join, appLocalDataDir } from "@tauri-apps/api/path";
import { useThemeStore } from "../store/ThemeStore";

const { toggleTheme } = useThemeStore.getState();
const inDev = process.env.NODE_ENV === "development";
export const themeFolder = inDev
  ? "Coding/JavaScriptAndStuff/design-e-portfolio/src/themes"
  : "themes";
const baseDir = inDev ? BaseDirectory.Document : BaseDirectory.AppLocalData;
export const localAppDataDir = appLocalDataDir();
//#region
const lightThemeStyle = `
:root {
  --titlebar-bg-color: #f0f0f0;
  --titlebar-text-color: #000000;
  --titlebar-border-color: #d0d0d0;
}
`;
const darkThemeStyle = `
:root {
  --background: linear-gradient(20deg, #1e1e1e, #333333);
  --color: aliceblue;
  
  --titlebar-bg-color: #1e1e1e;
  --titlebar-text-color: #ffffff;
  --titlebar-shadow-color: #3a3a3a;
  

  --sidebar-bg-color: #1e1e1e;
  --sidebar-text-color: #ffffff;
  --sidebar-icon-hover: rgb(68, 68, 68);
  --sidebar-shadow-color: #3a3a3a;
  --sidebar-active-border: #595959;
  --sidebar-active-color: #434343;
}

`;
const blueThemeStyle = `
:root {
  --background: #627b8e;
  --color: white;
  --titlebar-bg-color: #36424a;
  --titlebar-text-color: white;
  --titlebar-shadow-color: #333333;
}
`;
//#endregion

async function createThemeFolder() {
  console.log("Creating themes folder");
  await mkdir(themeFolder, { baseDir })
    .then(() => {
      console.log("Created themes folder");
    })
    .catch((err) => {
      console.error("Error creating themes folder", err);
    });

  // Create a default theme
  const lightTheme = open(await join(themeFolder, "light.css"), {
    create: true,
    write: true,
    baseDir,
  }).then(async (file) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(lightThemeStyle);
    await file
      .write(data)
      .then(() => {
        console.log("Created light theme");
      })
      .catch((err) => {
        console.error("Error writing light theme", err);
      });
  });
  const darkTheme = open(await join(themeFolder, "black-and-white.css"), {
    create: true,
    write: true,
    baseDir,
  }).then(async (file) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(darkThemeStyle);
    await file
      .write(data)
      .then(() => {
        console.log("Created dark theme");
      })
      .catch((err) => {
        console.error("Error writing dark theme", err);
      });
  });
  const blueTheme = open(await join(themeFolder, "blue.css"), {
    create: true,
    write: true,
    baseDir,
  }).then(async (file) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(blueThemeStyle);
    await file
      .write(data)
      .then(() => {
        console.log("Created dark theme");
      })
      .catch((err) => {
        console.error("Error writing dark theme", err);
      });
  });

  await Promise.all([lightTheme, darkTheme, blueTheme]).then(() => {
    console.log("Created default themes");
    getThemes();
  });
}

export async function getThemes() {
  await readDir(themeFolder, {
    baseDir,
  })
    .then(async (themes) => {
      console.log("Themes found", themes);
      const foundThemes = themes.filter((theme) => theme.name.endsWith(".css"));
      if (foundThemes.length === 0) {
        console.log("No themes found");
        await createThemeFolder();
        return;
      }
      const themeNames = foundThemes.map((theme) =>
        theme.name.replace(".css", "")
      );
      useThemeStore.setState((state) => {
        return { ...state, themes: themeNames };
      });
      saveThemeLocal();
    })
    .catch(async (err) => {
      console.error("Error reading themes", err);
      await createThemeFolder();
    });
}

var loadThemeTries = 0;

export async function loadTheme(themeName: string) {
  const themeStyleId = "theme";
  let themeStyle = document.getElementById(themeStyleId) as HTMLStyleElement;
  if (!themeStyle) {
    // Create the <style> element if it doesn't exist
    themeStyle = document.createElement("style");
    themeStyle.id = themeStyleId;
    document.head.appendChild(themeStyle);
  }

  try {
    // Read the theme CSS file from the app data directory
    const themeCss = await readTextFile(
      await join(themeFolder, `${themeName}.css`),
      {
        baseDir,
      }
    );

    // Inject the CSS content into the <style> tag
    themeStyle.textContent = themeCss;
    toggleTheme(themeName);
  } catch (error) {
    console.error("Failed to load theme:", error);
    loadThemeTries++;
    if (loadThemeTries > 4) {
      loadThemeTries = 0;
      createThemeFolder();
      return;
    }
    loadTheme(themeName);
    console.log("Loaded Theme", themeName);
  }
}

export async function saveThemeLocal() {
  try {
    localStorage.setItem("theme", useThemeStore.getState().theme);
    localStorage.setItem(
      "registered-themes",
      useThemeStore.getState().themes.join(",")
    );
  } catch (e) {
    console.error("failed to save: ", e);
  }
}

export function loadThemeLocal() {
  try {
    var themes = localStorage.getItem("registered-themes");
    var currentTheme = localStorage.getItem("theme");
    var registeredThemes = themes!.split(",");
    useThemeStore.setState((state) => {
      return {
        ...state,
        themes: registeredThemes,
        theme: currentTheme!,
      };
    });
    loadTheme(currentTheme!);
  } catch (e) {
    console.error("Error loading themes: ", e);
  }
}
type ThemeData = {
  currentTheme: string;
  themes: string[];
};
