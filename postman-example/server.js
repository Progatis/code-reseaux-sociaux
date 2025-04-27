const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base de données simulée
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user' }
];

let products = [
  { id: 1, name: 'Smartphone', price: 699, stock: 50 },
  { id: 2, name: 'Laptop', price: 1299, stock: 25 },
  { id: 3, name: 'Headphones', price: 99, stock: 100 }
];

// Routes pour l'API

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API de démonstration Postman',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      auth: '/api/auth'
    }
  });
});

// ===== ROUTES UTILISATEURS =====

// GET tous les utilisateurs
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET un utilisateur spécifique
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  res.json(user);
});

// POST créer un utilisateur
app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Le nom et l\'email sont requis' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'user'
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT mettre à jour un utilisateur
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  
  const updatedUser = {
    ...users[userIndex],
    ...req.body,
    id: userId // Maintenir l'ID original
  };
  
  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

// DELETE supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  
  const deletedUser = users[userIndex];
  users = users.filter(u => u.id !== userId);
  
  res.json({ message: 'Utilisateur supprimé avec succès', user: deletedUser });
});

// ===== ROUTES PRODUITS =====

// GET tous les produits
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET un produit spécifique
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produit non trouvé' });
  res.json(product);
});

// POST créer un produit
app.post('/api/products', (req, res) => {
  const { name, price, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Le nom et le prix sont requis' });
  }
  
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    stock: stock || 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT mettre à jour un produit
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produit non trouvé' });
  }
  
  const updatedProduct = {
    ...products[productIndex],
    ...req.body,
    id: productId // Maintenir l'ID original
  };
  
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE supprimer un produit
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produit non trouvé' });
  }
  
  const deletedProduct = products[productIndex];
  products = products.filter(p => p.id !== productId);
  
  res.json({ message: 'Produit supprimé avec succès', product: deletedProduct });
});

// ===== ROUTE AUTHENTIFICATION SIMULÉE =====

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  
  // Authentification simulée pour la démo
  if (email === 'demo@example.com' && password === 'password123') {
    return res.json({
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      user: {
        id: 999,
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'admin'
      }
    });
  }
  
  return res.status(401).json({ error: 'Identifiants invalides' });
});

// ===== ROUTE RECHERCHE =====

app.get('/api/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Paramètre de recherche "q" requis' });
  }
  
  const searchTerm = q.toLowerCase();
  
  const foundUsers = users.filter(
    user => user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
  );
  
  const foundProducts = products.filter(
    product => product.name.toLowerCase().includes(searchTerm)
  );
  
  res.json({
    users: foundUsers,
    products: foundProducts
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
}); 