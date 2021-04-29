import React, {useContext} from "react";
import UserContext from "../../utils/user";



const SearchBar = () => {
    const context = useContext(UserContext);

    return (
        <div className="searchbox">
      <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              Search
            </span>
          </div>
          <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="name"
          aria-label="Search"
          onChange={e => context.handleSearch(e)}
        />
        </div>
    </div>
    )
}

export default SearchBar;