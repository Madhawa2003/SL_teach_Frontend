import React, { useState, useEffect } from "react";
import axios from "axios";
import './user.css';

const UserView = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    axios.get("https://silver-train-5gr9xj6xv5qpcvpg7-9001.app.github.dev/pdfs").then((res) => {
      setPdfs(res.data.filter((pdf) => pdf.visible)); // Show only visible PDFs
    });
  }, []);

  return (
    <>
     <div className="user-view-container">
      <div className="hedder"/>
      <h1>SL TEACH</h1>
      <h1 className="user-view-heading">ඉතාලි රියදුරු බලපත්‍ර පාඩම ඉගැන්වීමේ පාඩම් හා අදාල PDF මෙතනින් Download කරගත හැක.</h1>
      <div className="grids">
        {pdfs.map((pdf) => (
          <div key={pdf._id} className="pdf-item">
            <h3>{pdf.title}</h3>

            {/* Display Thumbnail */}
            <img
              src={`https://silver-train-5gr9xj6xv5qpcvpg7-9001.app.github.dev${pdf.thumbnailUrl}`}
              alt={pdf.title}
              className="mb-4"
            />
            <br/>

            <a
              href={`https://silver-train-5gr9xj6xv5qpcvpg7-9001.app.github.dev${pdf.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700 transition"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
    </>
   
  );
};

export default UserView;
