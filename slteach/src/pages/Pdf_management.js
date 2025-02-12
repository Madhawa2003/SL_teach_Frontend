import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Comp/Navbar";
import './pdf.css';

const Pdf_management = () => {
    const [pdfs, setPdfs] = useState([]);
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [loading, setLoading] = useState(false); // For loading state
    const [error, setError] = useState(null); // For error handling

    // Fetch PDFs on component mount
    useEffect(() => {
        const fetchPdfs = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://slteach-4914784447fb.herokuapp.com/pdfs");
                setPdfs(response.data);
            } catch (err) {
                setError("Error fetching PDFs");
            } finally {
                setLoading(false);
            }
        };

        fetchPdfs();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Validate PDF file type
        if (file && file.type !== "application/pdf") {
            alert("Please upload a valid PDF file");
            return;
        }
        setSelectedFile(file);
    };

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        // Validate image file type for thumbnail
        if (file && !file.type.startsWith("image/")) {
            alert("Please upload a valid image for the thumbnail");
            return;
        }
        setSelectedThumbnail(file);
    };

    const handleFileUpload = async () => {
        if (!selectedFile || !selectedThumbnail || !title) {
            alert("Please fill in all fields and upload files");
            return;
        }

        setLoading(true); // Start loading state during upload
        const formData = new FormData();
        formData.append("pdf", selectedFile);
        formData.append("thumbnail", selectedThumbnail);
        formData.append("title", title);

        try {
            const res = await axios.post("https://slteach-4914784447fb.herokuapp.com/upload", formData);
            setPdfs((prevPdfs) => [...prevPdfs, res.data]); // Avoid direct mutation of state
            setTitle("");
            setSelectedFile(null);
            setSelectedThumbnail(null);
        } catch (error) {
            setError("Error uploading PDF");
        } finally {
            setLoading(false); // Stop loading after upload
        }
    };

    const toggleVisibility = async (id, visible) => {
        try {
            const res = await axios.put(`https://slteach-4914784447fb.herokuapp.com/${id}/visibility`, { visible: !visible });
            setPdfs((prevPdfs) => prevPdfs.map((pdf) => (pdf._id === id ? res.data : pdf)));
        } catch (error) {
            setError("Error toggling visibility");
        }
    };

    const handleDelete = async (pdfId) => {
        // Confirm deletion
        const confirmDelete = window.confirm("Are you sure you want to delete this PDF?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`https://slteach-4914784447fb.herokuapp.com/${pdfId}`);
            if (response.status === 200) {
                alert(response.data.message); // Success message from the backend
                setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf._id !== pdfId)); // Remove deleted PDF from the state
            } else {
                alert("Failed to delete PDF");
            }
        } catch (error) {
            console.error("Error deleting PDF:", error);
            alert("There was an error deleting the PDF, please try again later.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="maincontainer">
                <div className="scrollcontainer">
                    <h1>PDF Management</h1>
                    <a className="links" href="https://slteach-4914784447fb.herokuapp.com/UserView">Pdf Link</a>

                    {/* Upload Form */}
                    <div className="pdfform">
                        <div className="centerdiv">
                            <label>Pdf Title -</label>
                            <input
                                type="text"
                                placeholder="Enter PDF Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br />
                            <label>Upload Pdf -</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            /><br />
                            <label>Upload Thumbnail</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                            /><br />
                            <button onClick={handleFileUpload} disabled={loading}>
                                {loading ? "Uploading..." : "Upload PDF and Thumbnail"}
                            </button>
                        </div>
                    </div>
                    {/* Display PDFs with Thumbnails */}
                    {loading ? <p>Loading PDFs...</p> : error ? <p>{error}</p> : (
                        <div className="outs">
                            {pdfs.map((pdf) => (
                                <div key={pdf._id}>
                                    <h3>{pdf.title}</h3>
                                    <img src={`https://slteach-4914784447fb.herokuapp.com${pdf.thumbnailUrl}`} alt={pdf.title} />
                                    <a href={`https://slteach-4914784447fb.herokuapp.com${pdf.fileUrl}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                                    <button onClick={() => toggleVisibility(pdf._id, pdf.visible)}>
                                        {pdf.visible ? "Hide from Users" : "Show to Users"}
                                    </button>
                                    <button onClick={() => handleDelete(pdf._id)}>Delete PDF</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Pdf_management;
