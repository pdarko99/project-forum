import { createStore, select, setProps, withProps } from '@ngneat/elf';

import { withRequestsCache, withRequestsStatus } from '@ngneat/elf-requests';

import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { UserData } from '@project-forum/userData';

const authStore = createStore(
  {
    name: 'authStoreName',
  },
  withProps<{
    User: { id: string; firstName: UserData['firstName'] };
  }>({
    User: { id: '', firstName: '' },
  }),

  withRequestsCache(),
  withRequestsStatus()
);

persistState(authStore, {
  key: 'authStore',
  storage: localStorageStrategy,
});

export function setUser(id: string, firstName: UserData['firstName']) {
  authStore.update(
    setProps({
      User: {
        id: id,
        firstName: firstName,
      },
    })
  );
}

export const selectUser$ = authStore.pipe(select((state) => state.User));
