import adminViewRouter from './routes/adminView.router.js'
import adminRouter from './routes/admin.router.js'

const run = (io, app) => {
    app.use((req, res, next) => {
        req.io = io;
        next();
    });


    app.use('/admin', adminViewRouter )
    app.use('/api/admin', adminRouter)
}

export default run