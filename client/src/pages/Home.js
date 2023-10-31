
import Title from "../components/layout/Title";
import AddPerson from "../components/forms/AddPerson";
import AddCar from "../components/forms/AddCar";
import People from "../components/lists/People";
import Cars from "../components/lists/Cars";
import "./Home.css";

const Home = () => {
  
  return (
    <div>
      <Title />
      <div className="Form">
        <AddPerson />
        <AddCar />
      </div>
      <People />
      <Cars />
    </div>
  );
};

export default Home;
