import { useTitle } from '@/hooks/useTitle';
import { Layout } from '../components/Layout';
import { QuestionnaireList } from '../components/QuestionnaireList';

export const Favorites = () => {
  useTitle('我的最愛');

  return (
    <Layout title="我的最愛">
      <QuestionnaireList favorite={true} />
    </Layout>
  );
};
