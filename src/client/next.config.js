module.exports = {
  distDir: '../../.next',
  eslint: {
    dirs: ['src/client'], // https://github.com/thisismydesign/nestjs-starter/issues/82
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      // Enable display of the component name along with the generated className (needed for debugging).
      displayName: true,
      // Enable SSR support
      ssr: true,
      // Optional
      fileName: false
    }
  }
};
