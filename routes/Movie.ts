import Movie from "../models/Movie"
import express, { Router, Request, Response } from "express"

const router: Router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find()
        const newMovie = await Movie.create({
            ...req.body,
            searchId: movies.length + 1
        })
        if (newMovie) {
            res.status(200).json(newMovie)
        } else {
            res.status(304).json({ message: "Wrong informations" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router