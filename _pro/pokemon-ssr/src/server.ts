import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine';

const commonEngine = new CommonEngine();
export async function netlifyCommonEngineHandler(
  request: Request,
  context: any
): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/about' },
    });
  }
  return await render(commonEngine);
}
