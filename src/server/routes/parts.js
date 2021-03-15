const express = require("express");
const router = express.Router();
const queryContent = require("../utils/query-content");
const storeParts = require("../mock-data/parts");
const partsPerType = require("../mock-data/parts-per-type");
const partTypes = require("../mock-data/part-types");

router.get("/parts", (req, res) => {
	const params = { ...req.query };
	res.set("Access-Control-Allow-Origin", "*");
	const delay = getDelay();
	let content = null;
	if (params.type) {
		setTimeout(() => {
			content = partsPerType[params.type.toLowerCase()];
			const response = queryContent(content, params.query);
			res.send(response || []);
		}, delay);
		return;
	}
	setTimeout(() => {
		content = storeParts;
		res.send(queryContent(content, params.query));
	}, delay);
});

router.get("/parts/:name", (req, res) => {
	res.set("Access-Control-Allow-Origin", "*");
	const name = req.params.name;
	const delay = getDelay();
	let content = null;
	setTimeout(() => {
		content = storeParts.find(part => part.name === name);
		res.send(content);
	}, delay);
});

router.get("/part-types", (req, res) => {
	res.set("Access-Control-Allow-Origin", "*");
	res.send(partTypes);
});

function getDelay() {
	return Math.random() * 6 * 1000;
}

module.exports = router;
