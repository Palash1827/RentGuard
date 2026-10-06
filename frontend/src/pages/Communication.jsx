import AIChat from "../components/AIChat";

function Communication() {

  return (
    <>

      <div className="page-header">

        <div>
          <h1>
            Communication
          </h1>

          <p>
            Communicate with your landlord and RentGuard AI.
          </p>
        </div>

      </div>


      <div className="communication-grid">

        <div className="panel landlord-chat">

          <h2>
            Landlord
          </h2>

          <div className="chat-message landlord">
            I'll send a plumber tomorrow morning.
          </div>

          <div className="chat-message tenant">
            Thank you. Please let me know the arrival time.
          </div>

          <div className="chat-input">
            <input
              placeholder="Write a message..."
            />

            <button>
              Send
            </button>
          </div>

        </div>


        <AIChat />

      </div>

    </>
  );
}

export default Communication;