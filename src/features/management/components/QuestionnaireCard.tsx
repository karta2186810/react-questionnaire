import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, Group, Pill, Button, Divider, Text, ActionIcon } from '@mantine/core';
import { IconTrash, IconCopy, IconEdit, IconReportAnalytics, IconStar, IconStarFilled } from '@tabler/icons-react';
import { Questionnaire } from '../types';

type QuestionnaireCardProps = Questionnaire & {
  loading?: boolean;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFavorite?: (id: string, isFavorite: boolean) => void;
};

export const QuestionnaireCard: FC<QuestionnaireCardProps> = (props) => {
  return (
    <Card withBorder shadow="sm">
      <Group justify="space-between" align="center" pb={12}>
        <Group gap="sm">
          <ActionIcon
            variant="transparent"
            color={props.isFavorite ? 'yellow' : 'gray'}
            disabled={props.loading}
            onClick={() => props.onFavorite?.(props._id, !props.isFavorite)}
          >
            {props.isFavorite ? <IconStarFilled /> : <IconStar />}
          </ActionIcon>
          <Text
            size="xl"
            c="blue"
            fw={500}
            td="underline"
            variant="transparent"
            component={Link}
            to={`/questionnaires/${props._id}/edit`}
          >
            {props.title}
          </Text>
        </Group>
        <Group>
          <Pill c={props.isPublished ? 'teal' : undefined}>{props.isPublished ? '已發布' : '未發布'}</Pill>
          <Pill>答卷: {props.answerCount}</Pill>
          <Text size="sm">{props.createdAt}</Text>
        </Group>
      </Group>
      <Card.Section>
        <Divider />
      </Card.Section>
      <Group pt={12} justify="space-between" align="center">
        <Group gap="xs">
          <Button size="xs" variant="outline" leftSection={<IconEdit width={16} />} disabled={props.loading}>
            編輯問卷
          </Button>
          <Button
            size="xs"
            variant="outline"
            color="teal"
            leftSection={<IconReportAnalytics width={16} />}
            disabled={props.loading}
          >
            問卷統計
          </Button>
        </Group>
        <Group gap="xs">
          <Button
            size="xs"
            variant="subtle"
            leftSection={<IconCopy width={16} />}
            disabled={props.loading}
            onClick={() => props.onDuplicate?.(props._id)}
          >
            複製
          </Button>
          <Button
            size="xs"
            variant="subtle"
            color="red"
            leftSection={<IconTrash width={16} />}
            disabled={props.loading}
            onClick={() => props.onDelete?.(props._id)}
          >
            刪除
          </Button>
        </Group>
      </Group>
    </Card>
  );
};
