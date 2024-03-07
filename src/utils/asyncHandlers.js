const asyncHandlers = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}



export {asyncHandlers}

// const asyncHandlers = () => {}
// const asyncHandlers =(func) => () => {}
// const asyncHandlers = (func) => async () => {}

// const asyncHandlers = (fn) => async() => {
//     try{
//           await fn(req, res, next)
//     }catch(error){
//         req.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         }

//         )

//     }
// }