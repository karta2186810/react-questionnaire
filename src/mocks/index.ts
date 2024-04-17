export async function setupMockServer() {
  const { worker } = await import('./browser');
  await worker.start({
    onUnhandledRequest(request, print) {
      if (request.url.includes('fonts.gstatic.com') || request.url.includes('src/assets')) {
        return;
      }
      print.warning();
    },
  });
}
