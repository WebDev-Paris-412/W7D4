const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const petSchema = new Schema(
	{
		name: { type: String, required: true },
		type: {
			type: String,
			enum: ["dog", "cat", "parrot", "crocodile"],
			required: true,
		},
		colors: [
			{
				type: String,
				maxlength: 20,
			},
		],
		birth: {
			type: Date,
			required: true,
		},
		picture: {
			type: String,
			default: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47",
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
)

const Pet = model("Pet", petSchema)

module.exports = Pet
