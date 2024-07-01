import { http, HttpResponse } from 'msw';
import { AuthUser, LoginDTO, LoginResponse, RegisterResponse } from '@/features/auth';

const DEV_AUTH_TOKEN = 'REACT_QUESTIONNAIRE_DEV_JWT';
const DEV_PASSWORD = 'admin';
const DEV_USERNAME = 'admin';
const DEV_NICKNAME = 'Jack';

export const authHandlers = [
  http.post('/api/auth/me', ({ request }) => {
    console.log(DEV_AUTH_TOKEN);
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
