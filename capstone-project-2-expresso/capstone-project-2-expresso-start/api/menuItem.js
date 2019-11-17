const menuItemRouter = require('express').Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

menuItemRouter.param('menuItemId', (req, res, next, menuItemId) => {
    const sql = 'SELECT * FROM MenuItem WHERE id = $menuItemId';
    const values = {$menuItemId: menuItemId};
    db.get(sql, values, (err, menuItem) => {
        if(err) {
            next(err);
        } else if(menuItem) {
            req.menuItem = menuItem;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

menuItemRouter.get('/', (req, res, next) => {
    const sql = `SELECT * FROM MenuItem WHERE menu_id = ${req.menu.id}`;
    db.all(sql, (err, menuItems) => {
        if(err) {
            next(err);
        }
        res.json({menuItems});
    });
});

menuItemRouter.post('/', (req, res, next) => {
    const body = req.body.menuItem;
    const name = body.name;
    const inventory = body.inventory;
    const price = body.price;
    const description = body.description || '';
    const menuId = req.menu.id;

    if (!verifymenuItemRequiredFields(name, inventory, price)) {
        return res.sendStatus(400);
    }

    const sql = `INSERT INTO MenuItem (name, inventory, price, description, menu_id) VALUES 
                ($name, $inventory, $price, $description, $menuId);`;

    const values = {
        $description: description,
        $inventory: inventory,
        $menuId: menuId,
        $name: name,
        $price: price
    };

    db.run(sql, values, function(err) {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM MenuItem WHERE id = ${this.lastID}`, (err, menuItem) => {
                res.status(201).json({menuItem});
            });
        }
    });

});

menuItemRouter.get('/:menuItemId', (req, res, next) => {
    res.json({menuItem: req.menuItem});
});

menuItemRouter.put('/:menuItemId', (req, res, next) => {
    const body = req.body.menuItem;
    const name = body.name;
    const inventory = body.inventory;
    const price = body.price;
    const description = body.description || '';
    const menuId = req.menu.id;

    if (!verifymenuItemRequiredFields(name, inventory, price)) {
        return res.sendStatus(400);
    }

    const sql = `UPDATE menuItem 
                SET name = $name, inventory = $inventory, price = $price, 
                description = $description, menu_id = $menuId
                WHERE id = $menuItemId;`;
    
    const values = {
        $description: description,
        $inventory: inventory,
        $menuId: menuId,
        $menuItemId: req.menuItem.id,
        $name: name,
        $price: price
    };

    db.run(sql, values, (err) => {
        if(err) {
            next(err);
        } else {
            db.get(`SELECT * FROM menuItem WHERE id = ${req.menuItem.id};`, (err, menuItem) => {
                if(err) {
                    next(err);
                }else {
                    res.json({menuItem});
                }
            });
        }
    });

});

menuItemRouter.delete('/:menuItemId', (req, res, next) => {
    const sql = `DELETE FROM MenuItem WHERE id = ${req.menuItem.id};`;
    db.run(sql, (err) => {
        if(err) {
            next(err);
        } else {
            res.sendStatus(204);
        }
    })
});

const verifymenuItemRequiredFields = (name, inventory, price) => {
    if (!name || !inventory || !price) {
        return false;
    }
    return true;
}



module.exports = menuItemRouter;