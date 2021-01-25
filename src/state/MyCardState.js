import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const MyCardContext = createContext();

export const MyCardState = (props) => {
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMorePage, setHasMorePage] = useState(true);
    const [heroesList, setHeroesList] = useState([]);
    
    

    return (
        <MyCardContext.Provider
          value={{
            heroesList: heroesList,
            setHeroesList: setHeroesList,
            page: page,
            setPage: setPage,
            isLoading: isLoading,
            setIsLoading: setIsLoading,
            hasMorePage: hasMorePage,
            setHasMorePage: setHasMorePage,
          }}
        >
          {props.children}
        </MyCardContext.Provider>
      );
}

