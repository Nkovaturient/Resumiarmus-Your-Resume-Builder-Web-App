
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUser=async(req,res)=>{
    let {id}=req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
}


export const updateUser=async(req,res)=>{
    if(req.body.password){
        //hash the password
        const salt=await bcrypt.genSalt(10);
        const password=await bcrypt.hash(req.body.password, salt);
        req.body.password=password;
    }

    let {id}=req.params;
    const editUser=await User.findByIdAndUpdate(id, req.body, {
        new: true
      })
        .lean()
        .exec()
  
      res.status(200).json({
         user: {
            id: editUser.id,
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            email: editUser.email,
         } });

    console.log(editUser);
}
