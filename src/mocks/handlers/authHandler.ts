import { http, HttpResponse } from 'msw';
import { AuthUser, LoginDTO, LoginResponse, RegisterResponse } from '@/features/auth';

const DEV_AUTH_TOKEN = process.env.DEV_AUTH_TOKEN! as string;
const DEV_PASSWORD = process.env.DEV_PASSWORD! as string;
const DEV_USERNAME = process.env.DEV_USERNAME! as string;
const DEV_NICKNAME = process.env.DEV_NICKNAME! as string;

export const authHandlers = [
  http.get('/api/auth/me', ({ request }) => {
    const authorization = request.headers.get('Authorization');

    if (!authorization || authorization.split(' ')[1] !== DEV_AUTH_TOKEN) {
      return HttpResponse.json(null, { status: 401 });
    }
    return HttpResponse.json<AuthUser>({
      username: DEV_USERNAME,
      nickname: DEV_NICKNAME,
    });
  }),
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as LoginDTO;

    if (username !== DEV_USERNAME || password !== DEV_PASSWORD) {
      return HttpResponse.json({ message: '帳號或密碼錯誤' }, { status: 404 });
    }
    console.log(DEV_AUTH_TOKEN);
    return HttpResponse.json<LoginResponse>({
      username: DEV_USERNAME,
      nickname: DEV_NICKNAME,
      token: DEV_AUTH_TOKEN,
    });
  }),
  http.post('/api/auth/register', async () => {
    return HttpResponse.json<RegisterResponse>({
      success: true,
    });
  }),
];
