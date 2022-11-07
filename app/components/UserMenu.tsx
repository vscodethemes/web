import * as React from 'react';
import { Form, Link } from '@remix-run/react';
import Popover from './Popover';

export type UserMenuProps = {
  user?: {
    id: string;
    login: string;
    avatarUrl: string;
  };
};

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const anchor = React.useRef<HTMLButtonElement | null>(null);

  if (!user) {
    return <Link to="/auth/github/signin">Sign in with Github</Link>;
  }

  return (
    <>
      <button
        className="user-avatar"
        type="button"
        ref={anchor}
        data-open={isOpen}
        onClick={() => setIsOpen(true)}
        aria-label="User menu"
      >
        <img src={user.avatarUrl} />
      </button>
      {anchor.current && (
        <Popover
          open={isOpen}
          anchor={anchor.current}
          anchorAlignment={{ horizontal: 'right' }}
          onClose={() => setIsOpen(false)}
        >
          <div className="user-menu">
            <div className="user-info">
              Signed in as <strong>{user.login}</strong>
            </div>
            <hr className="user-divider" />
            <Link className="select-option" to="/favorites">
              Favorites
            </Link>
            <Link className="select-option" to="/preferences">
              Preferences
            </Link>
            <hr className="user-divider" />
            <Form className="user-signout" method="post" action="/auth/signout">
              <button className="select-option">Sign Out</button>
            </Form>
          </div>
        </Popover>
      )}
    </>
  );
}
