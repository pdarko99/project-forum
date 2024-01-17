import { createStore, select, setProps, withProps } from '@ngneat/elf';

import { withRequestsCache, withRequestsStatus } from '@ngneat/elf-requests';

import {
  excludeKeys,
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state';
import { UserData } from '@project-forum/userData';

const authStore = createStore(
  {
    name: 'authStoreName',
  },
  withProps<{
    token: string;
    User: {
      firstName: UserData['firstName'];
    };
  }>({
    token: '',
    User: { firstName: '' },
  }),

  withRequestsCache(),
  withRequestsStatus()
);

persistState(authStore, {
  key: 'authStore',
  storage: localStorageStrategy,
  // source: () => authStore.pipe(excludeKeys(['User'])),
});

export function setUser(
  firstName: UserData['firstName'],
  token: string,
) {
  authStore.update(
    setProps({
      token,
      User: {
        firstName,
      },
    })
  );

}

export const selectUser$ = authStore.pipe(select((state) => state.User));

export const selectToken$ = authStore.pipe(select((state) => state.token));

export function getToken() {
  return authStore.query((state) => state.token);
}


