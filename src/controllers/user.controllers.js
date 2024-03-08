import { asynchHandlers} from "../utils/asyncHandlers.js"

const registerUser = asynchHandlers (async (req, res) => {
    res.status(200).json({
        message: "ok"
    })

})

export {registerUser}