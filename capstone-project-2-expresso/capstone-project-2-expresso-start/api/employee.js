const employeeRouter = require('express').Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

employeeRouter.param('employeeId', (req, res, next, employeeId) => {
    const sql = 'SELECT * FROM Employee WHERE id = $employeeId';
    const values = {$employeeId: employeeId};
    db.get(sql, values, (err, employee) => {
        if(err) {
            next(err);
        } else if(employee) {
            req.employee = employee;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

employeeRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Employee WHERE is_current_employee = 1';
    db.all(sql, (err, employees) => {
        if(err) {
            next(err);
        }
        res.json({employees});
    });
});

employeeRouter.post('/', (req, res, next) => {
    const body = req.body.employee;
    const name = body.name;
    const position = body.position;
    const wage = body.wage;
    let isCurrentlyEmployed;
    if (body.is_current_employee) {
        isCurrentlyEmployed = body.is_current_employee;
    } else {
        isCurrentlyEmployed = 1;
    }

    if (!name || !position || !wage) {
        return res.sendStatus(400);
    }

    const sql = `INSERT INTO Employee (name, position, wage, is_current_employee) VALUES 
                ($name, $position, $wage, $isCurrentlyEmployed);`;

    const values = {
        $isCurrentlyEmployed: isCurrentlyEmployed,
        $name: name,
        $position: position,
        $wage: wage
    };

    db.run(sql, values, function(err) {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Employee WHERE id = ${this.lastID}`, (err, employee) => {
                res.status(201).json({employee});
            });
        }
    });

});

employeeRouter.get('/:employeeId', (req, res, next) => {
    res.json({employee: req.employee});
});




module.exports = employeeRouter;