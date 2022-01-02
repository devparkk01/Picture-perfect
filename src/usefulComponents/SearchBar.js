
const SearchBar = (props) => {


  const changeSearchHandler = (e)=> {
    props.searchHandler(e.target.value) ;
  }


    return (
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8 my-4">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                // value = "Search a movie "
                placeholder="Search a movie"
                onChange = {changeSearchHandler}
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
    )

}

export default SearchBar ; 