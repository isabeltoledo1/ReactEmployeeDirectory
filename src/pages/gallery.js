import React, { useEffect, useState } from "react";
import API from "../utils/api";
import CardContainer from "../components/cardContainer";
import UserContext from "../utils/user";
import SearchBar from "../components/search";
import SortTable from "../components/sorting";

const Gallery = () => {
    const [developerState, setDeveloperState] = useState ({
        users: [],
        order: "descend",
        filteredUsers: [],
        headings: [
            { name: "Image", width: "10%", order: "descend" },
            { name: "name", width: "10%", order: "descend" },
            { name: "phone", width: "25%", order: "descend" },
            { name: "email", width: "25%", order: "descend" },
            { name: "dob", width: "10%", order: "descend" },
        ]
    });

    const handleSort = heading => {
        let currentOrder = developerState.headings.filter(elem => elem.name === heading).map(elem => elem.order).toString();

        if (currentOrder === "descend") {
            currentOrder = "ascend";
        } else {
            currentOrder = "descend";
        }
        const sortFunction = (a, b) => {
            if (currentOrder === "ascend") {
              if (a[heading] === undefined) {
                return 1;
              } else if (b[heading] === undefined) {
                return -1;
              }
              else if (heading === "name") {
                return a[heading].first.localeCompare(b[heading].first);
              } else if (heading === "dob") {
                return a[heading].age - b[heading].age;
              } else {
                return a[heading].localeCompare(b[heading]);
              }
            } else {
              if (a[heading] === undefined) {
                return 1;
              } else if (b[heading] === undefined) {
                return -1;
              }
              else if (heading === "name") {
                return b[heading].first.localeCompare(a[heading].first);
              }else if (heading === "dob") {
                return b[heading].age - a[heading].age;
              }  else {
                return b[heading].localeCompare(a[heading]);
              }
            }
          };
          const sortedUsers = developerState.filteredUsers.sort(sortFunction);
          const updatedHeadings = developerState.headings.map(elem => {
          elem.order = elem.name === heading ? currentOrder : elem.order;
          return elem;
    });

    setDeveloperState({
      ...developerState,
      filteredUsers: sortedUsers,
      headings: updatedHeadings
    });

    }

    const handleSearch = event => {
        const filter = event.target.value;
        const filteredList = developerState.users.filter(item => {
            let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
            if(values.indexOf(filter.toLowerCase()) !== -1) {
                return item
            };
        });
        setDeveloperState({...developerState, filteredUsers: filteredList});
    };

    useEffect(() => {
        API.getUsers().then(results => {
            setDeveloperState({
                ...developerState,
                users: results.data.results,
                filteredUsers: results.data.results
            });
        });
    }, []);


    return (
        <UserContext.Provider value ={{developerState, handleSearch, handleSort}}>
            <div>
                <SearchBar />
                <div className="data-area">
        {developerState.filteredUsers.length > 0 ? <SortTable /> : <div></div>}
      </div>
                <CardContainer />
            </div>
        </UserContext.Provider>
    )
}

export default Gallery;