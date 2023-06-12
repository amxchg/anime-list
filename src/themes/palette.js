/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  return {
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      200: theme.colors?.primary200,
      800: theme.colors?.primary800,
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      200: theme.colors?.secondary200,
      800: theme.colors?.secondary800,
    },
    green: {
      check: theme.colors?.greenCheck,
    },
    red: {
      favorite: theme.colors?.redFavorite,
    },
    yellow: {
      star: theme.colors?.yellowStar,
    }
  }
}
