import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Main from "./pages/Main";
const Main = React.lazy(() => import("./pages/Main"));
const Groups = React.lazy(() => import("./pages/Groups"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const List = React.lazy(() => import("./pages/List"));
const Users = React.lazy(() => import("./pages/Users"));
const Games = React.lazy(() => import("./pages/Games"));

// import Members from "./pages/Members";
// import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
// import List from "./pages/List";
import { useState, useEffect } from "react";
import useFetch2 from "./hooks/UseFetch2";
import { Suspense } from "react";


function App() {
  const getImageUrl = async (gameId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}`
      );
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      return xmlDoc.getElementsByTagName("thumbnail")[0].textContent;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  return (
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="groups/:id" element={<Groups />} />
          <Route path="list" element={<List />} />
          <Route path="games" element={<Games getImageUrl={getImageUrl}/>} />
          <Route path="users" element={<Users getImageUrl={getImageUrl}/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
