import adminViewRouter from './routes/adminView.router.js'
import adminRouter from './routes/admin.router.js'
import preServiceRouter from './routes/preService.router.js'
import homeRouter from './routes/home.router.js'
import sessionRouter from './routes/session.router.js'
import { passportCall } from './utils.js'

const run = (io, app) => {
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    app.use('/', homeRouter)
    app.use('/admin', adminViewRouter)
    app.use('/api/admin', passportCall('jwt'), adminRouter)
    app.use('/preservice', preServiceRouter)
    app.use('/session', sessionRouter)
}

export default run