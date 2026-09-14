import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
      strict: true
    }),
    alias: {
      '$ds': '../../life-sdk/ds/web',
      '$sdk': '../../life-sdk/web'
    }
  }
};

export default config;
