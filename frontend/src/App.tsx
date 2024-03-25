import ConversationList from "./components/ConversationList/ConversationList";
import MessageArea from "./components/MessageArea/MessageArea";
import Navbar from "./components/Navbar/Navbar";
import "./index.scss";

function App() {
  return (
    <div className="appContainer">
      <Navbar />
      <ConversationList />
      <MessageArea />
    </div>
  );
}

export default App;
