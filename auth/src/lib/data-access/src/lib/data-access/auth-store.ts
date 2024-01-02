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
      tokenExpiration?: number;
      tokenTimestamp?: number;
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
  source: () => authStore.pipe(excludeKeys(['User'])),
});

export function setUser(
  firstName: UserData['firstName'],
  token: string,
  tokenExpiration?: number,
  tokenTimestamp?: number
) {
  authStore.update(
    setProps({
      User: {
        firstName,
        token,
        tokenExpiration,
        tokenTimestamp,
      },
    })
  );
}

export const selectUser$ = authStore.pipe(select((state) => state.User));

export function getTokenExpiration() {
  return authStore.query((state) => state.User.tokenExpiration);
}

export function getTokenTimestamp() {
  return authStore.query((state) => state.User.tokenTimestamp);
}
