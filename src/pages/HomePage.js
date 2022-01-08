import MovieList from "../usefulComponents/MovieList";
import Navbar from "../usefulComponents/Navbar";
import SearchBar from "../usefulComponents/SearchBar";
import {useState} from "react" ; 


const HomePage = (props) => {
  const [searchData, setSearchData] = useState("");
  
  const searchHandler = (data) => {
    setSearchData(data); 
  }


  return (
    <div>
      <Navbar />
      <div className="container" style={{ backgroundColor: "black" }}>
        <SearchBar searchHandler = {searchHandler } />
        <div>
          <MovieList searchData = {searchData}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
