const getAllRecipes=(req,res)=>
{
    res.json("all recipes");
}

const getRecipe=(req,res)=>
{
    res.json("only a specific recipe");
}


const myRecipes=(req,res)=>
{
    res.json(" my recipes");
}


const getfavRecipes=(req,res)=>
{
    res.json("favourite recipes");
}


const addRecipe=(req,res)=>
{
    res.json("add recipe")

}

const delRecipe=(req,res)=>
{
    res.json("delete recipes");
}

const editRecipe=(req,res)=>
{
    res.json({"msg":"this is edited recipee"});
}

module.exports={getAllRecipes,getRecipe,addRecipe,getfavRecipes,myRecipes,delRecipe,editRecipe};