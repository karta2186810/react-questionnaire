import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table, Group, Button, Checkbox, Pill, Pagination, Title, Skeleton } from '@mantine/core';
import { IconArrowBackUp, IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { notification } from '@/libs/notification';
import { useQuestionnaires } from '../api/getQuestionnaires';
import { useUpdateQuestionnaire } from '../api/updateQuestionnaire';
import { useDeleteQuestionnaires } from '../api/deleteQuestionnaires';
import { questionnaireKeys } from '../api/queries';
import { Layout } from '../components/Layout';

export const RecycleBin = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const keywords = searchParams.get('keywords') ?? undefined;
  const [page, setPage] = useState(1);
  const filters = { keywords, page, deleted: true };
  const query = useQuestionnaires(filters);
  const updateMutation = useUpdateQuestionnaire();
  const deleteMutation = useDeleteQuestionnaires();
  const isLoading = query.isFetching || updateMutation.isPending || deleteMutation.isPending;

  const [selectedQuestionnaires, setSelectedQuestionnaires] = useState<string[]>([]);
  const isAllSelected =
    query.data.list.length === 0 ? false : query.data.list.every((q) => selectedQuestionnaires.includes(q._id));

  function isChecked(id: string) {
    return selectedQuestionnaires.includes(id);
  }
  function handleChange(id: string, checked: boolean) {
    if (checked) {
      setSelectedQuestionnaires([...selectedQuestionnaires, id]);
    } else {
      setSelectedQuestionnaires(selectedQuestionnaires.filter((selectedId) => selectedId !== id));
    }
  }
  function handleSelectAll(selectAll: boolean) {
    setSelectedQuestionnaires(selectAll ? query.data.list.map((q) => q._id) : []);
  }

  async function handleRecover() {
    try {
      await Promise.all(selectedQuestionnaires.map((id) => updateMutation.mutateAsync({ id, isDeleted: false })));
      notification.success({ message: '問卷恢復成功' });
      setSelectedQuestionnaires([]);
      queryClient.invalidateQueries({
        queryKey: questionnaireKeys.list(filters),
      });
    } catch (e) {
      notification.error({ message: '發生錯誤，請稍後重試' });
    }
  }

  function handleDelete() {
    deleteMutation.mutate(
      {
        ids: selectedQuestionnaires,
      },
      {
        onSuccess() {
          notification.success({ message: '問卷刪除成功' });
          setSelectedQuestionnaires([]);
          queryClient.invalidateQueries({
            queryKey: questionnaireKeys.list(filters),
          });
        },
        onError() {
          notification.error({ message: '發生錯誤，請稍後重試' });
        },
      },
    );
  }

  return (
    <Layout title="垃圾桶">
      <Group>
        <Button
          variant="outline"
          leftSection={<IconArrowBackUp width={18} />}
          disabled={!selectedQuestionnaires.length || isLoading}
          onClick={handleRecover}
        >
          恢復
        </Button>
        <Button
          variant="outline"
          leftSection={<IconTrash width={18} />}
          color="red"
          disabled={!selectedQuestionnaires.length || isLoading}
          onClick={handleDelete}
        >
          刪除
        </Button>
      </Group>
      {!isLoading && query.data.list.length === 0 ? (
        <Title order={3} ta="center" c="blue" mt={40}>
          沒有相關問卷
        </Title>
      ) : isLoading && query.data.list.length === 0 ? (
        <>
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
          <Skeleton height={40} mt={6} radius="sm" />
        </>
      ) : (
        <Table withTableBorder mt={20} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  checked={isAllSelected}
                  disabled={isLoading}
                  onChange={() => handleSelectAll(!isAllSelected)}
                />
              </Table.Th>
              <Table.Th>標題</Table.Th>
              <Table.Th>發布狀態</Table.Th>
              <Table.Th>答卷數量</Table.Th>
              <Table.Th>創建日期</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {query.data.list.map((questionnaire) => {
              return (
                <Table.Tr
                  key={questionnaire._id}
                  bg={isChecked(questionnaire._id) ? 'var(--mantine-color-blue-light)' : undefined}
                >
                  <Table.Td>
                    <Checkbox
                      checked={isChecked(questionnaire._id)}
                      disabled={isLoading}
                      onChange={() => handleChange(questionnaire._id, !isChecked(questionnaire._id))}
                    />
                  </Table.Td>
                  <Table.Td>{questionnaire.title}</Table.Td>
                  <Table.Td>{questionnaire.isPublished ? <Pill c="teal">已發布</Pill> : <Pill>未發布</Pill>}</Table.Td>
                  <Table.Td>{questionnaire.answerCount}</Table.Td>
                  <Table.Td>{questionnaire.createdAt}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
      <Group justify="center" mt={40}>
        <Pagination value={page} total={query.data.totalPage} disabled={isLoading} onChange={setPage} />
      </Group>
    </Layout>
  );
};
