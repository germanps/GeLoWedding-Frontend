import React, { useState } from "react";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";
import GalleryLogin from "./components/GalleryLogin";

export default function App() {
	const [page, setPage] = useState("upload");
	const [galleryKey, setGalleryKey] = useState(
		localStorage.getItem("gallery_key") || ""
	);

	const onSetKey = (k) => {
		localStorage.setItem("gallery_key", k);
		setGalleryKey(k);
		setPage("gallery");
	};

	return (
		<div>
			<header className="header">
				<h1>Fotos de Nuestra Boda 💍✨</h1>
				<div className="nav">
					<button className="button" onClick={() => setPage("upload")}>
						Subir
					</button>
					<button className="button" onClick={() => setPage("gallery")}>
						Galería
					</button>
				</div>
			</header>

			{page === "upload" && <Upload />}
			{page === "gallery" &&
				(galleryKey ? (
					<Gallery galleryKey={galleryKey} />
				) : (
					<GalleryLogin onSetKey={onSetKey} />
				))}
		</div>
	);
}
