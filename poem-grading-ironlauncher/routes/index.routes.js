const router = require("express").Router()

//! All routes are prefixed by /api
router.get("/", (req, res, next) => {
	try {
		res.json("All good in here")

		throw Error("Error happening")
	} catch (error) {
		next(error)
	}
})

router.use("/pets", require("./pets.routes.js"))

module.exports = router
