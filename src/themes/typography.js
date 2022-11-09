const responsiveFontSizes = ({ sm, md, lg }) => ({
  '@media (min-width: 0)': {
    fontSize: sm,
  },
  '@media (min-width: 768px)': {
    fontSize: md,
  },
  '@media (min-width: 1200px)': {
    fontSize: lg,
  },
})

const FONT_EXTRABOLD = 800
const FONT_BOLD = 700
const FONT_SEMIBOLD = 600
const FONT_MEDIUM = 500
const FONT_REGULAR = 400

const typography = {
  fontFamily: "'Nunito', sans-serif",
  h1: {
    fontWeight: FONT_BOLD,
    ...responsiveFontSizes({ sm: 30, md: 40, lg: 50 }),
  },
  h2: {
    fontWeight: FONT_BOLD,
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 24 }),
  },
  h3: {
    fontWeight: FONT_BOLD,
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
  },
  h4: {
    fontWeight: FONT_BOLD,
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 }),
  },
  h5: {
    fontWeight: FONT_MEDIUM,
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 }),
  },
  h6: {
    fontWeight: FONT_BOLD,
    ...responsiveFontSizes({ sm: 12, md: 14, lg: 16 }),
  },
  body1: {
    fontWeight: FONT_MEDIUM,
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 }),
  },
  body2: {
    fontWeight: FONT_MEDIUM,
    ...responsiveFontSizes({ sm: 12, md: 14, lg: 16 }),
  },
  button: {
    fontWeight: FONT_BOLD,
    textTransform: 'normal',
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
  },
  subtitle1: {
    fontWeight: FONT_BOLD,
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 }),
  },
  subtitle2: {
    fontWeight: FONT_REGULAR,
    ...responsiveFontSizes({ sm: 12, md: 14, lg: 16 }),
  },
  enText: {
    ...responsiveFontSizes({ sm: 14, md: 15, lg: 17 }),
    lineHeight: '17px',
    letterSpacing: '3px',
    color: '#a3a3a3',
    textTransform: 'uppercase',
  },
  viText: {
    ...responsiveFontSizes({ sm: 25, md: 30, lg: 40 }),
    fontWeight: FONT_BOLD,
    lineHeight: '40px',
    marginTop: '10px',
  },
}

export default typography
