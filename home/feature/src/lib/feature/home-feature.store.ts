import { createStore } from '@ngneat/elf';
import {
  //   getAllEntities,
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {
  createRequestDataSource,
  withRequestsCache,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { forum } from '@project-forum/home/model';

// import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

const forumStore = createStore(
  {
    name: 'forumStoreName',
  },
  withEntities<forum>(),

  withRequestsCache(),
  withRequestsStatus()
);

// persistState(forumStore, {
//   key: 'forumStore',
//   storage: localStorageStrategy,
// });

const forumDataSource = createRequestDataSource({
  data$: () => forumStore.pipe(selectAllEntities()),
  dataKey: 'forum',
  idleAsPending: true,
  requestKey: 'forum',
  store: forumStore,
});

export function setForum(forums: forum[]) {
  forumStore.update(
    setEntities(forums),
    forumDataSource.setSuccess(),
    forumDataSource.setCached()
  );
}

export const selectForumDataSource$ = forumDataSource.data$();
