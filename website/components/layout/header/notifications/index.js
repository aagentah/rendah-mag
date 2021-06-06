import { useState } from 'react';
import cx from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import find from 'lodash/find';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import { Icon } from 'next-pattern-library';

export default function Notifications({ navOnWhite, meta }) {
  const app = useApp();
  const [user, { mutate }] = useUser();
  const [dialogActive, setDialogActive] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const iconBell = <Icon icon={['fas', 'bell']} />;
  const iconWarning = <Icon icon={['fas', 'exclamation-triangle']} />;
  const iconTick = <Icon icon={['fas', 'check-circle']} />;

  const dialogClass = cx({
    active: dialogActive,
    empty: !user?.notifications?.length,
  });
  const notifcationIconClass = cx({
    'has-unread': find(user.notifications, { hasOpened: false }) && !hasOpened,
  });

  return (
    <div className="relative">
      <div
        className={`notifcations__icon  ${notifcationIconClass}`}
        onClick={() => {
          if (!dialogActive) {
            // Update notifications to hasOpened
            fetch(`${process.env.SITE_URL}/api/user`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                notificationsUpdate: true,
              }),
            });
          }

          setDialogActive(!dialogActive);
          setHasOpened(true);
        }}
      >
        {iconBell}
      </div>
      <div className={`notifications__caret  ${dialogClass}`} />
      <div className={`notifications__dialog  ${dialogClass}`}>
        {user?.notifications?.length
          ? user.notifications.map((item, i) => (
              <article
                className={`notifications__dialog__row  ${
                  item?.hasOpened && 'silver'
                }`}
                key={item._key}
              >
                <div className="col-5  flex  align-center  justify-center">
                  {iconWarning}
                </div>
                <div className="col-19  flex  flex-wrap  align-center  pl2  pr3">
                  <div className="col-24">
                    <p className="f7  t-primary  pb2">{item.title}</p>
                  </div>

                  <div className="col-24">
                    <div className="f7  lh-copy  pb2">
                      <BlockContent blocks={item.body} />
                    </div>
                  </div>
                  <div className="col-24">
                    <p className="f8  t-secondary">
                      {new Date(item.created).toDateString()}
                    </p>
                  </div>
                </div>
              </article>
            ))
          : null}

        {!user?.notifications?.length ? (
          <article className="notifications__dialog__row  silver">
            <div className="col-5  flex  align-center  justify-center">
              {iconTick}
            </div>
            <div className="col-19  flex  flex-wrap  align-center  pl2  pr3">
              <div className="col-24">
                <p className="f7  t-primary  pb2">No notifications</p>
              </div>

              <div className="col-24">
                <div className="f7  lh-copy">You're all caught up.</div>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
}
