import { Router } from "express";
import { generatecertificate,getallcertificates,getcertificate } from "../controllers/certificate.controller.js";

const certificaterouter = Router()

certificaterouter.route('/').post(generatecertificate)
certificaterouter.route('/:id').get(getcertificate)
certificaterouter.route('/').get(getallcertificates)

export {certificaterouter}