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
export const themeFolder = "themes";
const baseDir = BaseDirectory.AppLocalData;
export const localAppDataDir = appLocalDataDir();
//#region Themes
const lightThemeStyle = `
:root {
  --background: #f0f0f0;
  --color: #000000;

  --titlebar-bg-color: #f0f0f0;
  --titlebar-text-color: #000000;
  --titlebar-border-color: #d0d0d0;

  --sidebar-bg-color: #f0f0f0;
  --sidebar-text-color: #000000;
  --sidebar-border-color: #d0d0d0;
  --sidebar-icon-hover: #d0d0d0;
  --sidebar-active-color: #f0f0f0;

  --panel-bg: #00000017;

  --checkbox-bg: #f0f0f0;
  --checkbox-hover: #d0d0d0;
  --checkbox-checked-bg: #f0f0f0;
  --checkbox-checked-color: #000000;

  -dropdown-button-color: #000000;
  --dropdown-content-bg: #f0f0f0;
  --dropdown-content-color: #000000;
  --dropdown-content-border: #d0d0d0;
  --dropdown-value-bg: #f0f0f0;
  --dropdown-value-color: #000000;
  --dropdown-selected-bg: #d0d0d0;
  --dropdown-value-hover-bg: #d0d0d0;
}`;
const darkThemeStyle = `
:root {
  --background: linear-gradient(20deg, #2f2f2f, #3f3f3f);
  --color: aliceblue;

  --button-hover: #afafaf22;

  --titlebar-bg-color: #1e1e1e;
  --titlebar-text-color: #ffffff;
  --titlebar-shadow-color: #3a3a3a;

  --sidebar-bg-color: linear-gradient(180deg, #2f2f2f22, #1f1f1f);
  --sidebar-text-color: #ffffff;
  --sidebar-icon-hover: rgb(68, 68, 68);
  --sidebar-shadow-color: #3a3a3a;
  --sidebar-active-border: #595959;
  --sidebar-active-color: #434343;

  --panel-bg: #eeeeee11;

  --input-border: #ffffff3b;
  --input-active-border: #ffffff;
  --input-bg: #3a3a3a;
  --input-text: #ffffff;

  --dropdown-content-bg: #606060;
}
`;
const blueThemeStyle = `
:root {
  --background: #425b6e;
  --color: white;

  --titlebar-bg-color: #3e4c55;
  --titlebar-text-color: white;
  --titlebar-shadow-color: #a1a1a1;

  --button-bg: #4f5b624c;
  --button-color: white;
  --button-hover: #4f5b62;
  --button-active: #2f3335;

  --sidebar-bg-color: linear-gradient(180deg, #546e7e, #5a7583);
  --sidebar-text-color: white;
  --sidebar-shadow-color: #a1a1a1;
  --sidebar-icon-border: #7a919f;
  --sidebar-icon-hover: #637c8a;
  --sidebar-active-border: #3d81a9;
  --sidebar-active-color: #7797aa;

  --panel-bg: #fff1;

  --task-action-bg: none;

  --input-bg: #58666e;
  --input-text: white;
  --input-border: #a1a1a1;
  --input-active-border: #a1a1a1;

  --dropdown-button-bg: #58666e;
  --dropdown-content-bg: #58666e;
  --dropdown-content-color: white;
  --dropdown-content-border: #a1a1a1;
  --dropdown-selected-bg: #638396;
  --dropdown-value-hover-bg: #8198a4;
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
        return { ...state, themes: themeNames, theme: themeNames[0] };
      });
      saveThemeLocal();
    })
    .catch(async (err) => {
      console.error("Error reading themes", err);
      await createThemeFolder();
    });
}
var loadThemeTries = 0;
const themeStyleId = "theme";
export async function loadTheme(themeName: string) {
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
    if (registeredThemes.length > 0 && themes?.includes(currentTheme!)) {
      useThemeStore.setState((state) => {
        return {
          ...state,
          themes: registeredThemes,
          theme: currentTheme!,
        };
      });
    } else {
      throw new Error("No themes found");
    }
  } catch (e) {
    console.error("Error loading themes: ", e);
    getThemes();
  }
}
// prettier-ignore
const fontRe = new RegExp(`font-family: (.*);`, 'g');
export function updateFont(font: string) {
  if (!font) return;
  let themeStyle = document.getElementById("font") as HTMLStyleElement;
  console.log(font);
  if (themeStyle) {
    const oldFont = themeStyle.textContent!.match(fontRe);
    if (oldFont === null) {
      themeStyle.textContent += `*{font-family: ${font};}`;
    } else {
      themeStyle.textContent = themeStyle.textContent!.replace(
        fontRe,
        `font-family: ${font};`
      );
    }
  }
}
