import mongoose from "mongoose";

const SubCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subCategories: [SubCategorySchema] 
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);