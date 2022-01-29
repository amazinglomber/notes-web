import { Button, CircularProgress, Container, Divider, Toolbar, } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { removeSelectedNotes, switchArchiveSelectedNotes, } from '../store/reducers/notesReducer';
import { useAppDispatch } from '../store/hooks';
import { useTranslation } from 'react-i18next';

import api from '../api';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotesList from '../components/NoteList/NotesList';
import Loading from '../components/Loading';
import { useApi } from '../api/api';

const NotesPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);

  const [notes, setNotes] = useState<INote[]>([]);
  const [totalNotes, setTotalNotes] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMoreNotes = async () => {
    setLoading(true);

    try {
      const response = await api.get<IGetNotesResponse>(`/Notes?Page=${page}`);
      setNotes(oldNotes => [...oldNotes, ...response.data.notes]);
      setTotalNotes(response.data.totalCount);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setPage(page => page + 1);
    }
  }

  useEffect(() => {
    loadMoreNotes();
  }, []);

  // TODO: Add snackbar message
  const onArchiveSelectedClicked = () => dispatch(switchArchiveSelectedNotes());

  // TODO: Add confirmation dialog and snackbar message
  const onRemoveSelectedClicked = () => dispatch((removeSelectedNotes()));

  const renderToolbar = () => {
    return (
      <Toolbar>
        {/*<Tooltip title={t(`toolbar.tooltip.${howManySelected === 'none' ? 'selectall' : 'deselectall'}`) as string}>*/}
        {/*  <ListItemIcon>*/}
        {/*    <Checkbox*/}
        {/*      checked={howManySelected === 'all'}*/}
        {/*      indeterminate={howManySelected === 'some'}*/}
        {/*      onChange={handleCheck}*/}
        {/*    />*/}
        {/*  </ListItemIcon>*/}
        {/*</Tooltip>*/}

        {/*{howManySelected === 'none' ? (*/}
        {/*  <>*/}

        {/*  </>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    <Tooltip title={t('toolbar.tooltip.archive') as string}>*/}
        {/*      <IconButton onClick={onArchiveSelectedClicked}>*/}
        {/*        <ArchiveIcon />*/}
        {/*      </IconButton>*/}
        {/*    </Tooltip>*/}
        {/*    <Tooltip title={t('toolbar.tooltip.delete') as string}>*/}
        {/*      <IconButton onClick={onRemoveSelectedClicked}>*/}
        {/*        <DeleteIcon />*/}
        {/*      </IconButton>*/}
        {/*    </Tooltip>*/}
        {/*  </>*/}
        {/*)}*/}
        {/*<Button variant="contained" onClick={() => setPage(page + 1)}>Load more</Button>*/}
      </Toolbar>
    );
  }

  // TODO: Add something when empty
  return (
    <div style={{ width: '100%' }}>
      {renderToolbar()}

      <Divider />

      <Container component="main">

        <InfiniteScroll
          dataLength={notes.length}
          next={loadMoreNotes}
          hasMore={notes.length < totalNotes}
          loader={<Loading />}
          style={{ height: 'auto', overflow: 'hidden'}}
        >
          <NotesList notes={notes} />
        </InfiniteScroll>

      </Container>
    </div>
  );
}

export default NotesPage