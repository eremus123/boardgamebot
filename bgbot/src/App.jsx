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
        `https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}`
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

  const delGame = async (recordId) => {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/appnFG2kbIVgZNH8a/boardgames/${recordId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: import.meta.env.VITE_TOKEN,

            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Game deleted successfully");
        window.location.reload(); //refresh to update the UI
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
            element={
              <Games
                getImageUrl={getImageUrl}
                delGame={delGame}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                selectedGameDetails={selectedGameDetails}
                setSelectedGameDetails={setSelectedGameDetails}
              />
            }
          />
          <Route
            path="users"
            element={
              <Users
                getImageUrl={getImageUrl}
                delGame={delGame}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                selectedGameDetails={selectedGameDetails}
                setSelectedGameDetails={setSelectedGameDetails}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
