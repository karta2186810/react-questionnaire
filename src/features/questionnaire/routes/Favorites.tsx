import { Layout } from '../components/Layout';
import { QuestionnaireList } from '../components/QuestionnaireList';

export const Favorites = () => {
  return (
    <Layout title="我的最愛">
      <QuestionnaireList favorite={true} />
    </Layout>
  );
};
