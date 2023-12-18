import { createStore, select, setProps, withProps } from '@ngneat/elf';

import { withRequestsCache, withRequestsStatus } from '@ngneat/elf-requests';

import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { UserData } from '@project-forum/userData';

const authStore = createStore(
  {
    name: 'authStoreName',
  },
  withProps<{
    User: { firstName: UserData['firstName']; token: string };
  }>({
    User: { firstName: '', token: '' },
  }),

  withRequestsCache(),
  withRequestsStatus()
);

persistState(authStore, {
  key: 'authStore',
  storage: localStorageStrategy,
});

export function setUser(
  firstName: UserData['firstName'],
  token: string
) {
  authStore.update(
    setProps({
      User: {
        firstName,
        token,
      },
    })
  );
}

export const selectUser$ = authStore.pipe(select((state) => state.User));
