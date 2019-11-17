const menuRouter = require('express').Router();
const menuItemRouter = require('./menuItem');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

menuRouter.param('menuId', (req, res, next, menuId) => {
    const sql = 'SELECT * FROM Menu WHERE id = $menuId';
    const values = {$menuId: menuId};
    db.get(sql, values, (err, menu) => {
        if(err) {
            next(err);
        } else if(menu) {
            req.menu = menu;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

menuRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Menu';
    db.all(sql, (err, menus) => {
        if(err) {
            next(err);
        }
        res.json({menus});
    });
});

menuRouter.post('/', (req, res, next) => {
    const body = req.body.menu;
    const title = body.title;

    if (!verifyMenuRequiredFields(title)) {
        return res.sendStatus(400);
    }

    const sql = `INSERT INTO Menu (title) VALUES ($title);`;

    const values = {
        $title: title
    };

    db.run(sql, values, function(err) {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Menu WHERE id = ${this.lastID}`, (err, menu) => {
                res.status(201).json({menu});
            });
        }
    });

});

menuRouter.get('/:menuId', (req, res, next) => {
    res.json({menu: req.menu});
});

menuRouter.put('/:menuId', (req, res, next) => {
    const body = req.body.menu;
    const title = body.title;

    if (!verifyMenuRequiredFields(title)) {
        return res.sendStatus(400);
    }

    const sql = `UPDATE Menu SET title = $title WHERE id = $menuId;`;
    const values = {
        $menuId: req.menu.id,
        $title: title
    };

    db.run(sql, values, (err) => {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Menu WHERE id = ${req.menu.id};`, (err, menu) => {
                if(err) {
                    next(err);
                }else {
                    res.json({menu});
                }
            });
        }
    });

});

menuRouter.delete('/:menuId', (req, res, next) => {
    const sql = `DELETE FROM Menu WHERE id = ${req.menu.id};`;
    const menuItemsSql = `SELECT COUNT(1) AS menuItemsCount FROM MenuItem WHERE menu_id = ${req.menu.id}` 
    db.get(menuItemsSql, (err, result) => {
        if (err) {
            next(err);
        } else {
            if (result.menuItemsCount === 0) {
                db.run(sql, (err) => {
                    if(err) {
                        next(err);
                    } else {
                        res.sendStatus(204);
                    }
                });
            } else {
                res.sendStatus(400);
            }
        }
    });
});

const verifyMenuRequiredFields = (titlle) => {
    if (!titlle) {
        return false;
    }
    return true;
}

menuRouter.use('/:menuId/menu-items', menuItemRouter);

module.exports = menuRouter;