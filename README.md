# Car Information Static API

A static API providing car model data. This project is designed to be hosted on GitHub Pages.

## Usage

The API provides two types of endpoints:

### Index Endpoint

Returns a JSON array of all available car brands.

**URL:** `https://<your-github-username>.github.io/<your-repo-name>/api/index.json`

**Example Response:**
```json
[
  "alfa-romeo",
  "audi",
  "bmw",
  ...
]
```

### Brand Endpoint

Returns a JSON array of all models for a specific brand.

**URL:** `https://<your-github-username>.github.io/<your-repo-name>/api/[brand-name].json`

**Example URL (for Tesla):** `https://<your-github-username>.github.io/<your-repo-name>/api/tesla.json`

**Example Response:**
```json
[
  "Model 3",
  "Model S",
  "Model X",
  "Model Y"
]
```

## How to Update the Data

To update the car data, follow these steps:

1.  **Modify the data:**
    Edit the `carData` object in `build-data.js` to add, remove, or change brands and models.

2.  **Run the build script:**
    ```bash
    node build-data.js
    ```
    This will regenerate the static JSON files in the `dist/` directory.

3.  **Commit and push the changes:**
    Commit the updated `build-data.js` and the `dist/` directory and push it to your GitHub repository. GitHub Pages will automatically serve the new files.