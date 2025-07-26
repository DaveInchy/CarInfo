const fs = require('fs');
const path = require('path');

const DIST_DIR = 'dist';
const API_DIR = path.join(DIST_DIR, 'api');

const carData = {
  "ford": ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
  "chevrolet": ["Silverado", "Camaro", "Equinox", "Malibu", "Tahoe"],
  "dodge": ["Charger", "Challenger", "Durango"],
  "jeep": ["Wrangler", "Grand Cherokee", "Cherokee"],
  "cadillac": ["Escalade", "CT5", "XT5"],
  "tesla": ["Model 3", "Model S", "Model X", "Model Y"],
  "toyota": ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
  "honda": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
  "nissan": ["Altima", "Sentra", "Rogue", "Titan", "GT-R"],
  "subaru": ["Outback", "Forester", "Crosstrek", "Impreza"],
  "lexus": ["RX", "ES", "NX", "IS"],
  "mazda": ["Mazda3", "Mazda6", "CX-5", "MX-5 Miata"],
  "volkswagen": ["Jetta", "Passat", "Tiguan", "Golf", "Atlas"],
  "bmw": ["3 Series", "5 Series", "X3", "X5"],
  "mercedes-benz": ["C-Class", "E-Class", "GLC", "GLE"],
  "audi": ["A4", "A6", "Q5", "Q7"],
  "porsche": ["911", "Cayenne", "Macan", "Panamera"],
  "hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe"],
  "kia": ["Optima", "Sorento", "Sportage", "Telluride"],
  "alfa-romeo": ["Giulia", "Stelvio"],
  "ferrari": ["488", "F8 Tributo", "SF90 Stradale"],
  "lamborghini": ["Huracán", "Aventador", "Urus"]
};

const buildData = () => {
  // Create directories
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(API_DIR, { recursive: true });

  console.log('Generating brand files...');
  const brandNames = Object.keys(carData).sort();
  const allModels = [];

  // Create brand-specific files and populate allModels array
  for (const brandName of brandNames) {
    const models = carData[brandName];
    fs.writeFileSync(
      path.join(API_DIR, `${brandName}.json`),
      JSON.stringify(models, null, 2)
    );
    for (const model of models) {
      allModels.push({ brand: brandName, model: model });
    }
  }

  // Create index file
  fs.writeFileSync(
    path.join(API_DIR, 'index.json'),
    JSON.stringify(brandNames, null, 2)
  );

  // Create all.json for fuzzy search
  fs.writeFileSync(
    path.join(API_DIR, 'all.json'),
    JSON.stringify(allModels, null, 2)
  );

  console.log('Build complete!');
};

buildData();