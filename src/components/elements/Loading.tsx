import { Loader } from '@mantine/core';
import classes from './Loading.module.css';

export const Loading = () => {
  return (
    <div className={classes.loading}>
      <Loader color="blue" />
    </div>
  );
};
