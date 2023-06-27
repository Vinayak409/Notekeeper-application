import React, { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
//import notes from "./notes.js";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function deleteNote(id) {
    //console.log(id);
    setNotes((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  function addNote(newNote) {
    //console.log(newNote);
    //const newValue = event.target.value;
    setNotes((prevItems) => {
      return [...prevItems, newNote];
    });
  }

  function displayNotes() {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;

    return notes
      .slice(startIndex, endIndex)
      .map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          deleteNote={deleteNote}
        />
      ));
  }

  function displayPagination() {
    const totalPages = Math.ceil(notes.length / 6);

    return (
      <div
        style={{
          position: "absolute",
          // right: "50%",
          padding: "0 50px",
          margin: "0 40px",
          bottom: "0",
        }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            style={{
              background: "#e7e7e7",
              padding: "4px 8px",
              color: "#333",
            }}
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {displayNotes()}
      {displayPagination()}
      <Footer />
    </div>
  );
}

export default App;
