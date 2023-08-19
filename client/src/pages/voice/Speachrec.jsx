import "regenerator-runtime/runtime";
import { useRef, useState, useEffect } from "react";
import { BiSolidMicrophoneAlt } from "react-icons/bi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "core-js/stable";

import { useSelector } from "react-redux";

const Speachrec = () => {

    const user = useSelector(store => store.user.user)
    const pendingRequests = useSelector(store => store.requestCount.requestCount)

  const commands = [
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: ["I want *", "I prefer *", "Give me some *"],
      callback: (msg) => setMessage(`Your ${msg} is served`),
    },
    {
      command: [
        "my balance",
        "account balance",
        "my account balance",
        "give me my account balance",
      ],
      callback: () => setBalance(user.avlbal),
    },
    {
      command: [
        "pendings",
        "pending",
        "my pendings",
        "my pending request",
        "my pending requests",
        "pending requests",
        "How many pending requests do i have",
        "show me my pending requests",
      ],
      callback: () => setPendings(pendingRequests),
    },
    {
      command: "thank you",
      callback: () => setMessage(`You are most welcome`),
    },
  ];

  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("");
  const [pendings, setPendings] = useState("")

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  useEffect(() => {
    setMessage("");
    setBalance("");
    setPendings("")
  }, [transcript]);

  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
  };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="microphone-container">
        Browser does not Support Speech Recognition.
      </div>
    );
  }

  return (
    <div className="microphone-wrapper">
      <div>
        <div className="mircophone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListing}
          >
            <BiSolidMicrophoneAlt className="microphone-icon" />
          </div>
          <div className="microphone-status">
            {isListening ? "Listening..." : "Click to start Listening"}
          </div>
          {isListening && (
            <button
              className="stopbtn primary-contained-btn"
              onClick={stopHandle}
            >
              Stop
            </button>
          )}
          <div>
            <button
              className="resetbtn primary-contained-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            {message && <p>{message}</p>}

            {balance && (
              <div>
                <h1>Your Current balance is </h1>
                <div>
                  <h1>
                    Ghs <span className="balance">{balance}</span>{" "}
                  </h1>
                </div>
              </div>
            )}

            {pendings !== "" && (
              <div>
                <div>
                  {pendings === 0 ? (
                    <h1>You have no pending requests</h1>
                  ) : (
                    <h1>
                      You have <span className="pending">{pendings}</span> request
                    </h1>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Speachrec;
