import Video from '../models/model.js'

export const createVideo =async (req,res) => {
    try {
        const{title};
        const{description};
        const{url};
        const Video =newVideo({title,description,url});

        res.status(200).json({message:"created"})
    }
    
}