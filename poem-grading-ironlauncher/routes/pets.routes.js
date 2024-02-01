const router = require("express").Router()
const Pet = require("./../models/Pet.model")
const limit = 10
/**
 * Routing
 * ! /api/pets
 */
// Get all
router.get("/", async (req, res, next) => {
	try {
		const page = req.query.page ?? 0
		const filter = {}
		if (req.query.type) {
			filter.type = req.query.type
		}

		const allPets = await Pet.find(filter)
			.limit(limit)
			.skip(limit * page)
		res.json({ count: allPets.length, result: allPets })
	} catch (error) {
		next(error)
	}
})

// Get one

router.get("/:petId", async (req, res, next) => {
	try {
		const onePet = await Pet.findById(req.params.petId)

		res.json(onePet)
	} catch (error) {
		next(error)
	}
})

// Create a pet

router.post("/", async (req, res, next) => {
	try {
		const { name, type, colors, birth, picture } = req.body

		const petToCreate = { name, type, colors, birth, picture }

		const createdPet = await Pet.create(petToCreate)

		res.status(201).json(createdPet)
	} catch (error) {
		next(error)
	}
})

router.delete("/:petId", async (req, res, next) => {
	try {
		const success = await Pet.findByIdAndDelete(req.params.petId)
		if (!success) {
			return res.status(400).json({
				message: `We could not find the pet with id: ${req.params.petId}`,
			})
		}

		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

router.put("/:petId", async (req, res, next) => {
	try {
		const { petId } = req.params
		const { name, type, colors, birth, picture } = req.body

		const updates = { name, type, colors, birth, picture }

		const udpatedPet = await Pet.findByIdAndUpdate(petId, updates, {
			new: true,
		})
		// const udpatedPet = await Pet.findOneAndUpdate({_id: petId}, updates, {new: true})

		res.status(202).json(udpatedPet)
	} catch (error) {
		next(error)
	}
})

module.exports = router
