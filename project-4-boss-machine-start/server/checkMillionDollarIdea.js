const MILLION_DOLLARS = 1000000;

const checkMillionDollarIdea = (req, res, next) => {
    try{
        const weeklyRevenue = Number(req.body.weeklyRevenue);
        const numWeeks = Number(req.body.numWeeks);
        if(weeklyRevenue * numWeeks >= MILLION_DOLLARS){
            next();
        }else {
            res.status(400).send();
        }
    }catch {
        next(new Error('No lo vale'));
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
