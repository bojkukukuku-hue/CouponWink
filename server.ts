
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = knex({
  client: process.env.DB_CLIENT || 'better-sqlite3',
  connection: process.env.DB_CLIENT === 'mysql2' ? {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'couponwink',
    port: Number(process.env.DB_PORT) || 3306,
  } : {
    filename: './cw.sqlite'
  },
  useNullAsDefault: true,
});

async function initDb() {
  const hasStores = await db.schema.hasTable('stores');
  if (!hasStores) {
    await db.schema.createTable('stores', (table) => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('category');
      table.string('logo');
      table.string('color');
      table.float('rating').defaultTo(0);
      table.integer('reviews').defaultTo(0);
      table.string('status').defaultTo('Active');
      table.text('description');
      table.string('website');
      table.boolean('featured').defaultTo(false);
      table.integer('clicks').defaultTo(0);
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  }

  const hasCategories = await db.schema.hasTable('categories');
  if (!hasCategories) {
    await db.schema.createTable('categories', (table) => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('icon');
      table.text('description');
      table.integer('clicks').defaultTo(0);
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  }

  const hasCoupons = await db.schema.hasTable('coupons');
  if (!hasCoupons) {
    await db.schema.createTable('coupons', (table) => {
      table.string('id').primary();
      table.string('storeId').references('id').inTable('stores').onDelete('CASCADE');
      table.string('title').notNullable();
      table.string('code');
      table.string('type');
      table.string('label');
      table.string('status').defaultTo('Active');
      table.integer('usage').defaultTo(0);
      table.date('expiry');
      table.text('desc');
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  }

  const hasMenus = await db.schema.hasTable('menus');
  if (!hasMenus) {
    await db.schema.createTable('menus', (table) => {
      table.string('id').primary();
      table.string('label').notNullable();
      table.string('path').notNullable();
      table.boolean('visible').defaultTo(true);
      table.integer('sort_order').defaultTo(0);
    });
  }

  const hasSettings = await db.schema.hasTable('settings');
  if (!hasSettings) {
    await db.schema.createTable('settings', (table) => {
      table.string('key').primary();
      table.text('value');
    });
  }

  const hasUsers = await db.schema.hasTable('users');
  if (!hasUsers) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('email').unique().notNullable();
      table.string('role').defaultTo('User');
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
    // Default admin
    await db('users').insert({
      username: 'admin',
      password: 'admin123',
      email: 'admin@couponwink.com',
      role: 'Admin'
    });
  }

  const hasBlogs = await db.schema.hasTable('blogs');
  if (!hasBlogs) {
    await db.schema.createTable('blogs', (table) => {
      table.string('id').primary();
      table.string('title').notNullable();
      table.text('content');
      table.text('excerpt');
      table.string('image');
      table.string('author');
      table.string('status').defaultTo('Published');
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  }
}

async function startServer() {
  await initDb();
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/get_stores', async (req, res) => {
    try {
      const stores = await db('stores').select('*');
      res.json(stores);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch stores' });
    }
  });

  app.post('/api/save_store', async (req, res) => {
    try {
      const store = req.body;
      const exists = await db('stores').where({ id: store.id }).first();
      if (exists) {
        await db('stores').where({ id: store.id }).update(store);
      } else {
        await db('stores').insert(store);
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to save store' });
    }
  });

  app.delete('/api/delete_store', async (req, res) => {
    try {
      const { id } = req.query;
      await db('stores').where({ id }).delete();
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to delete store' });
    }
  });

  app.get('/api/get_coupons', async (req, res) => {
    try {
      const coupons = await db('coupons').select('*');
      res.json(coupons);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch coupons' });
    }
  });

  app.post('/api/save_coupon', async (req, res) => {
    try {
      const coupon = req.body;
      const exists = await db('coupons').where({ id: coupon.id }).first();
      if (exists) {
        await db('coupons').where({ id: coupon.id }).update(coupon);
      } else {
        await db('coupons').insert(coupon);
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to save coupon' });
    }
  });

  app.delete('/api/delete_coupon', async (req, res) => {
    try {
      const { id } = req.query;
      await db('coupons').where({ id }).delete();
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to delete coupon' });
    }
  });

  app.get('/api/get_categories', async (req, res) => {
    try {
      const categories = await db('categories').select('*');
      res.json(categories);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  app.post('/api/save_category', async (req, res) => {
    try {
      const category = req.body;
      const exists = await db('categories').where({ id: category.id }).first();
      if (exists) {
        await db('categories').where({ id: category.id }).update(category);
      } else {
        await db('categories').insert(category);
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to save category' });
    }
  });

  app.delete('/api/delete_category', async (req, res) => {
    try {
      const { id } = req.query;
      await db('categories').where({ id }).delete();
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to delete category' });
    }
  });

  app.get('/api/get_settings', async (req, res) => {
    try {
      const settings = await db('settings').select('*');
      const settingsObj = {};
      settings.forEach(s => {
        try {
          settingsObj[s.key] = JSON.parse(s.value);
        } catch (e) {
          settingsObj[s.key] = s.value;
        }
      });
      res.json(settingsObj);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  app.post('/api/save_settings', async (req, res) => {
    try {
      const settings = req.body;
      for (const [key, value] of Object.entries(settings)) {
        const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        const exists = await db('settings').where({ key }).first();
        if (exists) {
          await db('settings').where({ key }).update({ value: valStr });
        } else {
          await db('settings').insert({ key, value: valStr });
        }
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to save settings' });
    }
  });

  app.get('/api/get_menus', async (req, res) => {
    try {
      const menus = await db('menus').select('*').orderBy('sort_order', 'asc');
      res.json(menus);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch menus' });
    }
  });

  app.post('/api/save_menus', async (req, res) => {
    try {
      const menus = req.body;
      await db('menus').delete(); // Simple replace for menus
      await db('menus').insert(menus);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to save menus' });
    }
  });

  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      // Simple mock login for now, but connected to DB
      const user = await db('users').where({ username, password }).first();
      if (user) {
        const { password, ...userWithoutPassword } = user;
        res.json({ success: true, user: userWithoutPassword });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (e) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

  app.get('/api/get_blogs', async (req, res) => {
    try {
      const blogs = await db('blogs').select('*').orderBy('createdAt', 'desc');
      res.json(blogs);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  });

  app.post('/api/save_blog', async (req, res) => {
    try {
      const blog = req.body;
      const exists = await db('blogs').where({ id: blog.id }).first();
      if (exists) {
        await db('blogs').where({ id: blog.id }).update(blog);
      } else {
        await db('blogs').insert(blog);
      }
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to save blog' });
    }
  });

  app.delete('/api/delete_blog', async (req, res) => {
    try {
      const { id } = req.query;
      await db('blogs').where({ id }).delete();
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to delete blog' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
