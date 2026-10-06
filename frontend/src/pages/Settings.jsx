import { useAuth } from "../context/AuthContext";

function Settings() {

  const { user, logout } =
    useAuth();

  return (
    <>

      <div className="page-header">

        <div>
          <h1>
            Settings
          </h1>

          <p>
            Manage your RentGuard account.
          </p>
        </div>

      </div>


      <div className="settings-card">

        <div className="setting">

          <div>
            <strong>
              Full Name
            </strong>

            <p>
              {user?.name}
            </p>
          </div>

        </div>


        <div className="setting">

          <div>
            <strong>
              Email
            </strong>

            <p>
              {user?.email}
            </p>
          </div>

        </div>


        <div className="setting">

          <div>
            <strong>
              Email Notifications
            </strong>

            <p>
              Receive complaint updates.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>


        <div className="setting">

          <div>
            <strong>
              Repair Notifications
            </strong>

            <p>
              Get notified about repair progress.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>


        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </>
  );
}

export default Settings;