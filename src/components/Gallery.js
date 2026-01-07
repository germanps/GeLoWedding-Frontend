import React, { useEffect, useState } from "react";

export default function Gallery({ galleryKey }) {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchList = async () => {
			try {
				const url = process.env.REACT_APP_API_URL
					? process.env.REACT_APP_API_URL + "/api/upload/list"
					: "http://localhost:4000/api/upload/list";
				const res = await fetch(url, {
					headers: {
						"x-gallery-key": galleryKey,
					},
				});
				const data = await res.json();
				if (data.ok) setPhotos(data.urls || []);
				else setError(data.error || "No autorizado");
			} catch (e) {
				console.error(e);
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchList();
	}, [galleryKey]);

	if (loading)
		return (
			<p style={{ textAlign: "center", marginTop: 30 }}>Cargando galería...</p>
		);
	if (error)
		return (
			<p style={{ textAlign: "center", marginTop: 30, color: "red" }}>
				Error: {error}
			</p>
		);

	return (
		<div>
			<h2 style={{ textAlign: "center", color: "#8a6d5a" }}>
				Galería de la boda 📷✨
			</h2>
			<div className="gallery">
				{photos.map((u, i) => (
					<img src={u} alt={`foto-${i}`} key={i} />
				))}
			</div>
		</div>
	);
}
