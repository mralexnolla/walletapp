/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import {useSelector} from 'react-redux'

function DefaultLayout({children}) {
    const [collapsed, setCollapsed] = useState(false)

    const user = useSelector((store) => store.user.user);

  return (
    <div className="layout">
      <div className="sidebar"> SideBar</div>
      <div className="body">
        <div className="header flex justify-between align-center">
          <div>
            {collapsed && <i className="ri-close-line" onClick={() => setCollapsed(false)}></i>}
            {!collapsed && <i className="ri-menu-2-line" onClick={() => setCollapsed(true)} ></i>}
          </div>

          <div>
            <h1 className="text-xl">
               RAPIDREQUEST
            </h1>
          </div>

          <div>
             <h1 className="text-sm underline">
                {user.firstName} {user.lastName}
             </h1>
          </div>

        </div>
        <div className="content"> {children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout
