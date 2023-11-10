import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno({
      attributifyPseudo: true,
    }),
    presetAttributify(),
    presetIcons({
      collections: {
        ri: () => import('@iconify-json/ri/icons.json').then((i) => i.default),
      },
    }),
  ],
});
