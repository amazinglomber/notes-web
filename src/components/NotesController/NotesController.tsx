import React, { useEffect, useState } from 'react';
import api from '../../api';
import { removeSelectedNotes, switchArchiveSelectedNotes } from '../../store/reducers/notesReducer';
import { useTranslation } from 'react-i18next';
import { Container, Divider, Toolbar } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading';
import NotesList from '../Note/NotesList';

export interface NotesControllerProps {
  archive?: boolean;
}

const NotesController: React.FC<NotesControllerProps> = ({ archive = false, }) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState<INote[]>([]);
  const [totalNotes, setTotalNotes] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMoreNotes = async () => {
    setLoading(true);

    try {
      const response = await api.get<IGetNotesResponse>(`/Notes?Page=${page}&IsArchived=${archive}`);
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
  // const onArchiveSelectedClicked = () => dispatch(switchArchiveSelectedNotes());

  // TODO: Add confirmation dialog and snackbar message
  // const onRemoveSelectedClicked = () => dispatch((removeSelectedNotes()));

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
};

export default NotesController;
