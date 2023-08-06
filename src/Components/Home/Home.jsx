import Chat from "./Chat";
import Sidebar from "./Sidebar";


const Home = () => {
  return (
    <div className="homeContainer">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home;
