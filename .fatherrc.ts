import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    ignores: [
      'src/scripts/**', // 避免打包scripts文件到npm包里面
    ],
  },
  cjs: {
    ignores: [
      'src/scripts/**', // 避免打包scripts文件到npm包里面
    ],
  },
});
