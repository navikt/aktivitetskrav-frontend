module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "ds-gray-50": "#f7f7f7",
        "header-color": "#d1eff9",
        "aksel-info-color":
          "var(--ac-alert-icon-info-color, var(--ax-text-info-decoration))",
        "aksel-warning-color":
          "var(--ac-alert-icon-warning-color, var(--ax-text-warning-decoration))",
        "aksel-success-color":
          "var(--ac-alert-icon-success-color, var(--ax-text-success-decoration))",
        "aksel-error-color":
          "var(--ac-alert-icon-error-color, var(--ax-text-danger-decoration))",
      },
    },
  },
  plugins: [],
};
