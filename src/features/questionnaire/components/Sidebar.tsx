import { Button, Box } from '@mantine/core';
import { NavLink } from './NavLink';
import { useNavigate } from 'react-router-dom';
import { notification } from '@/libs/notification';
import { IconPlus } from '@tabler/icons-react';
import { useCreateQuestionnaire } from '../api/createQuestionnaire';
import classes from './Sidebar.module.css';

export const Sidebar = () => {
  const navigate = useNavigate();
  const createQuestionnaire = useCreateQuestionnaire();

  async function handleCreateClick() {
    createQuestionnaire.mutate(undefined, {
      onSuccess(data) {
        navigate(`/questionnaires/${data._id}/edit`);
        notification.success({ message: '問卷創建成功' });
      },
    });
  }

  return (
    <div className={classes.sidebar}>
      <div className={classes.sticky}>
        <Box p={12}>
          <Button
            loading={createQuestionnaire.isPending}
            fullWidth
            leftSection={<IconPlus />}
            onClick={handleCreateClick}
          >
            創建問卷
          </Button>
        </Box>
        <NavLink to="/questionnaires/list" label="我的問卷"></NavLink>
        <NavLink to="/questionnaires/favorites" label="我的最愛"></NavLink>
        <NavLink to="/questionnaires/recycle-bin" label="垃圾桶"></NavLink>
      </div>
    </div>
  );
};
