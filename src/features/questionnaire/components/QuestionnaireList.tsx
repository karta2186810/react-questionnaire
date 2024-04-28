import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, Skeleton, Pagination, Group, Title } from '@mantine/core';
import { QuestionnaireCard } from '../components/QuestionnaireCard';
import { useUpdateQuestionnaire } from '../api/updateQuestionnaire';
import { useQuestionnaires } from '../api/getQuestionnaires';
import { useDuplicateQuestionnaire } from '../api/duplicateQuestionnaire';
import { questionnaireKeys } from '../api/queries';
import { notification } from '@/libs/notification';

type QuestionnaireListProps = {
  favorite?: boolean;
};

export const QuestionnaireList: FC<QuestionnaireListProps> = ({ favorite = false }) => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const keywords = searchParams.get('keywords') ?? undefined;

  const queryClient = useQueryClient();
  const query = useQuestionnaires({ keywords, page, favorite });
  const duplicateMutation = useDuplicateQuestionnaire();
  const updateMutation = useUpdateQuestionnaire();
  const isLoading = query.isFetching || duplicateMutation.isPending || updateMutation.isPending;

  function handleDuplicate(id: string) {
    duplicateMutation.mutate(id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: questionnaireKeys.list({ keywords, page, favorite }),
        });
      },
    });
  }
  function handleDelete(id: string) {
    updateMutation.mutate(
      { id, isDeleted: true },
      {
        onSuccess() {
          notification.success({ message: '問卷已放入垃圾桶' });
          queryClient.invalidateQueries({
            queryKey: questionnaireKeys.list({ keywords }),
          });
        },
      },
    );
  }
  function handleFavorite(id: string, isFavorite: boolean) {
    updateMutation.mutate(
      { id, isFavorite },
      {
        onSuccess() {
          notification.success({ message: isFavorite ? '已加入我的最愛' : '已取消我的最愛' });
          queryClient.invalidateQueries({
            queryKey: questionnaireKeys.list({ keywords }),
          });
        },
      },
    );
  }

  if (isLoading && query.data.list.length === 0) {
    return (
      <>
        <Skeleton height={120} mt={6} radius="sm" />
        <Skeleton height={120} mt={6} radius="sm" />
        <Skeleton height={120} mt={6} radius="sm" />
        <Skeleton height={120} mt={6} radius="sm" />
        <Skeleton height={120} mt={6} radius="sm" />
      </>
    );
  }

  if (!isLoading && query.data.list.length === 0) {
    return (
      <Title order={3} ta="center" c="blue" mt={40}>
        沒有相關問卷
      </Title>
    );
  }

  return (
    <>
      <Stack>
        {query.data.list.map((questionnaire) => {
          return (
            <QuestionnaireCard
              {...questionnaire}
              key={questionnaire._id}
              loading={isLoading}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onFavorite={handleFavorite}
            />
          );
        })}
      </Stack>
      <Group justify="center" mt={40}>
        <Pagination value={page} total={query.data.totalPage} disabled={isLoading} onChange={setPage} />
      </Group>
    </>
  );
};
