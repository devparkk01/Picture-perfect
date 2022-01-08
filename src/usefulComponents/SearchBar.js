
const SearchBar = (props) => {


  const changeSearchHandler = (e)=> {
    props.searchHandler(e.target.value) ;
  }


    return (
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8 my-5">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search for a movie"
                onChange = {changeSearchHandler}
              />
            </div>
          </div>
        </div>
    )

}

export default SearchBar ; 