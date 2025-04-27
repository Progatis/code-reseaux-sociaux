# API de Démonstration Postman

Cette API REST simple a été créée pour démontrer les fonctionnalités de Postman.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

L'API sera disponible à l'adresse: http://localhost:3000

## Points d'API disponibles

### Accueil
- `GET /` - Informations sur l'API

### Utilisateurs
- `GET /api/users` - Obtenir tous les utilisateurs
- `GET /api/users/:id` - Obtenir un utilisateur spécifique
- `POST /api/users` - Créer un nouvel utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Produits
- `GET /api/products` - Obtenir tous les produits
- `GET /api/products/:id` - Obtenir un produit spécifique
- `POST /api/products` - Créer un nouveau produit
- `PUT /api/products/:id` - Mettre à jour un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Authentification
- `POST /api/auth/login` - Simuler une connexion utilisateur

### Recherche
- `GET /api/search?q=term` - Rechercher dans les utilisateurs et produits

## Exemples de requêtes pour Postman

### 1. Obtenir tous les utilisateurs
```
GET http://localhost:3000/api/users
```

### 2. Créer un utilisateur
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "role": "user"
}
```

### 3. Mettre à jour un utilisateur
```
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "name": "Alice Martin",
  "email": "alice.martin@example.com"
}
```

### 4. Authentification
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "password123"
}
```

### 5. Rechercher
```
GET http://localhost:3000/api/search?q=alice
```

## Fonctionnalités démontrables avec Postman

1. **Envoi de requêtes HTTP basiques**
   - GET, POST, PUT, DELETE

2. **Manipulation des en-têtes**
   - Définir Content-Type, Authorization, etc.

3. **Envoi de données**
   - Corps de requête JSON
   - Paramètres d'URL
   - Paramètres de formulaire

4. **Visualisation des réponses**
   - Statut HTTP
   - Corps de réponse JSON
   - En-têtes de réponse

5. **Tests et automatisation**
   - Tests de validation
   - Extraction de variables
   - Scripts pre-request

6. **Collections et environnements**
   - Organisation des requêtes
   - Variables d'environnement 