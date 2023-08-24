import "regenerator-runtime/runtime";
import { useRef, useState, useEffect } from "react";
import { BiSolidMicrophoneAlt } from "react-icons/bi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "core-js/stable";
import {useNavigate} from "react-router-dom"

import { useSelector } from "react-redux";
import { Modal, notification } from "antd";


const Speachrec = () => {

    const [modal, contextHolderModal] = Modal.useModal();
    const [api, contextHolderNotification] = notification.useNotification();

    const navigate = useNavigate()

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
      command: ["services", "What are your services", "What can you do for me"],
      callback: () =>
        setMessage(
          <div>
            <p>So i can help you check your balance</p>
              <p>Show your balance</p>
              <p>Number of pending request</p>
              <p>Go to any website of your choise: Simply say Open google.com or amazon.com</p>
          </div>
        ),
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
        "balance",
        "my balance",
        "account balance",
        "my account balance",
        "give me my account balance",
        "Show account balance",
      ],
      callback: () => {
        balanceModal();
      },
    },
    {
      command: [
        "status",
        "current status",
        "What is the current status",
        "whats the current status",
      ],
      callback: () => {
        openNotification();
      },
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
    {
      command: [
        "request",
        "go to the my request",
        "go to request",
        "go to requests",
      ],
      callback: () => navigate("/requests"),
    },
    {
      command: [
        "transactions",
        "go to the my transaction",
        "go to transaction",
        "go to transactions",
      ],
      callback: () => navigate("/transactions"),
    },
  ];

  

  const [message, setMessage] = useState("");
  //const [balance, setBalance] = useState("");
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
  
  /** This will display the balance in a modal */
  const balanceModal = () => {
    let secondsToGo = 6;
    const instance = modal.success({
      title: <span className="text-2xl">Here is your current balance</span>,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: (
          <div className="flex justify-center">
            <span className="text-2xl"> GHS {user.avlbal}</span>
          </div>
        ),
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };
   
  
  const key = "updatable";

  const openNotification = () => {
    api.open({
      key,
      message: "Your Balance",
      description: `GHS ${user.avlbal}`,
    });
    setTimeout(() => {
      api.open({
        key,
        message: "Requests Pending",
        description: ` ${pendingRequests} Pending Request`,
      });
      
    }, 2000);
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
          <div className="microphone-result-container flex flex-col gap-1">
            <div className="microphone-result-text h-25">{transcript}</div>
            <div>
              {message && <span className="text-2xl">{message}</span>}

              {/** This is for balance. from function  */}
              {contextHolderModal}

              {contextHolderNotification}

              {pendings !== "" && (
                <div>
                  <div>
                    {pendings === 0 ? (
                      <h1>You have no pending requests</h1>
                    ) : (
                      <h1>
                        You have <span className="pending">{pendings}</span>{" "}
                        request
                      </h1>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Speachrec;
