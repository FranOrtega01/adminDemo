import adminViewRouter from './routes/adminView.router.js'
import adminRouter from './routes/admin.router.js'
import preServiceRouter from './routes/preService.router.js'
import homeRouter from './routes/home.router.js'

const run = (io, app) => {
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    app.use('/', homeRouter)
    app.use('/admin', adminViewRouter )
    app.use('/api/admin', adminRouter)
    app.use('/preservice',  preServiceRouter)
}

export default run