import {Router} from "express"
import { 
    loginUser, 
    logOutUser, 
    registerUser,
    getMe,
    updateMe,
    changePassword,
    deleteMe
} from "../controllers/user.controllers.js";
import verifyjwt from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes (no authentication required)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// Secured routes (authentication required)
router.route("/logout").post(verifyjwt, logOutUser)
router.route("/me").get( verifyjwt,getMe) // Changed from loginUser to getMe
// router.route('/updateMe').put( verifyjwt,updateMe) // Changed from loginUser to updateMe
router.route('/change-password').put(verifyjwt, changePassword); // Changed from loginUser to changePassword
router.route('/deleteMe').delete(verifyjwt, deleteMe) // Changed from loginUser to deleteMe

router.put('/change-password', (req, res) => {
  console.log("🔥 Change password route hit");
  res.send("OK");
});
export default router