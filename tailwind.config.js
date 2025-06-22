/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'LBlack': 'Lato-Black',
        'LBlackItalic': 'Lato-BlackItalic',
        'LBold': 'Lato-Bold',
        'LBoldItalic': 'Lato-BoldItalic',
        'LItalic': 'Lato-Italic',
        'LLight': 'Lato-Light',
        'LLightItalic': 'Lato-LightItalic',
        'LRegular': 'Lato-Regular',
        'LThin': 'Lato-Thin',
        'LThinItalic': 'Lato-ThinItalic',
      },
    },
  },
  plugins: [],
}