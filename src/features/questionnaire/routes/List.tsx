import { useTitle } from '@/hooks/useTitle';
import { Layout } from '../components/Layout';
import { QuestionnaireList } from '../components/QuestionnaireList';

export const List = () => {
  useTitle('我的問卷');

  return (
    <Layout title="我的問卷">
      <QuestionnaireList />
    </Layout>
  );
};
