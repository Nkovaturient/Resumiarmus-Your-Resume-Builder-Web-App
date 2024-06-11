import express from 'express';
import {wrapAsync} from '../utils/wrapAsync.js';
import {createOne, getMany, getOne, deleteOne, updateOne} from '../controllers/resume.js';
import {getUser, updateUser} from '../controllers/user.js';

const router=express.Router();

router.route('/user/:id')
.get(wrapAsync(getUser))
.put(wrapAsync(updateUser));

router.route('/resume')
.post(wrapAsync(createOne));

router.route('/resume/:id')
.get(wrapAsync(getOne))
.put(wrapAsync(updateOne))
.delete(wrapAsync(deleteOne))

router.route('/resume/all/:id')
.get(wrapAsync(getMany));


export default router;