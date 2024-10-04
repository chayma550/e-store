import Product from "../models/Product.js"
//add product
export const addProduct =async(req,res,next)=>{
    const newProduct=new Product(req.body)
    try{
        const savedProduct=await newProduct.save()
        res.status(201).json(savedProduct)

    }catch(err){
        next(err)
        console.log(err)
    }
}

//update product
export const updateProduct = async (req, res, next) => {
    try{
        const updateProduct=await Product.findByIdAndUpdate(req.params.id,{
           $set:req.body
        },{new:true})
        res.status(200).json(updateProduct)
      }catch(err){
        next(err)
      }
  }; 
//delete product
  export const deleteProduct=async(req,res,next)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product deleted!!")

    }catch(err){
        res.status(500).json(err)
        next(err)


    }
}
//get product

export const getProduct=async(req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id)
        res.status(200).json(product)

    }catch(err){
        next(err)
    }
}
// Get products
export const getProducts = async (req, res, next) => {
    const catName = req.query.cat; // Category from query
    const subCategory = req.query.subCategory; // Subcategory from query
    const maxPrice = req.query.maxPrice;
    const sort = req.query.sort;
    const qRandom = req.query.random; 
    

    try {
        let query = {};

        if (catName) {
            query["categories.category"] = catName; // Match the category
        }

        if (subCategory) {
            query["categories.subCategories"] = subCategory; // Match the subcategory
        }

        // Filter by max price
        if (maxPrice) {
            query.price = { $lte: maxPrice }; // Filter by price
        }

        let products;

        // Sorting logic
        let sortOption = {};
        if (sort === 'asc') {
            sortOption.price = 1;
        } else if (sort === 'desc') {
            sortOption.price = -1;
        }

        if (qRandom) {
            products = await Product.aggregate([{ $match: query }, { $sample: { size: 5 } }]); // Apply filters, then random sampling
        } else {
            // Fetch products with sorting, pagination
            products = await Product.find(query).sort(sortOption);
                 
            
        }

        res.status(200).json(products);



    } catch (err) {
        console.error(err);
        next(err);
    }
};







export const getProductsByIds = async (req, res) => {
    try {
        const { productIds } = req.body;
        const products = await Product.find({ '_id': { $in: productIds } });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
