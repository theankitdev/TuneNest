/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'UBlack': 'Urbanist-Black',
        'UBlackItalic': 'Urbanist-BlackItalic',
        'UBold': 'Urbanist-Bold',
        'UBoldItalic': 'Urbanist-BoldItalic',
        'UExtraBold': 'Urbanist-ExtraBold',
        'UExtraBoldItalic': 'Urbanist-ExtraBoldItalic',
        'UExtraLight': 'Urbanist-ExtraLight',
        'UExtraLightItalic': 'Urbanist-ExtraLightItalic',
        'UItalic': 'Urbanist-Italic',
        'ULight': 'Urbanist-Light',
        'ULightItalic': 'Urbanist-LightItalic',
        'UMedium': 'Urbanist-Medium',
        'UMediumItalic': 'Urbanist-MediumItalic',
        'USemiBold': 'Urbanist-SemiBold',
        'USemiBoldItalic': 'Urbanist-SemiBoldItalic',
        'URegular': 'Urbanist-Regular',
        'UThin': 'Urbanist-Thin',
        'UThinItalic': 'Urbanist-ThinItalic',
      },
    },
  },
  plugins: [],
}