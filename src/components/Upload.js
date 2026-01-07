import React, { useState } from "react";

export default function Upload() {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleUpload = async () => {
		if (!files || files.length === 0)
			return alert("Selecciona al menos una foto");
		setLoading(true);
		const form = new FormData();
		for (let f of files) form.append("photos", f);

		try {
			const res = await fetch(
				process.env.REACT_APP_API_URL
					? process.env.REACT_APP_API_URL + "/api/upload"
					: "http://localhost:4000/api/upload",
				{
					method: "POST",
					body: form,
				}
			);
			const data = await res.json();
			if (data.ok) alert("Fotos subidas. Gracias ❤️");
			else alert("Error: " + (data.error || "desconocido"));
		} catch (e) {
			alert("Error subiendo: " + e.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="upload-card">
			<h2>Sube tus fotos ❤️</h2>
			<input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
			<div style={{ marginTop: 12 }}>
				<button className="button" onClick={handleUpload} disabled={loading}>
					{loading ? "Subiendo..." : "Subir Fotos"}
				</button>
			</div>
			<p style={{ marginTop: 10, color: "#777" }}>
				Puedes subir varias fotos a la vez. Máx. 50 por petición.
			</p>
			<div style={{ marginTop: 16 }}>
				<img
					src={process.env.PUBLIC_URL + "/preview.png"}
					alt="preview"
					style={{ width: 220, borderRadius: 12 }}
				/>
			</div>
		</div>
	);
}
