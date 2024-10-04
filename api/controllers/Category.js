import Category from "../models/Category.js"

export const addCategory = async (req, res, next) => {
    const { name, subCategories } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }

    try {
        const newCat = new Category({
            name,
            subCategories: subCategories.map(subCat => ({ name: subCat })) // Assuming subCategories is an array of strings

        });

        const savedCat = await newCat.save();

        res.status(201).json(savedCat);
    } catch (err) {
        next(err);
    }
};

//get category
export const getCategory=async(req,res,next)=>{
    try{
        const category=await Category.findById(req.params.id)
        res.status(200).json(category)

    }catch(err){
        next(err)
    }
}
//update category
export const updateCategory =async(req,res,next)=>{
    const {name,subCategories}=req.body;
    const categoryId=req.params.id;
    if(!name){
        return res.status(400).json("category name is required!")
    }
    try{
        const updateCategory=await Category.findByIdAndUpdate(categoryId,{name,subCategories})
        res.status(200).json(updateCategory)
    }catch(err){
        res.status(500).json(err)
    }
}

export const getCategorys=async(req,res,next)=>{
    try{
        const categories=await Category.find()
        res.status(200).json(categories)

    }catch(err){
        next(err)
    }
}