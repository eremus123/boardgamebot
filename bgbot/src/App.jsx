import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));
const Groups = React.lazy(() => import("./pages/Groups"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const List = React.lazy(() => import("./pages/List"));
const Users = React.lazy(() => import("./pages/Users"));
const Games = React.lazy(() => import("./pages/Games"));

import NavBar from "./components/NavBar";

import { useState, useEffect } from "react";
import { Suspense } from "react";

function App() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedGameDetails, setSelectedGameDetails] = useState({}); //for updatemodal only




  const getImageUrl = async (gameId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}`
      );
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      console.log(xmlDoc.getElementsByTagName("thumbnail")[0].textContent);
      return xmlDoc.getElementsByTagName("thumbnail")[0].textContent;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const delGame = async (recordId) => {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames/${recordId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer pat4GDBKgsQnZPgiY.c451f2ce36ec83b5deaf0ffae6c9f073e44d9c5ee26d29b71b54edb92d249246",

            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Game deleted successfully");
        window.location.reload();//refresh to update the UI
      } else {
        console.error("Failed to delete game", await response.text());
      }
    } catch (error) {
      console.error("Error deleting game:", error);
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
          <Route
            path="games"
            element={<Games getImageUrl={getImageUrl} delGame={delGame}         showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            selectedGameDetails={selectedGameDetails}
            setSelectedGameDetails={setSelectedGameDetails}/>}
          />
          <Route
            path="users"
            element={<Users getImageUrl={getImageUrl} delGame={delGame}         showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            selectedGameDetails={selectedGameDetails}
            setSelectedGameDetails={setSelectedGameDetails}/>}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
