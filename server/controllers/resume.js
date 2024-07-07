import Resume from "../models/resume.js";

export const getOne=async(req,res)=>{
    const cv=await Resume
    .findOne({createdBy: req.body.user._id, _id: req.params.id })
    .lean() //opt tells mongoose to skip instantiating a full mongoose document and just give the plain old js objs
    .exec();  //executes the query operation 
    console.log(`fetched cv-${cv}`); //if executing a query & sending the results without modification
    if(!cv){
        return res.status(400).end();
    }

    res.status(200).json({data: cv});
    

}

export const getMany=async(req,res)=>{
    const docs = await Resume
      .find({ createdBy: req.params.id })
      .lean()
      .exec();
    if (docs.length)
      res.status(200).json({ data: docs });
    else
      res.status(404).json({ error: 'No user data available' });
}

export const createOne=async(req,res)=>{
    const createdBy = req.body.user?.id;
    try {
      if(!req.body.data){
        return res.status(402).json({ error : 'data is missing!'})
      }

      const saveResume= new Resume.create({
        ...req.body.data, 
        createdBy
      })
      // saveResume.personal={ ...req.body.personal }
      
      console.log(saveResume);

      //checking validation err
      const validationError = saveResume.validateSync();
    if (validationError) {
      throw validationError;
    }
      const doc = await saveResume.save(); //data from form
      res.status(201).json({ data: saveResume });

    } catch (e) {
      console.error(e.message, e.stack);
      res.status(500).end();
    }
}

export const updateOne=async(req,res)=>{
    const updatedDoc = await Resume
      .findOneAndUpdate(
        {
          createdBy: req.body.user.id,
          _id: req.params.id
        },
        req.body.data, //updating with edited details
        { new: true }
      )
      .lean(true)
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
}

export const deleteOne=async(req,res)=>{
    const removed = await Resume.findOneAndDelete({
        createdBy: req.body.user.id,
        _id: req.params.id
      });
  
      if (!removed) {
        return res.status(400).end();
      }
  
      return res.status(200).json({ data: removed });
}

/* import Resume from '../models/resume.js';
import crudControllers from '../utils/crud.js';

export default crudControllers(Resume);
 */