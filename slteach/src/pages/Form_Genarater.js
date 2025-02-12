import React, { useState, useEffect } from "react";
import "./Form_Gen.css";
import "../App.css";
import Navbar from "../Comp/Navbar";

function Form_Genarater() {
    const [formLink, setFormLink] = useState("");
    const [className, setClassName] = useState("");
    const [groupNo, setGroupNo] = useState("");
    const [startDate, setStartDate] = useState("");
    const [price, setPrice] = useState("");
    const [forms, setForms] = useState([]);
    const [error, setError] = useState(null); // For handling errors

    // Fetch forms from backend on component mount
    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch("http://localhost:9000/forms");
                if (!response.ok) {
                    throw new Error("Failed to fetch forms");
                }
                const data = await response.json();
                setForms(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchForms();
    }, []);

    const generateForm = async () => {
        // Validation
        if (!className || !groupNo || !startDate || !price) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:9000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ className, groupNo, startDate, price }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate form");
            }

            const data = await response.json();
            setFormLink(data.link);

            // Refresh forms list after generating a new form
            setForms((prevForms) => [...prevForms, { link: data.link }]);
            setError(null); // Clear error if successful
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteForm = async (formLink) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this form?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:9000/form/${formLink}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete form");
            }

            // Remove the form from state after deletion
            setForms(forms.filter((form) => form.link !== formLink));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="maincontainer">
                <div className="form-panel">
                    <h1>Form Generator</h1>

                    {/* Display error message if there is an error */}
                    {error && <p className="error">{error}</p>}

                    <form className="generator">
                        <label>Class Name</label>
                        <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} />

                        <label>Group No</label>
                        <input type="text" value={groupNo} onChange={(e) => setGroupNo(e.target.value)} />

                        <label>Starting Date</label>
                        <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                        <button type="button" onClick={generateForm}>
                            Generate Form
                        </button>
                    </form>

                    {formLink && (
                        <p>
                            <a href={formLink} target="_blank" rel="noopener noreferrer">
                                Open Generated Form
                            </a>
                        </p>
                    )}

                    <h2>Form Dashboard</h2>
                    <ul>
                        {forms.map((form, index) => (
                            <li key={index}>
                                <a href={form.link} target="_blank" rel="noopener noreferrer">
                                    {form.link}
                                </a>
                                <button onClick={() => deleteForm(form.link)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Form_Genarater;
