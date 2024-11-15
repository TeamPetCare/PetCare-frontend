export default defineConfig({
    base: '/', // Ajuste conforme o domínio/subdomínio
    build: {
        outDir: './dist', // Certifique-se de que está configurado como 'dist'
    },
    server: {
      port: 3000
    }
});
