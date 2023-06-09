const AdvancedResults = (model , populate) => async( req,res,next ) =>{
     // Main Query
     let query;

     // removing specific querys from req.query

     let reqQuer = { ...req.query };
     let removeFromQuery = ["select", "sort", "page", "limit"];
     // Deleting specific querys from req.query

     removeFromQuery.forEach((item) => delete reqQuer[item]);

     // Adding $ to gt gte lt lte in strings
     let queryStr = JSON.stringify(reqQuer);
     queryStr = queryStr.replace(
       /\b(gt|gte|lt|lte|in)\b/g,
       (match) => `$${match}`
     );
   // Main Query
     query = model.find(JSON.parse(queryStr));

     // Selecting
     if (req.query.select) {
       let select = req.query.select.split(",").join(" ");
       query = query.select(select);
     }

     // Sorting

     if (req.query.sort) {
       let sort = req.query.sort.split(",").join(" ");
       query = query.sort(sort);
     } else {
       query = query.sort("-createdAt");
     }

     // Adding Pagination

     let page = parseInt(req.query.page, 10) || 1;
     let limit = parseInt(req.query.limit, 10) || 10;
     let startIndex = (page - 1) * limit;
     let endIndex = page * limit;
     let total = await model.countDocuments();

     query = query.skip(startIndex).limit(limit);

     // Executing Query

     if(populate){
        query = query.populate(populate);
     }

     const results = await query;

     // Adding Pagination to response

     let pagination = {};

     if (startIndex > 0) {
       pagination.prev = {
         page: page - 1,
         limit,
       };
     }
     if (endIndex < total) {
       pagination.next = {
         page: page + 1,
         limit,
       };
     }
     res.advancedResults = {
        success:true,
        count:results.length,
        pagination,
        data:results
      }

     next();
 }

 module.exports = AdvancedResults;