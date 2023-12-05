/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(0, 153, 255)",
        greyText: "rgb(101, 117, 139)",
        lighterBlue: "#f0f9ff",
        lightBlue: "rgb(224, 242, 254)",
        darkBlue: "#21496b",
        blueBorder: "#bae6fd",
      },
    },
  },
  plugins: [],
};
