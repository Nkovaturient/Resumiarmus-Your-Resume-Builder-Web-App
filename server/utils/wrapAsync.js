/**basic err handling and more compact way instead of try and catch block */

export const wrapAsync=(fn)=>{
    return function (req,res,next){
        fn(req,res,next).catch(next);
    }
};