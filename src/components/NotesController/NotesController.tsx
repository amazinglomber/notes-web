import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading';
import { useGetNotesQuery } from '../../api/api';
import NotesGrid from '../Note/NotesGrid';

export interface NotesControllerProps {
  archive?: boolean;
}

const NotesController: React.FC<NotesControllerProps> = ({ archive = false, }) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNotesQuery({ page, archive }, {
    pollingInterval: 10000,
  });

  useEffect(() => {
  }, [page, isLoading]);

  const loadMoreNotes = () => {
    setPage((page) => page + 1);
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (!data?.notes) {
    return (
      <Typography variant="h5">No notes</Typography>
    );
  }

  return (
    <div style={{ width: '100%' }}>

        <InfiniteScroll
          dataLength={data.notes.length}
          next={loadMoreNotes}
          hasMore={data.notes.length < data.totalCount}
          loader={<Loading />}
          style={{ height: 'auto', overflow: 'hidden'}}
        >
          <NotesGrid notes={data.notes} />
        </InfiniteScroll>

    </div>
  );
};

export default NotesController;
