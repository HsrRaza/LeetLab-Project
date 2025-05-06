import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;

        const userId = req.user.id;

        const playlist = await db.playlist.create({
            data: {
                name,
                description,
                userId
            }
        });

        res.status(200).json({
            success: true,
            message: "playlist created successfully",
            playlist
        })

    } catch (error) {
        console.error("Error creating playlist", error);
        res.status(500).json({ error: "Failed to create playlist" });

    }

}
export const getAllListDetails = async (req, res) => {
    try {
        const playlist = await db.playlist.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    }
                }
            }
        })

        res.status(200).json({
            success: true,
            message: "Playlist fetched successfully"
        })
    } catch (error) {
        console.error("Error while fetching playlist", error);
        res.status(500).json({
            success: false,
            error: "Error to fetch playlist"
        })


    }

}
export const getPlayListDetails = async (req, res) => {
    const { playlistId } = req.params;

    try {
        const playlist = await db.playlist.findUnique({

            where: {
                id: playlistId,
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    }
                }
            }
        })

        if (!playlist) {
            return res.status(404).json({
                error: "Playlist not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Playlist Fetched successfully"
        })


    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json({ error: "Failed to fetch playlist" });
    }


}
export const addProblemToPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    try {


        if (!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({ error: "Invalid or missing problemId" })
        }

        // create record for each problems in he playlist

        const problemInPlaylist = await db.problemsInPlaylist.createMany({
            data: problemIds.map((problemIds) => ({
                playlistId,
                problemIds
            }))
        })


        res.status(201).json({
            success: true,
            message: "Problems added to playlist successfully",
            problemInPlaylist,
        })

    } catch (error) {
        console.error("error adding problem to playlist");
        res.status(500).json({
            success: false,
            error: "Unable add problems to playlist"
        })


    }

}
export const deletePlaylist = async (req, res) => {

    const { playlistId } = req.params;
    try {
        const deletedPlaylist = await db.playlist.delete({
            where: {
                id: playlistId
            }
        })
        res.status(201).json({
            success: true,
            message: " deletd  playlist successfully",
            deletePlaylist

        })
    } catch (error) {
        console.error("Error deleting playlist:", error.message);
        res.status(500).json({ error: "Failed to delete playlist" });
    }


}
export const removeProblemFromPlaylist = async (req, res) => {

    const { playlistId } = req.params;
    const { problemIds } = req.body;

    try {
        if (!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({ error: "Invalid or missing problemId" })
        }

        const deletedProblem = await db.problemInPlaylist.deleteMany({
            where: {
                playlistId,
                problemId: {
                    in: problemIds
                }
            }
        });



        res.status(201).json({
            success: true,
            message: " removed  problem from playlist  successfully",

        })

    } catch (error) {
        console.error("error removing problem from playlist");
        res.status(500).json({
            success: false,
            error: "Unable remove problems to playlist"
        })
    }
}