class ModalImage extends HTMLElement {
	#src = null;
	#alt = null;
	#imgElem = null;
	constructor () {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				dialog {
					border: none;
					padding: 0;
					background-color: rgba(0,0,0,0);
				}

				dialog img {
					max-width: 100%;
					max-height: 100%;
				}

				dialog #dialog-content {
					max-width: 90%;
					margin: auto;
					background-color: white;
					padding: 1em;
				}

				dialog #close {
					cursor: pointer;
				}
				img {
					min-width: 100%;
					max-width: 100%;
					min-height: 100%;
					max-height: 100%;
				}
			</style>
			<img>
		`;
		this.#imgElem = this.shadowRoot.querySelector("img");
		this.#imgElem.onclick = this.modalZoom.bind(this);
	}

	connectedCallback () {
		const thumbnail = this.getAttribute("thumb")
		const src = this.getAttribute("src");
		const alt = this.getAttribute("alt");
		this.#src = src;
		this.#alt = alt;
		this.#imgElem.src = thumbnail;
		this.#imgElem.alt = alt;
	}

	modalZoom () {
		const modalBox = document.createElement("dialog");
		modalBox.innerHTML = `
			<div id="dialog-content">
				<button id="close">&times;</button>
				<img src="${this.#src}" alt="${this.#alt}">
				<div>${this.#alt}</div>
			<div>
		`;
		this.shadowRoot.appendChild(modalBox);
		modalBox.showModal();
		modalBox.querySelector("#close").onclick = (e) => {
			e.preventDefault();
			modalBox.close();
			modalBox.parentElement.removeChild(modalBox);
		};
	}
}

customElements.define("modal-image", ModalImage);
