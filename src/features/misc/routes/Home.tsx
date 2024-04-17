import { Title, Button, Container } from '@mantine/core';
import classes from './home.module.css';
import { Logo } from '@/components/elements';
import { IconChevronRight } from '@tabler/icons-react';
import homePageBg from '@/assets/images/homepage-bg.svg';

export const Home = () => (
  <Container size="lg">
    <div className={classes.home}>
      <div className={classes.block}>
        <div className={classes['logo-wrapper']}>
          <Logo className={classes.logo} />
          <Logo className={classes.logo} />
        </div>
        <Title mt="md">問卷調查 | 線上投票</Title>
        <Button mt="xl" size="lg" rightSection={<IconChevronRight />}>
          馬上開始
        </Button>
      </div>
      <div className={classes.block}>
        <img className={classes['bg-image']} src={homePageBg} alt="" />
      </div>
    </div>
  </Container>
);