import React, { useState } from "react";

function Form_Delete() {
    const [formLink, setFormLink] = useState("");
    const [formId, setFormId] = useState(""); // Store formId for deletion

    const generateForm = async () => {
        const response = await fetch("http://localhost:5000/generate", {
            method: "POST",
        });
        const data = await response.json();
        setFormLink(data.link);
        setFormId(data.link.split("/")[4]); // Extract formId from the link
    };

    const deleteForm = async () => {
        const response = await fetch(`http://localhost:5000/form/${formId}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (data.message === "Form deleted successfully") {
            alert("Form deleted successfully");
            setFormLink(""); // Clear form link
            setFormId(""); // Clear formId
        } else {
            alert("Failed to delete the form");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Generate a Form</h1>
            <button onClick={generateForm}>Generate Form</button>
            {formLink && (
                <div>
                    <p>
                        <a href={formLink} target="_blank" rel="noopener noreferrer">
                            Open Generated Form
                        </a>
                    </p>
                    <button onClick={deleteForm}>Delete Form</button>
                </div>
            )}
        </div>
    );
}

export default Form_Delete;
