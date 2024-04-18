const EXCLUDE_PATHS = ['fonts.gstatic.com', 'src/', 'node_modules/'];

export async function setupMockServer() {
  const { worker } = await import('./browser');
  await worker.start({
    onUnhandledRequest(request, print) {
      if (EXCLUDE_PATHS.some((path) => request.url.includes(path))) {
        return;
      }
      print.warning();
    },
  });
}
