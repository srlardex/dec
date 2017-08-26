/**
 * Created by lunik on 04/07/2017.
 */

import Express from 'express'
import Delogger from 'delogger'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

export default class Server {
  constructor () {
    this.app = Express()
    this.app.use(compression())
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({
      extended: true
    }))

    require('./auth')(this.app)
    this.baseFolder = require('./folder')(this.app)
    require('./file')(this.app, this.baseFolder)
    require('./torrent')(this.app, this.baseFolder)

    this.app.use(Express.static(__dirname + '/public'))

    this.log = new Delogger('Server')
  }
  listen (port, host) {
    host = host || '0.0.0.0'
    this.app.listen(port, host, () => this.log.info(`Server listening on ${host}:${port}`))
  }
}