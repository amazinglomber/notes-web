import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://api.notes.niezurawski.com/api'
  : 'https://localhost:7002/api';

type TagType = 'Notes';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  tagTypes: ['Notes'] as TagType[],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNotes: builder.query<IGetNotesResponse, { page: number, archive: boolean}>({
      query: ({ page = 1, archive = false }) => `/Notes?Page=${page}&IsArchived=${archive}`,
      providesTags: (result) =>
        result
          ? [
            ...result.notes.map((note) => ({ type: 'Notes' as const, id: note.id })),
            { type: 'Notes', id: 'LIST' },
          ]
          : [{ type: 'Notes', id: 'LIST' }]
    }),
    getNoteById: builder.query<INote, INote['id']>({
      query: (id) => `/Notes/${id},`,
      providesTags: (result, error, id) => [{ type: 'Notes', id }],
    }),
    addNote: builder.mutation<INote, ICreateNote>({
      query: (createNote) => ({
        url: `/Notes`,
        method: 'POST',
        body: createNote,
      }),
      invalidatesTags: ['Notes'],
    }),
    updateNote: builder.mutation<INote, IUpdateNote>({
      query: (updateNote) => ({
        url: `/Notes`,
        method: 'PUT',
        body: updateNote,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Notes', id }]
    }),
    removeNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    archiveNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Notes/${id}/Archive`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    unArchiveNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Notes/${id}/UnArchive`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useRemoveNoteMutation,
  useArchiveNoteMutation,
  useUnArchiveNoteMutation,
} = notesApi;
