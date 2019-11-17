const timesheetRouter = require('express').Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

timesheetRouter.param('timesheetId', (req, res, next, timesheetId) => {
    const sql = 'SELECT * FROM Timesheet WHERE id = $timesheetId';
    const values = {$timesheetId: timesheetId};
    db.get(sql, values, (err, timesheet) => {
        if(err) {
            next(err);
        } else if(timesheet) {
            req.timesheet = timesheet;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

timesheetRouter.get('/', (req, res, next) => {
    const sql = `SELECT * FROM Timesheet WHERE employee_id = ${req.employee.id}`;
    db.all(sql, (err, timesheets) => {
        if(err) {
            next(err);
        }
        res.json({timesheets});
    });
});

timesheetRouter.post('/', (req, res, next) => {
    const body = req.body.timesheet;
    const hours = body.hours;
    const rate = body.rate;
    const date = body.date;
    const employeeId = req.employee.id;

    if (!verifytimesheetRequiredFields(hours, rate, date)) {
        return res.sendStatus(400);
    }

    const sql = `INSERT INTO timesheet (hours, rate, date, employee_id) VALUES 
                ($hours, $rate, $date, $employeeId);`;

    const values = {
        $date: date,
        $employeeId: employeeId,
        $hours: hours,
        $rate: rate
    };

    db.run(sql, values, function(err) {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM timesheet WHERE id = ${this.lastID}`, (err, timesheet) => {
                res.status(201).json({timesheet});
            });
        }
    });

});

timesheetRouter.get('/:timesheetId', (req, res, next) => {
    res.json({timesheet: req.timesheet});
});

timesheetRouter.put('/:timesheetId', (req, res, next) => {
    const body = req.body.timesheet;
    const hours = body.hours;
    const rate = body.rate;
    const date = body.date;
    const employeeId = req.employee.id;

    if (!verifytimesheetRequiredFields(hours, rate, date)) {
        return res.sendStatus(400);
    }

    const sql = `UPDATE timesheet 
                SET hours = $hours, rate = $rate, date = $date, employee_id = $employeeId
                WHERE id = $timesheetId;`;
    const values = {
        $date: date,
        $employeeId: employeeId,
        $hours: hours,
        $rate: rate,
        $timesheetId: req.timesheet.id
    };

    db.run(sql, values, (err) => {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM timesheet WHERE id = ${req.timesheet.id};`, (err, timesheet) => {
                if(err) {
                    next(err);
                }else {
                    res.json({timesheet});
                }
            });
        }
    });

});

timesheetRouter.delete('/:timesheetId', (req, res, next) => {
    const sql = `DELETE FROM timesheet WHERE id = ${req.timesheet.id};`;
    db.run(sql, (err) => {
        if(err) {
            next(err);
        } else {
            res.sendStatus(204);
        }
    })
});

const verifytimesheetRequiredFields = (hours, rate, date) => {
    if (!hours || !rate || !date) {
        return false;
    }
    return true;
}



module.exports = timesheetRouter;