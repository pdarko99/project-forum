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
    Admin: {
      isAdmin: boolean;
    };
  }>({
    token: '',
    User: { firstName: '' },
    Admin: {
      isAdmin: false,
    },
  }),

  withRequestsCache(),
  withRequestsStatus()
);

persistState(authStore, {
  key: 'authStore',
  storage: localStorageStrategy,
  source: () => authStore.pipe(excludeKeys(['Admin'])),
});

export function setUser(
  firstName: UserData['firstName'],
  token: string,
  admin?: boolean
) {
  authStore.update(
    setProps({
      token,
      User: {
        firstName,
      },
      Admin: {
        isAdmin: admin ? admin : false,
      },
    })
  );
}

export function setAdmin(admin: boolean) {
  authStore.update(
    setProps({
      Admin: {
        isAdmin: admin,
      },
    })
  );
}

export const selectUser$ = authStore.pipe(select((state) => state.User));

export const selectToken$ = authStore.pipe(select((state) => state.token));

export const selectIsAdmin$ = authStore.pipe(
  select((state) => state.Admin.isAdmin)
);

export function getToken() {
  return authStore.query((state) => state.token);
}
